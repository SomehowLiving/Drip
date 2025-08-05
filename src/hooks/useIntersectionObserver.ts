import { useEffect, useState } from "react";
// ==========================================
// Required Custom Hooks
// ==========================================

// hooks/useIntersectionObserver.ts
export const useIntersectionObserver = (options: IntersectionObserverInit) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [ref, setRef] = useState<Element | null>(null);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsIntersecting(entry.isIntersecting),
      options
    );

    observer.observe(ref);
    return () => observer.disconnect();
  }, [ref, options]);

  return { ref: setRef, isIntersecting };
};
