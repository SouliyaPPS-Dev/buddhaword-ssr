import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

interface FontSizeContextValue {
  fontSize: number;
  increase: () => void;
  decrease: () => void;
}

const FontSizeContext = createContext<FontSizeContextValue | null>(null);
const STORAGE_KEY = 'font-size-preference';
const MIN_SIZE = 16;
const MAX_SIZE = 22;
const DEFAULT_SIZE = 18;

export const FontSizeProvider = ({ children }: { children: React.ReactNode }) => {
  const [fontSize, setFontSize] = useState(() => {
    if (typeof window === 'undefined') {
      return DEFAULT_SIZE;
    }
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored ? Number(stored) : DEFAULT_SIZE;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(STORAGE_KEY, String(fontSize));
  }, [fontSize]);

  const value = useMemo<FontSizeContextValue>(
    () => ({
      fontSize,
      increase: () => setFontSize((size) => Math.min(size + 1, MAX_SIZE)),
      decrease: () => setFontSize((size) => Math.max(size - 1, MIN_SIZE)),
    }),
    [fontSize],
  );

  return <FontSizeContext.Provider value={value}>{children}</FontSizeContext.Provider>;
};

export const useFontSize = () => {
  const context = useContext(FontSizeContext);
  if (!context) {
    throw new Error('useFontSize must be used within a FontSizeProvider');
  }
  return context;
};
