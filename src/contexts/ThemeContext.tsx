import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  ReactNode,
} from 'react';
import { ThemeId, getThemeColors, ThemeColors } from '../theme';

interface ThemeContextValue {
  theme: ThemeId;
  setTheme: (theme: ThemeId) => void;
  colors: ThemeColors;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<ThemeId>('red');
  const colors = useMemo(() => getThemeColors(theme), [theme]);
  const value = useMemo(() => ({ theme, setTheme, colors }), [theme, colors]);
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextValue => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
};
