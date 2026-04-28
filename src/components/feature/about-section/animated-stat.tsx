import { useRef, useEffect, useState } from 'react';
import type { FC } from 'react';

interface AnimatedStatProps {
  value: string;
  label: string;
}

const AnimatedStat: FC<AnimatedStatProps> = ({ value, label }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="flex flex-col gap-1">
      <span
        className="text-3xl font-bold text-foreground transition-all duration-700"
        style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(12px)' }}
      >
        {value}
      </span>
      <span className="text-xs font-mono tracking-[0.15em] uppercase text-muted">
        {label}
      </span>
    </div>
  );
};

export default AnimatedStat;
