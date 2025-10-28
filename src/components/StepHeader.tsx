import React from 'react';
import { useTheme } from '../theme/ThemeProvider';
import { UserOutlined, HistoryOutlined, HeartOutlined, FileTextOutlined } from '@ant-design/icons';
import './StepHeader.css';

interface StepHeaderProps {
  currentStep: number;
  totalSteps: number;
}

const stepTitles = [
  'Traveller Identification',
  'Travel History', 
  'Health Declaration',
  'Review Your Declaration'
];

const stepIcons = [
  <UserOutlined />,
  <HistoryOutlined />,
  <HeartOutlined />,
  <FileTextOutlined />
];

const StepHeader: React.FC<StepHeaderProps> = ({ currentStep, totalSteps }) => {
  const { theme } = useTheme();
  
  const progressPercentage = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div 
      className="step-header"
      style={{ backgroundColor: theme.primary.main }}
    >
      <div className="step-header-content">
        <div className="step-info">
          <div className="step-number">
            Step {currentStep + 1} of {totalSteps}
          </div>
          <div className="step-title">
            {stepTitles[currentStep]}
          </div>
        </div>
        
        <div className="step-icon">
          {stepIcons[currentStep]}
        </div>
      </div>
      
      <div className="progress-container">
        <div 
          className="progress-bar"
          style={{ 
            backgroundColor: theme.primary.light,
            width: `${progressPercentage}%`
          }}
        />
      </div>
    </div>
  );
};

export default StepHeader;
