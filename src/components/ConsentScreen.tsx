import React from 'react';
import { Button } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import { useTheme } from '../theme/ThemeProvider';
import './ConsentScreen.css';

interface ConsentScreenProps {
  onConsent: () => void;
  onDecline: () => void;
}

const ConsentScreen: React.FC<ConsentScreenProps> = ({ onConsent, onDecline }) => {
  const { theme } = useTheme();

  return (
    <div className="consent-screen">
      <div className="consent-container">
        <div className="consent-content">
          {/* Header */}
          <h1 className="consent-title">
            Travel Health Declaration – Consent Required
          </h1>

          {/* Introductory Text */}
          <p className="consent-description">
            Before proceeding, please review how your information will be used. 
            This declaration collects minimal personal and health details to help 
            Africa CDC detect and respond to disease outbreaks. Your information 
            will be stored securely in compliance with data-protection laws.
          </p>

          {/* Data Collection Summary */}
          <div className="data-collection-summary">
            <h3 className="summary-title">Data Collection Summary:</h3>
            <div className="summary-items">
              <div className="summary-item">
                <CheckCircleOutlined className="summary-icon" />
                <span>Data collected – identification, travel history, symptoms</span>
              </div>
              <div className="summary-item">
                <CheckCircleOutlined className="summary-icon" />
                <span>Purpose – public-health monitoring</span>
              </div>
              <div className="summary-item">
                <CheckCircleOutlined className="summary-icon" />
                <span>Data protection and retention standards</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="consent-actions">
            <Button
              type="primary"
              size="large"
              className="consent-button primary-button"
              onClick={onConsent}
              style={{
                backgroundColor: theme.primary.main,
                borderColor: theme.primary.main,
                color: theme.primary.contrast,
              }}
            >
              I Consent and Continue
            </Button>
            
            <Button
              size="large"
              className="consent-button secondary-button"
              onClick={onDecline}
              style={{
                backgroundColor: 'white',
                borderColor: theme.text.primary,
                color: theme.text.primary,
              }}
            >
              I Do Not Consent
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsentScreen;
