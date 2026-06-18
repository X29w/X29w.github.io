import { useEffect, useRef } from 'react';
import type { FC } from 'react';

/**
 * @description [en] Particle morphing field. Particles flow and reassemble into a
 * sequence of meaningful glyphs (X29, </>, {} ...), sampled from rasterized text.
 * Each particle springs toward its target slot; the cursor repels nearby
 * particles, which then ease back. Single rAF loop, no per-frame React state,
 * DPR-capped, pauses offscreen, static first frame under reduced motion.
 *
 * Unlike an abstract rotating shape, the formed shapes read as identity: it
 * spells who this is and what they do.
 */
interface P {
  x: number;
  y: number;
  hx: number; // home (target)
  hy: number;
  vx: number;
  vy: number;
}

const WORDS = ['X29', '</>', '=>', '>_'];

interface ParticleMorphProps {
  /** 0..1, horizontal anchor for the formed text. Default 0.5 (centered). */
  centerX?: number;
  /** 0..1, vertical anchor. Default 0.5. */
  centerY?: number;
  /** Scales the rasterized text. Default 1. */
  scale?: number;
}

const ParticleMorph: FC<ParticleMorphProps> = ({ centerX = 0.5, centerY = 0.5, scale = 1 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // We keep the particle field alive even under reduced motion — it's the
    // page's signature visual. The only concession is dropping cursor
    // repulsion (the reactive jolt) and slowing the morph cycle.

    let accent: [number, number, number] = [95, 213, 255];
    let fg: [number, number, number] = [238, 242, 246];
    const readColors = () => {
      const styles = getComputedStyle(document.documentElement);
      const a = styles
        .getPropertyValue('--accent-rgb')
        .split(',')
        .map((n) => parseFloat(n.trim()));
      if (a.length === 3 && a.every((n) => !Number.isNaN(n))) accent = a as [number, number, number];
      const isDark = document.documentElement.classList.contains('dark');
      fg = isDark ? [238, 242, 246] : [30, 36, 44];
    };
    readColors();

    let cssW = 0;
    let cssH = 0;
    let dpr = 1;
    let particles: P[] = [];
    let wordIndex = 0;

    // Offscreen canvas to rasterize each word and sample target points.
    const sampler = document.createElement('canvas');
    const sctx = sampler.getContext('2d', { willReadFrequently: true });

    const sampleWord = (word: string): Array<[number, number]> => {
      if (!sctx) return [];
      const sw = Math.max(64, Math.floor(cssW));
      const sh = Math.max(64, Math.floor(cssH));
      sampler.width = sw;
      sampler.height = sh;
      sctx.clearRect(0, 0, sw, sh);
      sctx.fillStyle = '#fff';
      sctx.textAlign = 'center';
      sctx.textBaseline = 'middle';
      // Fit font to width.
      const widthBudget = sw * 0.82 * scale;
      let fontSize = Math.min(sh * 0.5 * scale, sw * 0.42 * scale);
      sctx.font = `700 ${fontSize}px "Space Grotesk Variable", system-ui, sans-serif`;
      while (sctx.measureText(word).width > widthBudget && fontSize > 12) {
        fontSize -= 4;
        sctx.font = `700 ${fontSize}px "Space Grotesk Variable", system-ui, sans-serif`;
      }
      sctx.fillText(word, sw * centerX, sh * centerY);

      const img = sctx.getImageData(0, 0, sw, sh).data;
      const pts: Array<[number, number]> = [];
      const step = Math.max(3, Math.floor(sw / 130));
      for (let y = 0; y < sh; y += step) {
        for (let x = 0; x < sw; x += step) {
          const alpha = img[(y * sw + x) * 4 + 3];
          if (alpha > 128) pts.push([x, y]);
        }
      }
      return pts;
    };

    const assignTargets = () => {
      const pts = sampleWord(WORDS[wordIndex]);
      if (pts.length === 0) return;
      // Ensure particle count matches available points (reuse by modulo).
      const count = Math.min(2600, Math.max(pts.length, 600));
      if (particles.length !== count) {
        particles = Array.from({ length: count }, () => ({
          x: Math.random() * cssW,
          y: Math.random() * cssH,
          hx: 0,
          hy: 0,
          vx: 0,
          vy: 0,
        }));
      }
      for (let i = 0; i < particles.length; i++) {
        const target = pts[i % pts.length];
        particles[i].hx = target[0] + (Math.random() - 0.5) * 2;
        particles[i].hy = target[1] + (Math.random() - 0.5) * 2;
      }
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      cssW = rect.width;
      cssH = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(cssW * dpr);
      canvas.height = Math.floor(cssH * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      assignTargets();
    };

    const pointer = { x: -9999, y: -9999 };
    const PUSH = 90;
    const PUSH_FORCE = reduce ? 1.4 : 2.6;

    const draw = () => {
      ctx.clearRect(0, 0, cssW, cssH);

      for (const p of particles) {
        // spring home
        const dx = p.hx - p.x;
        const dy = p.hy - p.y;
        p.vx += dx * 0.012;
        p.vy += dy * 0.012;

        // cursor repulsion
        const mdx = p.x - pointer.x;
        const mdy = p.y - pointer.y;
        const md = Math.hypot(mdx, mdy);
        if (md < PUSH && md > 0) {
          const f = (1 - md / PUSH) * PUSH_FORCE;
          p.vx += (mdx / md) * f;
          p.vy += (mdy / md) * f;
        }

        p.vx *= 0.86;
        p.vy *= 0.86;
        p.x += p.vx;
        p.y += p.vy;

        // brightness from velocity AND proximity to pointer — particles near
        // the cursor pop to accent so the interaction reads without adding
        // any extra UI overlay.
        const speed = Math.min(1, (Math.abs(p.vx) + Math.abs(p.vy)) / 6);
        const proximity = md < PUSH * 1.4 ? Math.max(0, 1 - md / (PUSH * 1.4)) : 0;
        const heat = Math.min(1, speed + proximity * 0.85);
        const r = fg[0] + (accent[0] - fg[0]) * heat;
        const g = fg[1] + (accent[1] - fg[1]) * heat;
        const b = fg[2] + (accent[2] - fg[2]) * heat;
        const size = 1.6 + proximity * 0.8;
        ctx.fillStyle = `rgba(${r | 0}, ${g | 0}, ${b | 0}, 0.9)`;
        ctx.fillRect(p.x, p.y, size, size);
      }

      raf = requestAnimationFrame(draw);
    };

    const onPointer = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };

    let raf = 0;
    let running = true;
    let cycle: ReturnType<typeof setInterval> | undefined;

    resize();
    window.addEventListener('resize', resize);

    const themeObserver = new MutationObserver(readColors);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    if (reduce) {
      // Reduced-motion mode: keep cursor reactivity (it's a core skill demo)
      // but dampen the push force so the jolt is gentler.
      window.addEventListener('pointermove', onPointer, { passive: true });
      window.addEventListener('pointerleave', onLeave);
    } else {
      window.addEventListener('pointermove', onPointer, { passive: true });
      window.addEventListener('pointerleave', onLeave);
    }

    // Cycle through the words. Slower under reduced motion (5s vs 2.8s).
    cycle = setInterval(() => {
      wordIndex = (wordIndex + 1) % WORDS.length;
      assignTargets();
    }, reduce ? 5000 : 2800);

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !running) {
          running = true;
          raf = requestAnimationFrame(draw);
        } else if (!entry.isIntersecting && running) {
          running = false;
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0 },
    );
    io.observe(canvas);
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      if (cycle) clearInterval(cycle);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointer);
      window.removeEventListener('pointerleave', onLeave);
      themeObserver.disconnect();
      io.disconnect();
    };
  }, [centerX, centerY, scale]);

  return <canvas ref={canvasRef} aria-hidden="true" className="h-full w-full" />;
};

export default ParticleMorph;
