import { useRef } from 'react';
import type { ButtonHTMLAttributes, FC, ReactNode } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'motion/react';

/**
 * @description [en] Magnetic button. Hitbox and visual are decoupled:
 *
 *  - The OUTER element is the real <button> and the actual click target.
 *    It is wider than the visible content (via `padding`) and NEVER moves.
 *  - The INNER element is the visible label; it springs toward the cursor
 *    when the cursor is inside the hitbox, but receives no pointer events.
 *
 * Because the hitbox itself stays put, the cursor never has to chase the
 * button — clicks always register. Disabled under reduced motion.
 *
 * Use this in place of a plain <button> when you want the magnetic effect.
 * Forwarded button props (onClick, type, aria-label, ...) attach to the
 * outer hitbox.
 */
interface MagneticProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  /** Pull strength, 0..1. */
  strength?: number;
  /** Extra px around the visible content that still counts as the field. */
  padding?: number;
  /** Class on the visible inner content (where you put borders/colors). */
  innerClassName?: string;
}

const MagneticButton: FC<MagneticProps> = ({
  children,
  strength = 0.3,
  padding = 24,
  className,
  innerClassName,
  style,
  ...buttonProps
}) => {
  const reduce = useReducedMotion();
  const hitboxRef = useRef<HTMLButtonElement>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 240, damping: 20, mass: 0.45 });
  const y = useSpring(my, { stiffness: 240, damping: 20, mass: 0.45 });

  const handleMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    const rect = hitboxRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    // Reduced motion: half the pull, so the effect is present but subtle.
    const s = reduce ? strength * 0.5 : strength;
    mx.set((e.clientX - cx) * s);
    my.set((e.clientY - cy) * s);
  };

  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <button
      ref={hitboxRef}
      type={buttonProps.type ?? 'button'}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      onPointerCancel={reset}
      style={{ padding, background: 'transparent', border: 'none', ...style }}
      className={`inline-flex cursor-pointer items-center justify-center ${className ?? ''}`}
      {...buttonProps}
    >
      <motion.span
        style={{ x, y, display: 'inline-flex', pointerEvents: 'none' }}
        className={innerClassName}
      >
        {children}
      </motion.span>
    </button>
  );
};

export default MagneticButton;
