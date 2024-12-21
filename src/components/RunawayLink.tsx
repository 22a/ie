'use client';
import { useState, useRef, useEffect } from 'react';
import { toast } from 'sonner';


interface RunawayLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  maxDistance?: number;
}

export default function RunawayLink({ 
  href, 
  children, 
  className = '', 
  maxDistance = 300 
}: RunawayLinkProps) {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const onChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', onChange);
    return () => mediaQuery.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!linkRef.current || !isHovering) return;

      const link = linkRef.current.getBoundingClientRect();
      const linkCenterX = link.left + link.width / 2;
      const linkCenterY = link.top + link.height / 2;

      const deltaX = e.clientX - linkCenterX;
      const deltaY = e.clientY - linkCenterY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      const force = Math.min(1, Math.pow((maxDistance - distance) / maxDistance, 2));
      
      if (distance < maxDistance) {
        setHasInteracted(true);
        const escapeX = -deltaX * force * 1.5;
        const escapeY = -deltaY * force * 1.5;

        const randomAngle = Math.random() * Math.PI * 2;
        const randomness = 15 * force;
        
        setPosition({
          x: escapeX + Math.cos(randomAngle) * randomness,
          y: escapeY + Math.sin(randomAngle) * randomness,
        });
      } else if (distance > maxDistance * 1.5) {
        setPosition({
          x: position.x * 0.9,
          y: position.y * 0.9,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isHovering, maxDistance, position, prefersReducedMotion]);

  const handleFocus = (e: React.FocusEvent<HTMLAnchorElement>) => {
    if (e.target.matches(':focus-visible') && hasInteracted) {
      toast.info(`Nice try! Press Enter to visit ${href}`);
    }
    setIsHovering(false);
    setPosition({ x: 0, y: 0 });
  };

  return (
    <a
      ref={linkRef}
      href={href}
      className={className}
      style={{
        transform: prefersReducedMotion ? 'none' : `translate(${position.x}px, ${position.y}px)`,
        transition: prefersReducedMotion ? 'none' : 'transform 0.05s ease-out',
        display: 'inline-block',
        willChange: prefersReducedMotion ? 'auto' : 'transform',
      }}
      onMouseEnter={() => !prefersReducedMotion && setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        setPosition({ x: 0, y: 0 });
      }}
      onFocus={handleFocus}
    >
      {children}
    </a>
  );
} 