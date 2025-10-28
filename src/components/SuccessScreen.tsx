import React, { useEffect, useState } from 'react';
import { Button, Card } from 'antd';
import { CheckCircleOutlined, DownloadOutlined, HomeOutlined } from '@ant-design/icons';
import QRCode from 'qrcode';
import { useTheme } from '../theme/ThemeProvider';
import './SuccessScreen.css';

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
  trips: Array<{
    departure_country: string;
    destination_country: string;
    start_date: string;
    end_date: string;
  }>;
  health: {
    fever: boolean;
    temperature_celsius: number | null;
    cough: boolean;
    difficulty_breathing: boolean;
    runny_nose: boolean;
    diarrhea: boolean;
    sore_throat: boolean;
    other_symptoms: string;
  };
  description: string;
}

interface SuccessScreenProps {
  formData: FormData;
  referenceId: string;
  onReturnHome: () => void;
}

const SuccessScreen: React.FC<SuccessScreenProps> = ({
  formData,
  referenceId,
  onReturnHome
}) => {
  const { theme } = useTheme();
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');

  useEffect(() => {
    generateQRCode();
  }, [referenceId]);

  const generateQRCode = async () => {
    try {
      // Create a URL that health officials can use to retrieve the submission
      const submissionUrl = `${window.location.origin}/submission/${referenceId}`;
      
      // Generate QR code
      const qrCodeUrl = await QRCode.toDataURL(submissionUrl, {
        width: 200,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });
      
      setQrCodeDataUrl(qrCodeUrl);
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  };

  const handleDownloadQRCode = () => {
    if (qrCodeDataUrl) {
      const link = document.createElement('a');
      link.download = `health-declaration-${referenceId}.png`;
      link.href = qrCodeDataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="success-screen">
      <div className="success-content">
        {/* Success Icon */}
        <div 
          className="success-icon"
          style={{ backgroundColor: theme.secondary.main }}
        >
          <CheckCircleOutlined />
        </div>

        {/* Success Message */}
        <h1 className="success-title">Declaration Submitted Successfully</h1>
        
        <p className="success-message">
          Thank you for completing your health declaration. Present the QR code below to border health officials.
        </p>

        {/* QR Code Card */}
        <Card className="qr-code-card">
          <div className="qr-code-container">
            {qrCodeDataUrl ? (
              <img 
                src={qrCodeDataUrl} 
                alt="Health Declaration QR Code"
                className="qr-code-image"
              />
            ) : (
              <div className="qr-code-placeholder">
                Generating QR Code...
              </div>
            )}
          </div>
          
          <div className="reference-info">
            <div className="reference-label">Reference ID</div>
            <div 
              className="reference-id"
              style={{ color: theme.primary.main }}
            >
              {referenceId}
            </div>
            <div className="reference-note">
              Officials can use QR code / ref to retrieve your submission
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="success-actions">
          <Button
            type="primary"
            size="large"
            icon={<DownloadOutlined />}
            onClick={handleDownloadQRCode}
            disabled={!qrCodeDataUrl}
            className="download-button"
            style={{
              backgroundColor: theme.secondary.main,
              borderColor: theme.secondary.main,
              color: theme.secondary.contrast,
            }}
          >
            Download QR Code
          </Button>
          
          <Button
            size="large"
            icon={<HomeOutlined />}
            onClick={onReturnHome}
            className="home-button"
            style={{
              backgroundColor: 'white',
              borderColor: theme.primary.main,
              color: theme.primary.main,
            }}
          >
            Return to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SuccessScreen;



