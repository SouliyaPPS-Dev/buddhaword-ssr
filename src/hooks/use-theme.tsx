import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

const ThemeProps = {
  key: 'theme',
  light: 'light',
  dark: 'dark',
} as const;

type Theme = (typeof ThemeProps)[keyof typeof ThemeProps];

interface ThemeContextType {
  theme: Theme;
  isDark: boolean;
  isLight: boolean;
  setLightTheme: () => void;
  setDarkTheme: () => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') {
      return ThemeProps.light;
    }
    const storedTheme = localStorage.getItem(ThemeProps.key) as Theme | null;
    return storedTheme || ThemeProps.light;
  });

  const isDark = useMemo(() => theme === ThemeProps.dark, [theme]);
  const isLight = useMemo(() => theme === ThemeProps.light, [theme]);

  const applyTheme = (nextTheme: Theme) => {
    if (typeof document !== 'undefined') {
      document.documentElement.classList.remove(ThemeProps.light, ThemeProps.dark);
      document.documentElement.classList.add(nextTheme);
    }
    localStorage.setItem(ThemeProps.key, nextTheme);
    setTheme(nextTheme);
  };

  const setLightTheme = () => applyTheme(ThemeProps.light);
  const setDarkTheme = () => applyTheme(ThemeProps.dark);
  const toggleTheme = () => applyTheme(isDark ? ThemeProps.light : ThemeProps.dark);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      applyTheme(theme);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ThemeContext.Provider
      value={{ theme, isDark, isLight, setLightTheme, setDarkTheme, toggleTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
