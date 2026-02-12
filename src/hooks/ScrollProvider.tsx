import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { useRouterState } from '@tanstack/react-router';

interface ScrollContextValue {
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
}

const ScrollContext = createContext<ScrollContextValue | null>(null);

export const ScrollProvider = ({ children }: { children: React.ReactNode }) => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const location = useRouterState({ select: (state) => state.location });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const container = scrollContainerRef.current ?? document.documentElement;
    requestAnimationFrame(() => {
      container.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }, [location.pathname]);

  const value = useMemo<ScrollContextValue>(() => ({ scrollContainerRef }), []);

  return <ScrollContext.Provider value={value}>{children}</ScrollContext.Provider>;
};

export const useScrollingStore = () => {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error('useScrollingStore must be used within a ScrollProvider');
  }
  return context;
};
