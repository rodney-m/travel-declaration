export type Theme = {
  primary: {
    main: string;
    light: string;
    dark: string;
    contrast: string;
  };
  secondary: {
    main: string;
    light: string;
    dark: string;
    contrast: string;
  };
  accent: {
    main: string;
    light: string;
    dark: string;
    contrast: string;
  };
  background: {
    default: string;
    paper: string;
  };
  text: {
    primary: string;
    secondary: string;
  };
  border: {
    default: string;
    light: string;
  };
};

import { getCurrentOrganization } from '../config/organization';

// Helper function to generate light and dark variants of a color
const lightenColor = (color: string, percent: number): string => {
  const num = parseInt(color.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = (num >> 8 & 0x00FF) + amt;
  const B = (num & 0x0000FF) + amt;
  return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
    (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
    (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
};

const darkenColor = (color: string, percent: number): string => {
  const num = parseInt(color.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) - amt;
  const G = (num >> 8 & 0x00FF) - amt;
  const B = (num & 0x0000FF) - amt;
  return '#' + (0x1000000 + (R > 255 ? 255 : R < 0 ? 0 : R) * 0x10000 +
    (G > 255 ? 255 : G < 0 ? 0 : G) * 0x100 +
    (B > 255 ? 255 : B < 0 ? 0 : B)).toString(16).slice(1);
};

// Generate theme from organization config
const orgConfig = getCurrentOrganization();

export const defaultTheme: Theme = {
  primary: {
    main: orgConfig.colors.primary,
    light: lightenColor(orgConfig.colors.primary, 20),
    dark: darkenColor(orgConfig.colors.primary, 20),
    contrast: '#FFFFFF',
  },
  secondary: {
    main: orgConfig.colors.secondary,
    light: lightenColor(orgConfig.colors.secondary, 20),
    dark: darkenColor(orgConfig.colors.secondary, 20),
    contrast: '#FFFFFF',
  },
  accent: {
    main: orgConfig.colors.accent,
    light: lightenColor(orgConfig.colors.accent, 20),
    dark: darkenColor(orgConfig.colors.accent, 20),
    contrast: '#FFFFFF',
  },
  background: {
    default: '#f5f5f5',
    paper: '#ffffff',
  },
  text: {
    primary: '#333333',
    secondary: '#666666',
  },
  border: {
    default: '#d9d9d9',
    light: '#f0f0f0',
  },
};

export const createTheme = (customTheme?: Partial<Theme>): Theme => {
  return {
    ...defaultTheme,
    ...customTheme,
    primary: {
      ...defaultTheme.primary,
      ...customTheme?.primary,
    },
    secondary: {
      ...defaultTheme.secondary,
      ...customTheme?.secondary,
    },
    accent: {
      ...defaultTheme.accent,
      ...customTheme?.accent,
    },
    background: {
      ...defaultTheme.background,
      ...customTheme?.background,
    },
    text: {
      ...defaultTheme.text,
      ...customTheme?.text,
    },
    border: {
      ...defaultTheme.border,
      ...customTheme?.border,
    },
  };
};

