'use client';
import { useEffect, useState } from 'react';
export const useIsScrollTop = ({ enabled = true }: { enabled?: boolean }) => {
  const [isTop, setIsTop] = useState<boolean | undefined>();
  useEffect(() => {
    if (!enabled) return;
    const listener = () => {
      setIsTop(window.scrollY < 10);
    };
    listener();
    window.addEventListener('scroll', listener);
    return () => {
      window.removeEventListener('scroll', listener);
    };
  }, [enabled]);
  return isTop;
};
