import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import type { Theme } from './theme';
import { createTheme, defaultTheme } from './theme';

interface ThemeContextType {
  theme: Theme;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  initialTheme?: Theme;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ 
  children, 
  initialTheme = defaultTheme 
}) => {
  const [theme] = useState<Theme>(initialTheme);

  // Update CSS custom properties when theme changes
  useEffect(() => {
    const root = document.documentElement;
    
    // Update CSS custom properties
    root.style.setProperty('--theme-primary-main', theme.primary.main);
    root.style.setProperty('--theme-primary-light', theme.primary.light);
    root.style.setProperty('--theme-primary-dark', theme.primary.dark);
    root.style.setProperty('--theme-primary-contrast', theme.primary.contrast);
    
    root.style.setProperty('--theme-secondary-main', theme.secondary.main);
    root.style.setProperty('--theme-secondary-light', theme.secondary.light);
    root.style.setProperty('--theme-secondary-dark', theme.secondary.dark);
    root.style.setProperty('--theme-secondary-contrast', theme.secondary.contrast);
    
    // Accent Colors
    root.style.setProperty('--theme-accent-main', theme.accent.main);
    root.style.setProperty('--theme-accent-light', theme.accent.light);
    root.style.setProperty('--theme-accent-dark', theme.accent.dark);
    root.style.setProperty('--theme-accent-contrast', theme.accent.contrast);
    
    root.style.setProperty('--theme-bg-default', theme.background.default);
    root.style.setProperty('--theme-bg-paper', theme.background.paper);
    
    root.style.setProperty('--theme-text-primary', theme.text.primary);
    root.style.setProperty('--theme-text-secondary', theme.text.secondary);
    
    root.style.setProperty('--theme-border-default', theme.border.default);
    root.style.setProperty('--theme-border-light', theme.border.light);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
