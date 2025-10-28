import React from 'react';
import { Button } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../theme/ThemeProvider';
import './ConsentScreen.css';

interface ConsentScreenProps {
  onConsent: () => void;
  onDecline: () => void;
}

const ConsentScreen: React.FC<ConsentScreenProps> = ({ onConsent, onDecline }) => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  return (
    <div className="consent-screen">
      <div className="consent-container">
        <div className="consent-content">
          {/* Header */}
          <h1 className="consent-title">
            {t('consent.title')}
          </h1>

          {/* Introductory Text */}
          <p className="consent-description">
            {t('consent.description')}
          </p>

          {/* Data Collection Summary */}
          <div className="data-collection-summary">
            <h3 className="summary-title">{t('consent.dataCollectionSummary.title')}</h3>
            <div className="summary-items">
              <div className="summary-item">
                <CheckCircleOutlined className="summary-icon" />
                <span>{t('consent.dataCollectionSummary.items.dataCollected')}</span>
              </div>
              <div className="summary-item">
                <CheckCircleOutlined className="summary-icon" />
                <span>{t('consent.dataCollectionSummary.items.purpose')}</span>
              </div>
              <div className="summary-item">
                <CheckCircleOutlined className="summary-icon" />
                <span>{t('consent.dataCollectionSummary.items.dataProtection')}</span>
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
              {t('consent.buttons.consent')}
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
              {t('consent.buttons.decline')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsentScreen;
