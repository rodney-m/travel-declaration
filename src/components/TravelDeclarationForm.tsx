import React, { useState } from 'react';
import { Card, Steps, Button, Space, message } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
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
      
      message.success('Travel declaration submitted successfully!');
      
      // Reset form after successful submission
      resetForm();
      
    } catch (error: any) {
      console.error('Submission error:', error);
      
      // Handle different types of errors
      if (error.response) {
        // Server responded with error status
        const errorMessage = error.response.data?.message || 'Server error occurred';
        message.error(`Submission failed: ${errorMessage}`);
      } else if (error.request) {
        // Network error
        message.error('Network error. Please check your connection and try again.');
      } else {
        // Other error
        message.error('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
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
    </div>
  );
};

export default TravelDeclarationForm;
