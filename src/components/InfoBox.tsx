import React from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';
import { useTheme } from '../theme/ThemeProvider';
import './InfoBox.css';

interface InfoBoxProps {
  children: React.ReactNode;
}

const InfoBox: React.FC<InfoBoxProps> = ({ children }) => {
  const { theme } = useTheme();

  return (
    <div className="info-box">
      <div 
        className="info-box-accent"
        style={{ backgroundColor: theme.secondary.main }}
      />
      <div className="info-box-content">
        <InfoCircleOutlined 
          className="info-icon"
          style={{ color: theme.secondary.main }}
        />
        <span className="info-text">{children}</span>
      </div>
    </div>
  );
};

export default InfoBox;



