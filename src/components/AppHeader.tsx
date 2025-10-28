import React, { useState } from 'react';
import { Select, Dropdown, Button } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';
import { useTheme } from '../theme/ThemeProvider';
import './AppHeader.css';

interface Language {
  code: string;
  name: string;
  flag: string;
}

const languages: Language[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'sw', name: 'Kiswahili', flag: '🇹🇿' },
];

interface AppHeaderProps {
  onLanguageChange?: (language: string) => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({ onLanguageChange }) => {
  const { theme } = useTheme();
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en');

  const handleLanguageChange = (languageCode: string) => {
    setSelectedLanguage(languageCode);
    onLanguageChange?.(languageCode);
  };

  const selectedLang = languages.find(lang => lang.code === selectedLanguage) || languages[0];

  const languageMenuItems = languages.map(lang => ({
    key: lang.code,
    label: (
      <div className="language-option">
        <span className="flag">{lang.flag}</span>
        <span className="language-name">{lang.name}</span>
      </div>
    ),
    onClick: () => handleLanguageChange(lang.code),
  }));

  return (
    <header className="app-header theme-bg-paper">
      <div className="header-content">
        {/* Africa CDC Logo */}
        <div className="logo-section">
          <img 
            src="/AfricaCDC_Logo.png" 
            alt="Africa CDC" 
            className="africa-cdc-logo"
          />
        </div>

        {/* Right Section - Language Selector */}
        <div className="header-right-section">
          {/* Language Selector */}
          <Dropdown
            menu={{ items: languageMenuItems }}
            placement="bottomRight"
            trigger={['click']}
          >
            <Button 
              className="language-selector theme-primary-border theme-primary"
            >
              <span className="selected-flag">{selectedLang.flag}</span>
              <span className="selected-language">{selectedLang.name}</span>
              <GlobalOutlined />
            </Button>
          </Dropdown>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
