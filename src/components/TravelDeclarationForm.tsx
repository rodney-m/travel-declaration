import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { ExclamationCircleOutlined, ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import StepHeader from './StepHeader';
import InfoBox from './InfoBox';
import TravelerIdentification from './TravelerIdentification';
import TravelHistory from './TravelHistory';
import HealthDeclaration from './HealthDeclaration';
import ReviewDeclaration from './ReviewDeclaration';
import SuccessScreen from './SuccessScreen';


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
  const [showSuccessScreen, setShowSuccessScreen] = useState(false);
  const [referenceId, setReferenceId] = useState('');
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
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate reference ID (dummy for testing)
      const generatedReferenceId = `HDC-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`;
      setReferenceId(generatedReferenceId);
      
      // Show success screen
      setShowSuccessScreen(true);
      
    } catch (error: unknown) {
      console.error('Submission error:', error);
      
      // Handle different types of errors
      let errorMsg = 'An unexpected error occurred. Please try again.';
      
      if (error && typeof error === 'object' && 'response' in error) {
        // Server responded with error status
        const axiosError = error as { response: { data?: { message?: string } } };
        errorMsg = axiosError.response.data?.message || 'Server error occurred';
      } else if (error && typeof error === 'object' && 'request' in error) {
        // Network error
        errorMsg = 'Network error. Please check your connection and try again.';
      } else if (error && typeof error === 'object' && 'message' in error) {
        const errorWithMessage = error as { message: string };
        errorMsg = errorWithMessage.message;
      }
      
      setErrorMessage(errorMsg);
      setErrorModalVisible(true);
      
    } finally {
      setIsSubmitting(false);
    }
  };


  const handleErrorModalOk = () => {
    setErrorModalVisible(false);
    setErrorMessage('');
  };

  const handleReturnHome = () => {
    setShowSuccessScreen(false);
    setReferenceId('');
    resetForm();
  };

  // Add the review step after handleSubmit is defined
  const allSteps = [
    ...steps,
    {
      title: 'Review Your Declaration',
      content: (
        <ReviewDeclaration
          formData={formData}
          onEdit={setCurrentStep}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      ),
    },
  ];

  // Show success screen if submission was successful
  if (showSuccessScreen) {
    return (
      <SuccessScreen
        formData={formData}
        referenceId={referenceId}
        onReturnHome={handleReturnHome}
      />
    );
  }

  return (
    <div className="travel-declaration-form">
      <StepHeader currentStep={currentStep} totalSteps={allSteps.length} />
      
      <div className="form-content-wrapper">
        <InfoBox>
          Provide details exactly as shown in your travel documents.
        </InfoBox>
        
        <div className="form-content">
          {allSteps[currentStep].content}
        </div>

        {/* Only show form actions for steps 0-2, step 3 (review) has its own actions */}
        {currentStep < allSteps.length - 1 && (
          <div className="form-actions">
            <div className="form-actions-buttons">
              {currentStep > 0 && (
                <Button 
                  onClick={prev} 
                  disabled={isSubmitting}
                  className="back-button"
                  icon={<ArrowLeftOutlined />}
                >
                  Back
                </Button>
              )}
              <Button 
                type="primary" 
                onClick={next} 
                disabled={isSubmitting}
                className="next-button"
              >
                Next
                <ArrowRightOutlined />
              </Button>
            </div>
          </div>
        )}
      </div>


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
