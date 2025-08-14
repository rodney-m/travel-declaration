import React from 'react';
import { Form, Checkbox, Input, Typography, Space } from 'antd';

const { TextArea } = Input;
const { Title, Paragraph } = Typography;

interface HealthDeclarationProps {
  formData: any;
  setFormData: (data: any) => void;
}

const HealthDeclaration: React.FC<HealthDeclarationProps> = ({
  formData,
  setFormData
}) => {
  const handleHealthChange = (field: string, value: boolean | string) => {
    setFormData({
      ...formData,
      health: {
        ...formData.health,
        [field]: value
      }
    });
  };

  const symptoms = [
    { key: 'fever', label: 'Fever (38°C+)' },
    { key: 'cough', label: 'Cough' },
    { key: 'difficulty_breathing', label: 'Difficulty breathing' },
    { key: 'runny_nose', label: 'Runny nose' },
    { key: 'diarrhea', label: 'Diarrhea' },
    { key: 'sore_throat', label: 'Sore throat' }
  ];

  return (
    <div>
      <Title level={4}>Health Declaration</Title>
      <Paragraph>
        Are you feeling any of the following? Select all that apply.
      </Paragraph>

      <Form layout="vertical">
        <Form.Item>
          <Space direction="vertical" style={{ width: '100%' }}>
            {symptoms.map(symptom => (
              <Checkbox
                key={symptom.key}
                checked={formData.health[symptom.key]}
                onChange={(e) => handleHealthChange(symptom.key, e.target.checked)}
              >
                {symptom.label}
              </Checkbox>
            ))}
          </Space>
        </Form.Item>

        <Form.Item label="Other symptoms (if any):">
          <TextArea
            rows={4}
            placeholder="Please describe any other symptoms..."
            value={formData.health.other_symptoms}
            onChange={(e) => handleHealthChange('other_symptoms', e.target.value)}
          />
        </Form.Item>
      </Form>
    </div>
  );
};

export default HealthDeclaration;

