import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ConsentContextType {
  hasConsented: boolean;
  setConsent: (consented: boolean) => void;
  resetConsent: () => void;
}

const ConsentContext = createContext<ConsentContextType | undefined>(undefined);

interface ConsentProviderProps {
  children: ReactNode;
}

export const ConsentProvider: React.FC<ConsentProviderProps> = ({ children }) => {
  // Always start with no consent - don't persist state
  const [hasConsented, setHasConsented] = useState<boolean>(false);

  const setConsent = (consented: boolean) => {
    setHasConsented(consented);
    // Don't save to localStorage - consent should be fresh each session
  };

  const resetConsent = () => {
    setHasConsented(false);
    // No localStorage to clear
  };

  return (
    <ConsentContext.Provider value={{ hasConsented, setConsent, resetConsent }}>
      {children}
    </ConsentContext.Provider>
  );
};

export const useConsent = (): ConsentContextType => {
  const context = useContext(ConsentContext);
  if (!context) {
    throw new Error('useConsent must be used within a ConsentProvider');
  }
  return context;
};
