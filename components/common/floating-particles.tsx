'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';
import { useMediaQuery } from '@/utils/common/use-media-query';

/**
 * @description [zh-CN] 增强型浮动粒子组件，带有鼠标吸引和排斥效果、不同大小和更可见的连接线。覆盖整个页面。150-300px 范围内的粒子被吸引向光标，120px 以内的粒子被排斥。
 * @description [en] Enhanced floating particles with mouse attract and repel effect, varied sizes, and more visible connection lines. Spans the entire page. Particles within 150-300px are attracted toward the cursor, particles within 120px are repelled.
 * @description [ja] マウスの吸引・反発エフェクト、さまざまなサイズ、より見やすい接続線を備えた強化フローティングパーティクル。ページ全体に広がる。150-300px 以内のパーティクルはカーソルに引き寄せられ、120px 以内のパーティクルは反発される。
 * @description [zh-TW] 增強型浮動粒子元件，帶有滑鼠吸引和排斥效果、不同大小和更可見的連接線。覆蓋整個頁面。150-300px 範圍內的粒子被吸引向游標，120px 以內的粒子被排斥。
 */
export const FloatingParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const { resolvedTheme } = useTheme();
  const isMobile = useMediaQuery('(max-width: 767px)');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let particles: Array<{
      x: number;
      y: number;
      baseSize: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      pulseSpeed: number;
      pulseOffset: number;
    }> = [];

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY + window.scrollY };
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.documentElement.scrollHeight;
    };

    const initParticles = () => {
      const count = Math.min(isMobile ? 40 : 80, Math.floor(window.innerWidth / 20));
      particles = Array.from({ length: count }, () => {
        const baseSize = Math.random() * 3 + 0.5;
        return {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          baseSize,
          size: baseSize,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.2,
          opacity: Math.random() * 0.35 + 0.05,
          pulseSpeed: Math.random() * 0.02 + 0.005,
          pulseOffset: Math.random() * Math.PI * 2,
        };
      });
    };

    const isDark = resolvedTheme === 'dark';
    const particleColor = isDark ? '212, 212, 216' : '161, 161, 170';
    const repelRadius = 120;
    const repelStrength = 2;
    const attractInnerRadius = 150;
    const attractOuterRadius = 300;
    const attractStrength = 0.8;

    let time = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.016;

      const mouse = mouseRef.current;

      for (const p of particles) {
        p.x += p.speedX;
        p.y += p.speedY;

        // Subtle pulse animation for size
        p.size = p.baseSize + Math.sin(time * p.pulseSpeed * 60 + p.pulseOffset) * 0.5;

        // Mouse interaction: attract at medium range, repel at close range
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < repelRadius && dist > 0) {
          // Close range: repel
          const force = (1 - dist / repelRadius) * repelStrength;
          p.x += (dx / dist) * force;
          p.y += (dy / dist) * force;
        } else if (dist >= attractInnerRadius && dist < attractOuterRadius && dist > 0) {
          // Medium range: attract toward cursor
          const normalizedDist = (dist - attractInnerRadius) / (attractOuterRadius - attractInnerRadius);
          const force = (1 - normalizedDist) * attractStrength;
          p.x -= (dx / dist) * force;
          p.y -= (dy / dist) * force;
        }

        // Wrap around
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.5, p.size), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${particleColor}, ${p.opacity})`;
        ctx.fill();
      }

      // Draw connection lines between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 180) {
            const opacity = 0.06 * (1 - dist / 180);
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(${particleColor}, ${opacity})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    resize();
    initParticles();
    draw();

    const resizeObserver = new ResizeObserver(() => {
      resize();
      initParticles();
    });
    resizeObserver.observe(document.documentElement);

    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [resolvedTheme, isMobile]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
      style={{ opacity: 0.7 }}
    />
  );
};
