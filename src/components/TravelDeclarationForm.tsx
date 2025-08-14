import React, { useState } from 'react';
import { Card, Steps, Button, Space, Modal } from 'antd';
import { LoadingOutlined, CheckCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import TravelerIdentification from './TravelerIdentification';
import TravelHistory from './TravelHistory';
import HealthDeclaration from './HealthDeclaration';
import { travelDeclarationAPI } from '../services/api';

const { Step } = Steps;

interface Trip {
  departure_country: string;
  destination_country: string;
  start_date: string;
  end_date: string;
}

interface HealthData {
  fever: boolean;
  temperature_celsius: number | null;
  cough: boolean;
  difficulty_breathing: boolean;
  runny_nose: boolean;
  diarrhea: boolean;
  sore_throat: boolean;
  other_symptoms: string;
}

interface FormData {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  passport_number: string;
  nationality: string;
  trips: Trip[];
  health: HealthData;
  description: string;
}

const TravelDeclarationForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState<FormData>({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    passport_number: '',
    nationality: '',
    trips: [
      {
        departure_country: '',
        destination_country: '',
        start_date: '',
        end_date: ''
      }
    ],
    health: {
      fever: false,
      temperature_celsius: null,
      cough: false,
      difficulty_breathing: false,
      runny_nose: false,
      diarrhea: false,
      sore_throat: false,
      other_symptoms: ''
      },
    description: 'Submitted at border post.'
  });

  const steps = [
    {
      title: 'Traveler Identification',
      content: (
        <TravelerIdentification
          formData={formData}
          setFormData={setFormData}
        />
      ),
    },
    {
      title: 'Travel History',
      content: (
        <TravelHistory
          formData={formData}
          setFormData={setFormData}
        />
      ),
    },
    {
      title: 'Health Declaration',
      content: (
        <HealthDeclaration
          formData={formData}
          setFormData={setFormData}
        />
      ),
    },
  ];

  const next = () => {
    setCurrentStep(currentStep + 1);
  };

  const prev = () => {
    setCurrentStep(currentStep - 1);
  };

  const resetForm = () => {
    setFormData({
      first_name: '',
      last_name: '',
      email: '',
      phone_number: '',
      passport_number: '',
      nationality: '',
      trips: [
        {
          departure_country: '',
          destination_country: '',
          start_date: '',
          end_date: ''
        }
      ],
      health: {
        fever: false,
        temperature_celsius: null,
        cough: false,
        difficulty_breathing: false,
        runny_nose: false,
        diarrhea: false,
        sore_throat: false,
        other_symptoms: ''
      },
      description: 'Submitted at border post.'
    });
    setCurrentStep(0);
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      
      // Log the data being sent (for debugging)
      console.log('Submitting form data:', formData);
      
      // Use real API
      const response = await travelDeclarationAPI.submitDeclaration(formData);
      
      console.log('API Response:', response);
      
      // Show success modal
      setSuccessModalVisible(true);
      
    } catch (error: any) {
      console.error('Submission error:', error);
      
      // Handle different types of errors
      let errorMsg = 'An unexpected error occurred. Please try again.';
      
      if (error.response) {
        // Server responded with error status
        errorMsg = error.response.data?.message || 'Server error occurred';
      } else if (error.request) {
        // Network error
        errorMsg = 'Network error. Please check your connection and try again.';
      } else if (error.message) {
        errorMsg = error.message;
      }
      
      setErrorMessage(errorMsg);
      setErrorModalVisible(true);
      
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSuccessModalOk = () => {
    setSuccessModalVisible(false);
    resetForm();
  };

  const handleErrorModalOk = () => {
    setErrorModalVisible(false);
    setErrorMessage('');
  };

  return (
    <div className="travel-declaration-form">
      <Card title="Travel Declaration" className="steps-card">
        <Steps current={currentStep} className="form-steps">
          {steps.map(item => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
      </Card>

      <Card className="content-card">
        <div className="form-content">
          {steps[currentStep].content}
        </div>

        <div className="form-actions">
          <Space>
            {currentStep > 0 && (
              <Button onClick={prev} disabled={isSubmitting}>
                Back
              </Button>
            )}
            {currentStep < steps.length - 1 && (
              <Button type="primary" onClick={next} disabled={isSubmitting}>
                Next
              </Button>
            )}
            {currentStep === steps.length - 1 && (
              <Button 
                type="primary" 
                onClick={handleSubmit}
                loading={isSubmitting}
                icon={isSubmitting ? <LoadingOutlined /> : undefined}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </Button>
            )}
          </Space>
        </div>
      </Card>

      {/* Success Modal */}
      <Modal
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckCircleOutlined style={{ color: '#52c41a', fontSize: '20px' }} />
            <span>Success!</span>
          </div>
        }
        open={successModalVisible}
        onOk={handleSuccessModalOk}
        okText="Start New Declaration"
        cancelButtonProps={{ style: { display: 'none' } }}
        centered
      >
        <div style={{ textAlign: 'center', padding: '20px 0' }}>
          <CheckCircleOutlined style={{ fontSize: '48px', color: '#52c41a', marginBottom: '16px' }} />
          <h3 style={{ marginBottom: '8px', color: '#52c41a' }}>Declaration Submitted Successfully!</h3>
          <p style={{ color: '#666', marginBottom: '0' }}>
            Your travel declaration has been submitted and is being processed. 
            You will receive a confirmation email shortly.
          </p>
        </div>
      </Modal>

      {/* Error Modal */}
      <Modal
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ExclamationCircleOutlined style={{ color: '#ff4d4f', fontSize: '20px' }} />
            <span>Submission Failed</span>
          </div>
        }
        open={errorModalVisible}
        onOk={handleErrorModalOk}
        okText="Try Again"
        cancelButtonProps={{ style: { display: 'none' } }}
        centered
      >
        <div style={{ textAlign: 'center', padding: '20px 0' }}>
          <ExclamationCircleOutlined style={{ fontSize: '48px', color: '#ff4d4f', marginBottom: '16px' }} />
          <h3 style={{ marginBottom: '8px', color: '#ff4d4f' }}>Submission Failed</h3>
          <p style={{ color: '#666', marginBottom: '0' }}>
            {errorMessage}
          </p>
          <p style={{ color: '#999', fontSize: '12px', marginTop: '12px', marginBottom: '0' }}>
            Please check your information and try again. If the problem persists, 
            contact support for assistance.
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default TravelDeclarationForm;
