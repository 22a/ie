'use client';
import { useState, useRef, useEffect } from 'react';
import { toast } from 'sonner';
import { twMerge } from 'tailwind-merge';

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
  maxDistance = 300,
}: RunawayLinkProps) {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const [viewportSize, setViewportSize] = useState({ width: 0, height: 0 });

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
    const updateViewportSize = () => {
      setViewportSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateViewportSize();
    window.addEventListener('resize', updateViewportSize);
    return () => window.removeEventListener('resize', updateViewportSize);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!linkRef.current || !isHovering) return;

      const link = linkRef.current.getBoundingClientRect();
      const linkWidth = link.width;
      const linkHeight = link.height;
      const linkCenterX = link.left + link.width / 2;
      const linkCenterY = link.top + link.height / 2;

      const deltaX = e.clientX - linkCenterX;
      const deltaY = e.clientY - linkCenterY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      const force = Math.min(
        1,
        Math.pow((maxDistance - distance) / maxDistance, 2)
      );

      if (distance < maxDistance) {
        setHasInteracted(true);
        const escapeX = -deltaX * force * 1.2 + velocity.x * 0.6;
        const escapeY = -deltaY * force * 1.2 + velocity.y * 0.6;

        const randomAngle = Math.random() * Math.PI * 2;
        const randomness = 12 * force;

        let newX = escapeX + Math.cos(randomAngle) * randomness;
        let newY = escapeY + Math.sin(randomAngle) * randomness;

        let nextX = position.x + newX;
        let nextY = position.y + newY;

        if (nextX < 0 || nextX + linkWidth > viewportSize.width) {
          newX = -newX * 0.8;
          nextX = nextX < 0 ? 0 : viewportSize.width - linkWidth;
        }
        if (nextY < 0 || nextY + linkHeight > viewportSize.height) {
          newY = -newY * 0.8;
          nextY = nextY < 0 ? 0 : viewportSize.height - linkHeight;
        }

        setPosition({ x: nextX, y: nextY });
        setVelocity({ x: newX, y: newY });
      } else {
        setVelocity((prev) => ({
          x: prev.x * 0.9,
          y: prev.y * 0.9,
        }));
        setPosition((prev) => ({
          x: prev.x + velocity.x,
          y: prev.y * 0.9,
        }));
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [
    isHovering,
    maxDistance,
    position,
    velocity,
    prefersReducedMotion,
    viewportSize,
  ]);

  const handleFocus = (e: React.FocusEvent<HTMLAnchorElement>) => {
    if (e.target.matches(':focus-visible') && hasInteracted) {
      toast.success(
        `Congratulations! You have overcome gravitational adversity at the hands of inaccessible web design. Press Enter to visit ${href}`
      );
      e.target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    setIsHovering(false);
    setPosition({ x: 0, y: 0 });
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setPosition({ x: 0, y: 0 });
    setVelocity({ x: 0, y: 0 });
  };

  return (
    <a
      ref={linkRef}
      href={href}
      className={twMerge(
        'inline-block px-3 py-1.5 text-background bg-transparent bg-foreground rounded-lg border border-background border-opacity-20 transition-colors duration-200 font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-azure-500 focus-visible:ring-offset-0 focus-visible:border-opacity-0',
        className
      )}
      style={{
        transform: prefersReducedMotion
          ? 'none'
          : `translate(${position.x}px, ${position.y}px)`,
        transition: prefersReducedMotion ? 'none' : 'transform 0.05s ease-out',
        display: 'inline-block',
        willChange: prefersReducedMotion ? 'auto' : 'transform',
      }}
      onMouseEnter={() => !prefersReducedMotion && setIsHovering(true)}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
    >
      {children}
    </a>
  );
}
