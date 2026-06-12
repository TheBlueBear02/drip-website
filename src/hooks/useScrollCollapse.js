import { useEffect, useRef, useState } from 'react';

/**
 * Collapse UI when scrolling down; expand again when scrolling up or near page top.
 * @param {{ threshold?: number, topOffset?: number }} options
 */
export function useScrollCollapse({
  threshold = 10,
  topOffset = 32,
} = {}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      setIsCollapsed(false);
      return undefined;
    }

    lastScrollY.current = window.scrollY;

    const update = () => {
      const currentY = window.scrollY;

      if (currentY <= topOffset) {
        setIsCollapsed(false);
      } else {
        const delta = currentY - lastScrollY.current;
        if (delta > threshold) {
          setIsCollapsed(true);
        } else if (delta < -threshold) {
          setIsCollapsed(false);
        }
      }

      lastScrollY.current = currentY;
      ticking.current = false;
    };

    const onScroll = () => {
      if (!ticking.current) {
        ticking.current = true;
        requestAnimationFrame(update);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    update();

    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold, topOffset]);

  return isCollapsed;
}
