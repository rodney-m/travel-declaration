/**
 * Organization Configuration
 * 
 * This file contains the organization-specific configuration including:
 * - Brand colors
 * - Organization details
 * - App settings
 * 
 * Change these values to customize the app for different organizations/countries
 */

export interface OrganizationConfig {
  // Organization Details
  name: string;
  logo: string;
  website?: string;
  
  // Brand Colors
  colors: {
    primary: string;    // Main brand color (CTAs, primary actions)
    secondary: string;  // Secondary color (success states, secondary actions)
    accent: string;     // Accent color (error states, danger actions)
  };
  
  // App Settings
  settings: {
    showLanguageSelector: boolean;
    supportedLanguages: string[];
    defaultLanguage: string;
  };
}

// Africa CDC Configuration (Default)
export const africaCDCConfig: OrganizationConfig = {
  name: "Africa CDC",
  logo: "/AfricaCDC_Logo.png",
  website: "https://africacdc.org",
  
  colors: {
    primary: "#B4A269",    // Africa CDC Gold
    secondary: "#1a5632",  // Africa CDC Green
    accent: "#9f2241",     // Africa CDC Red
  },
  
  settings: {
    showLanguageSelector: true,
    supportedLanguages: ["en", "fr", "sw"],
    defaultLanguage: "en",
  },
};

// Example: WHO Configuration
export const whoConfig: OrganizationConfig = {
  name: "World Health Organization",
  logo: "/WHO_Logo.png",
  website: "https://who.int",
  
  colors: {
    primary: "#009639",    // WHO Blue
    secondary: "#00A651",  // WHO Green
    accent: "#D32F2F",     // WHO Red
  },
  
  settings: {
    showLanguageSelector: true,
    supportedLanguages: ["en", "fr", "es", "ar", "zh", "ru"],
    defaultLanguage: "en",
  },
};

// Example: Ministry of Health Configuration
export const ministryHealthConfig: OrganizationConfig = {
  name: "Ministry of Health",
  logo: "/Ministry_Logo.png",
  
  colors: {
    primary: "#1976D2",    // Government Blue
    secondary: "#388E3C",  // Success Green
    accent: "#D32F2F",     // Error Red
  },
  
  settings: {
    showLanguageSelector: true,
    supportedLanguages: ["en", "fr"],
    defaultLanguage: "en",
  },
};

// Current Organization Configuration
// Change this to switch between different organizations
export const currentOrganization: OrganizationConfig = africaCDCConfig;

// Helper function to get current organization config
export const getCurrentOrganization = (): OrganizationConfig => {
  return currentOrganization;
};



