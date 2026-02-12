import { useRouter, useRouterState } from '@tanstack/react-router';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

export type NavigationContextType = {
  history: string[];
  back: () => void;
};

const NavigationContext = createContext<NavigationContextType | null>(null);

const HISTORY_STORAGE_KEY = 'navigation_history';

export const NavigationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const location = useRouterState({ select: (state) => state.location });
  const [history, setHistory] = useState<string[]>(() => {
    if (typeof window === 'undefined') {
      return [];
    }
    const saved = window.localStorage.getItem(HISTORY_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const currentPath = location.pathname;
    setHistory((prev) => {
      if (prev.at(-1) === currentPath) return prev;
      const updated = [...prev, currentPath];
      window.localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, [location.pathname]);

  const back = useCallback(() => {
    setHistory((prev) => {
      if (prev.length <= 1) {
        router.navigate({ to: '/' });
        return ['/'];
      }

      const updated = prev.slice(0, -1);
      const target = updated.at(-1) ?? '/';
      router.navigate({ to: target as never });
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updated));
      }
      return updated;
    });
  }, [router]);

  const value = useMemo(
    () => ({ history, back }),
    [history, back],
  );

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within NavigationProvider');
  }
  return context;
};
