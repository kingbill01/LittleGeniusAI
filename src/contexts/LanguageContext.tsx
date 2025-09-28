import React, { createContext, useContext, useState, ReactNode } from 'react';
import { SupportedLanguage } from '../utils/translations';

interface LanguageContextType {
  currentLanguage: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  availableLanguages: { code: SupportedLanguage; name: string; flag: string }[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguage>('fr');

  const availableLanguages = [
    { code: 'fr' as SupportedLanguage, name: 'Français', flag: '🇫🇷' },
    { code: 'en' as SupportedLanguage, name: 'English', flag: '🇬🇧' },
    { code: 'cs' as SupportedLanguage, name: 'Čeština', flag: '🇨🇿' },
  ];

  const setLanguage = (lang: SupportedLanguage) => {
    setCurrentLanguage(lang);
    localStorage.setItem('littlegenius-language', lang);
  };

  // Charger la langue sauvegardée au démarrage
  React.useEffect(() => {
    const savedLanguage = localStorage.getItem('littlegenius-language') as SupportedLanguage;
    if (savedLanguage && ['fr', 'en', 'cs'].includes(savedLanguage)) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const value: LanguageContextType = {
    currentLanguage,
    setLanguage,
    availableLanguages,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};