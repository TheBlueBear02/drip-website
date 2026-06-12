import { useEffect, useRef, useState } from 'react';

/**
 * @param {{ threshold?: number, rootMargin?: string, once?: boolean }} options
 */
export function useInView({
  threshold = 0.2,
  rootMargin = '0px 0px -8% 0px',
  once = true,
} = {}) {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setIsInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return [ref, isInView];
}
