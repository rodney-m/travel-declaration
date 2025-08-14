import React from 'react';
import { Form, Input, Select } from 'antd';

const { Option } = Select;

interface TravelerIdentificationProps {
  formData: any;
  setFormData: (data: any) => void;
}

const TravelerIdentification: React.FC<TravelerIdentificationProps> = ({
  formData,
  setFormData
}) => {
  const handleInputChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const countries = [
    { code: 'ZA', name: 'South Africa' },
    { code: 'BW', name: 'Botswana' },
    { code: 'ZW', name: 'Zimbabwe' },
    { code: 'MZ', name: 'Mozambique' },
    { code: 'NA', name: 'Namibia' },
    { code: 'LS', name: 'Lesotho' },
    { code: 'SZ', name: 'Eswatini' },
    { code: 'US', name: 'United States' },
    { code: 'GB', name: 'United Kingdom' },
    { code: 'CA', name: 'Canada' },
    { code: 'AU', name: 'Australia' },
    { code: 'DE', name: 'Germany' },
    { code: 'FR', name: 'France' },
    { code: 'IT', name: 'Italy' },
    { code: 'ES', name: 'Spain' },
    { code: 'NL', name: 'Netherlands' },
    { code: 'BE', name: 'Belgium' },
    { code: 'CH', name: 'Switzerland' },
    { code: 'AT', name: 'Austria' },
    { code: 'SE', name: 'Sweden' },
    { code: 'NO', name: 'Norway' },
    { code: 'DK', name: 'Denmark' },
    { code: 'FI', name: 'Finland' },
    { code: 'PL', name: 'Poland' },
    { code: 'CZ', name: 'Czech Republic' },
    { code: 'HU', name: 'Hungary' },
    { code: 'RO', name: 'Romania' },
    { code: 'BG', name: 'Bulgaria' },
    { code: 'HR', name: 'Croatia' },
    { code: 'SI', name: 'Slovenia' },
    { code: 'SK', name: 'Slovakia' },
    { code: 'LT', name: 'Lithuania' },
    { code: 'LV', name: 'Latvia' },
    { code: 'EE', name: 'Estonia' },
    { code: 'IE', name: 'Ireland' },
    { code: 'PT', name: 'Portugal' },
    { code: 'GR', name: 'Greece' },
    { code: 'CY', name: 'Cyprus' },
    { code: 'MT', name: 'Malta' },
    { code: 'LU', name: 'Luxembourg' },
    { code: 'IS', name: 'Iceland' },
    { code: 'LI', name: 'Liechtenstein' },
    { code: 'MC', name: 'Monaco' },
    { code: 'SM', name: 'San Marino' },
    { code: 'VA', name: 'Vatican City' },
    { code: 'AD', name: 'Andorra' },
    { code: 'CN', name: 'China' },
    { code: 'JP', name: 'Japan' },
    { code: 'KR', name: 'South Korea' },
    { code: 'IN', name: 'India' },
    { code: 'BR', name: 'Brazil' },
    { code: 'AR', name: 'Argentina' },
    { code: 'CL', name: 'Chile' },
    { code: 'PE', name: 'Peru' },
    { code: 'CO', name: 'Colombia' },
    { code: 'VE', name: 'Venezuela' },
    { code: 'MX', name: 'Mexico' },
    { code: 'NZ', name: 'New Zealand' },
    { code: 'SG', name: 'Singapore' },
    { code: 'MY', name: 'Malaysia' },
    { code: 'TH', name: 'Thailand' },
    { code: 'VN', name: 'Vietnam' },
    { code: 'PH', name: 'Philippines' },
    { code: 'ID', name: 'Indonesia' },
    { code: 'TR', name: 'Turkey' },
    { code: 'IL', name: 'Israel' },
    { code: 'AE', name: 'United Arab Emirates' },
    { code: 'SA', name: 'Saudi Arabia' },
    { code: 'QA', name: 'Qatar' },
    { code: 'KW', name: 'Kuwait' },
    { code: 'BH', name: 'Bahrain' },
    { code: 'OM', name: 'Oman' },
    { code: 'JO', name: 'Jordan' },
    { code: 'LB', name: 'Lebanon' },
    { code: 'SY', name: 'Syria' },
    { code: 'IQ', name: 'Iraq' },
    { code: 'IR', name: 'Iran' },
    { code: 'AF', name: 'Afghanistan' },
    { code: 'PK', name: 'Pakistan' },
    { code: 'BD', name: 'Bangladesh' },
    { code: 'LK', name: 'Sri Lanka' },
    { code: 'NP', name: 'Nepal' },
    { code: 'BT', name: 'Bhutan' },
    { code: 'MM', name: 'Myanmar' },
    { code: 'LA', name: 'Laos' },
    { code: 'KH', name: 'Cambodia' },
    { code: 'MN', name: 'Mongolia' },
    { code: 'KZ', name: 'Kazakhstan' },
    { code: 'UZ', name: 'Uzbekistan' },
    { code: 'KG', name: 'Kyrgyzstan' },
    { code: 'TJ', name: 'Tajikistan' },
    { code: 'TM', name: 'Turkmenistan' },
    { code: 'AZ', name: 'Azerbaijan' },
    { code: 'GE', name: 'Georgia' },
    { code: 'AM', name: 'Armenia' },
    { code: 'BY', name: 'Belarus' },
    { code: 'MD', name: 'Moldova' },
    { code: 'UA', name: 'Ukraine' },
    { code: 'RU', name: 'Russia' },
    { code: 'RS', name: 'Serbia' },
    { code: 'ME', name: 'Montenegro' },
    { code: 'BA', name: 'Bosnia and Herzegovina' },
    { code: 'MK', name: 'North Macedonia' },
    { code: 'AL', name: 'Albania' },
    { code: 'XK', name: 'Kosovo' },
    { code: 'MA', name: 'Morocco' },
    { code: 'DZ', name: 'Algeria' },
    { code: 'TN', name: 'Tunisia' },
    { code: 'LY', name: 'Libya' },
    { code: 'EG', name: 'Egypt' },
    { code: 'SD', name: 'Sudan' },
    { code: 'SS', name: 'South Sudan' },
    { code: 'ET', name: 'Ethiopia' },
    { code: 'ER', name: 'Eritrea' },
    { code: 'DJ', name: 'Djibouti' },
    { code: 'SO', name: 'Somalia' },
    { code: 'KE', name: 'Kenya' },
    { code: 'UG', name: 'Uganda' },
    { code: 'TZ', name: 'Tanzania' },
    { code: 'RW', name: 'Rwanda' },
    { code: 'BI', name: 'Burundi' },
    { code: 'CD', name: 'Democratic Republic of the Congo' },
    { code: 'CG', name: 'Republic of the Congo' },
    { code: 'GA', name: 'Gabon' },
    { code: 'GQ', name: 'Equatorial Guinea' },
    { code: 'CM', name: 'Cameroon' },
    { code: 'CF', name: 'Central African Republic' },
    { code: 'TD', name: 'Chad' },
    { code: 'NE', name: 'Niger' },
    { code: 'NG', name: 'Nigeria' },
    { code: 'BF', name: 'Burkina Faso' },
    { code: 'ML', name: 'Mali' },
    { code: 'SN', name: 'Senegal' },
    { code: 'GM', name: 'Gambia' },
    { code: 'GN', name: 'Guinea' },
    { code: 'GW', name: 'Guinea-Bissau' },
    { code: 'SL', name: 'Sierra Leone' },
    { code: 'LR', name: 'Liberia' },
    { code: 'CI', name: 'Ivory Coast' },
    { code: 'GH', name: 'Ghana' },
    { code: 'TG', name: 'Togo' },
    { code: 'BJ', name: 'Benin' },
    { code: 'ST', name: 'Sao Tome and Principe' },
    { code: 'CV', name: 'Cape Verde' },
    { code: 'MR', name: 'Mauritania' },
    { code: 'EH', name: 'Western Sahara' },
    { code: 'AO', name: 'Angola' },
    { code: 'ZM', name: 'Zambia' },
    { code: 'MW', name: 'Malawi' },
    { code: 'MG', name: 'Madagascar' },
    { code: 'MU', name: 'Mauritius' },
    { code: 'SC', name: 'Seychelles' },
    { code: 'KM', name: 'Comoros' },
    { code: 'YT', name: 'Mayotte' },
    { code: 'RE', name: 'Reunion' },
    { code: 'ZW', name: 'Zimbabwe' },
    { code: 'BW', name: 'Botswana' },
    { code: 'NA', name: 'Namibia' },
    { code: 'LS', name: 'Lesotho' },
    { code: 'SZ', name: 'Eswatini' },
    { code: 'MZ', name: 'Mozambique' },
    { code: 'ZW', name: 'Zimbabwe' },
    { code: 'BW', name: 'Botswana' },
    { code: 'NA', name: 'Namibia' },
    { code: 'LS', name: 'Lesotho' },
    { code: 'SZ', name: 'Eswatini' },
    { code: 'MZ', name: 'Mozambique' }
  ];

  return (
    <Form layout="vertical">
      <Form.Item label="First Name" required>
        <Input
          placeholder="Enter your first name"
          value={formData.first_name}
          onChange={(e) => handleInputChange('first_name', e.target.value)}
        />
      </Form.Item>

      <Form.Item label="Last Name" required>
        <Input
          placeholder="Enter your last name"
          value={formData.last_name}
          onChange={(e) => handleInputChange('last_name', e.target.value)}
        />
      </Form.Item>

      <Form.Item label="Email Address" required>
        <Input
          type="email"
          placeholder="example@email.com"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
        />
      </Form.Item>

      <Form.Item label="Phone Number" required>
        <Input
          placeholder="+XX-XXXX-XXXX"
          value={formData.phone_number}
          onChange={(e) => handleInputChange('phone_number', e.target.value)}
        />
      </Form.Item>

      <Form.Item label="Passport Number" required>
        <Input
          placeholder="Enter passport number"
          value={formData.passport_number}
          onChange={(e) => handleInputChange('passport_number', e.target.value)}
        />
      </Form.Item>

      <Form.Item label="Nationality" required>
        <Select
          placeholder="Select your nationality"
          value={formData.nationality}
          onChange={(value) => handleInputChange('nationality', value)}
          showSearch
          filterOption={(input, option) =>
            option?.children?.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {countries.map(country => (
            <Option key={country.code} value={country.code}>
              {country.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  );
};

export default TravelerIdentification;
