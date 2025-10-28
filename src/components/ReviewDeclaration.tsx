import React, { useState } from 'react';
import { Card, Button, Checkbox, Divider } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { useTheme } from '../theme/ThemeProvider';
import './ReviewDeclaration.css';

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
  title?: string;
  first_name: string;
  last_name: string;
  gender?: string;
  email: string;
  phone_number: string;
  phone_country_code?: string;
  passport_number: string;
  nationality: string;
  port_type?: string;
  port_of_capture?: string;
  trips: Trip[];
  health: HealthData;
  description: string;
}

interface ReviewDeclarationProps {
  formData: FormData;
  onEdit: (step: number) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

const ReviewDeclaration: React.FC<ReviewDeclarationProps> = ({
  formData,
  onEdit,
  onSubmit,
  isSubmitting
}) => {
  const { theme } = useTheme();
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleSubmit = () => {
    if (isConfirmed) {
      onSubmit();
    }
  };

  const getCountryName = (code: string) => {
    // This would typically come from a countries lookup
    const countryMap: { [key: string]: string } = {
      'ZA': 'South Africa',
      'NG': 'Nigeria',
      'KE': 'Kenya',
      'US': 'United States',
      'GB': 'United Kingdom',
      // Add more as needed
    };
    return countryMap[code] || code;
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatPhoneNumber = () => {
    const countryCode = formData.phone_country_code || '+27';
    return `${countryCode} ${formData.phone_number}`;
  };

  return (
    <div className="review-declaration">
      <div className="review-instruction">
        Please review your information carefully before submitting your declaration.
      </div>

      <div className="review-sections">
        {/* Personal Information */}
        <Card className="review-section-card">
          <div className="section-header">
            <h3 className="section-title">Personal Information</h3>
            <Button 
              type="link" 
              icon={<EditOutlined />}
              onClick={() => onEdit(0)}
              className="edit-button"
            >
              Edit
            </Button>
          </div>
          <div className="section-content">
            <div className="info-row">
              <span className="info-label">Title:</span>
              <span className="info-value">{formData.title || 'Not specified'}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Name:</span>
              <span className="info-value">{formData.first_name} {formData.last_name}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Gender:</span>
              <span className="info-value">{formData.gender || 'Not specified'}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Nationality:</span>
              <span className="info-value">{getCountryName(formData.nationality)}</span>
            </div>
          </div>
        </Card>

        {/* Contact Details */}
        <Card className="review-section-card">
          <div className="section-header">
            <h3 className="section-title">Contact Details</h3>
            <Button 
              type="link" 
              icon={<EditOutlined />}
              onClick={() => onEdit(0)}
              className="edit-button"
            >
              Edit
            </Button>
          </div>
          <div className="section-content">
            <div className="info-row">
              <span className="info-label">Email:</span>
              <span className="info-value">{formData.email}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Phone:</span>
              <span className="info-value">{formatPhoneNumber()}</span>
            </div>
          </div>
        </Card>

        {/* Travel History */}
        <Card className="review-section-card">
          <div className="section-header">
            <h3 className="section-title">Travel History</h3>
            <Button 
              type="link" 
              icon={<EditOutlined />}
              onClick={() => onEdit(1)}
              className="edit-button"
            >
              Edit
            </Button>
          </div>
          <div className="section-content">
            <div className="info-label">Countries:</div>
            {formData.trips && formData.trips.length > 0 ? (
              <div className="travel-list">
                {formData.trips.map((trip, index) => (
                  <div key={index} className="travel-item">
                    {getCountryName(trip.destination_country)} ({trip.destination_country}) {formatDate(trip.start_date)} - {formatDate(trip.end_date)}
                  </div>
                ))}
              </div>
            ) : (
              <div className="info-value">No travel history recorded</div>
            )}
          </div>
        </Card>

        {/* Health Declaration */}
        <Card className="review-section-card">
          <div className="section-header">
            <h3 className="section-title">Health Declaration</h3>
            <Button 
              type="link" 
              icon={<EditOutlined />}
              onClick={() => onEdit(2)}
              className="edit-button"
            >
              Edit
            </Button>
          </div>
          <div className="section-content">
            <div className="info-row">
              <span className="info-label">Fever/Chills:</span>
              <span className="info-value">{formData.health?.fever ? 'Yes' : 'No'}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Cough/Breathing:</span>
              <span className="info-value">{(formData.health?.cough || formData.health?.difficulty_breathing) ? 'Yes' : 'No'}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Digestive Issues:</span>
              <span className="info-value">{(formData.health?.diarrhea || formData.health?.runny_nose) ? 'Yes' : 'No'}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Other Symptoms:</span>
              <span className="info-value">{formData.health?.other_symptoms || 'No'}</span>
            </div>
          </div>
        </Card>

        {/* Capture Details */}
        <Card className="review-section-card">
          <div className="section-header">
            <h3 className="section-title">Capture Details</h3>
            <Button 
              type="link" 
              icon={<EditOutlined />}
              onClick={() => onEdit(0)}
              className="edit-button"
            >
              Edit
            </Button>
          </div>
          <div className="section-content">
            <div className="info-row">
              <span className="info-label">Port Type:</span>
              <span className="info-value">{formData.port_type || 'Not specified'}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Location:</span>
              <span className="info-value">{formData.port_of_capture || 'Not specified'}</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Confirmation Checkbox */}
      <div className="confirmation-section">
        <Checkbox
          checked={isConfirmed}
          onChange={(e) => setIsConfirmed(e.target.checked)}
          className="confirmation-checkbox"
        >
          I confirm that the above information is accurate and complete to the best of my knowledge.
        </Checkbox>
      </div>

      {/* Navigation Buttons */}
      <div className="review-actions">
        <Button 
          onClick={() => onEdit(2)}
          disabled={isSubmitting}
          className="back-button"
        >
          Back
        </Button>
        <Button 
          type="primary"
          onClick={handleSubmit}
          disabled={!isConfirmed || isSubmitting}
          loading={isSubmitting}
          className="submit-button"
          style={{
            backgroundColor: isConfirmed ? theme.secondary.main : undefined,
            borderColor: isConfirmed ? theme.secondary.main : undefined,
          }}
        >
          Submit Declaration
        </Button>
      </div>
    </div>
  );
};

export default ReviewDeclaration;
