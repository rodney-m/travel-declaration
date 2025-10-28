import React, { useState, useEffect } from 'react';
import { Select, Input } from 'antd';

const { Option } = Select;

interface Country {
  name: string;
  flag: string;
  code: string;
  dial_code: string;
}

interface PhoneNumberInputProps {
  value?: string;
  countryCode?: string;
  onChange?: (phoneNumber: string, countryCode: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({
  value = '',
  countryCode = '+27',
  onChange,
  placeholder = 'Enter phone number',
  disabled = false
}) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [phoneNumber, setPhoneNumber] = useState(value);

  // Load countries data
  useEffect(() => {
    const loadCountries = async () => {
      try {
        const response = await fetch('/countries.json');
        const data = await response.json();
        setCountries(data);
        
        // Find initial country
        const initialCountry = data.find((country: Country) => country.dial_code === countryCode);
        if (initialCountry) {
          setSelectedCountry(initialCountry);
        }
      } catch (error) {
        console.error('Failed to load countries:', error);
        // Fallback data
        setCountries([
          { name: 'South Africa', flag: '🇿🇦', code: 'ZA', dial_code: '+27' },
          { name: 'United States', flag: '🇺🇸', code: 'US', dial_code: '+1' },
          { name: 'United Kingdom', flag: '🇬🇧', code: 'GB', dial_code: '+44' }
        ]);
      }
    };

    loadCountries();
  }, [countryCode]);

  // Update phone number when value prop changes
  useEffect(() => {
    setPhoneNumber(value);
  }, [value]);

  const handleCountryChange = (countryCode: string) => {
    const country = countries.find(c => c.dial_code === countryCode);
    if (country) {
      setSelectedCountry(country);
      onChange?.(phoneNumber, countryCode);
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPhoneNumber = e.target.value;
    setPhoneNumber(newPhoneNumber);
    onChange?.(newPhoneNumber, selectedCountry?.dial_code || countryCode);
  };

  const getFlagSVG = (countryCode: string) => {
    // This would typically fetch from a flags API or local SVG files
    // For now, we'll use a placeholder that can be replaced with actual SVG
    return `https://flagcdn.com/24x18/${countryCode.toLowerCase()}.png`;
  };

  const countryOptions = countries.map(country => (
    <Option 
      key={country.dial_code} 
      value={country.dial_code}
      label={`${country.flag} ${country.dial_code}`}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontSize: '16px' }}>{country.flag}</span>
        <span style={{ fontWeight: '500' }}>{country.dial_code}</span>
        <span>{country.name}</span>
      </div>
    </Option>
  ));

  return (
    <div style={{ display: 'flex', gap: '8px' }}>
      <Select
        value={selectedCountry?.dial_code || countryCode}
        onChange={handleCountryChange}
        disabled={disabled}
        showSearch
        filterOption={(input, option) => {
          const country = countries.find(c => c.dial_code === option?.value);
          return country ? 
            country.name.toLowerCase().includes(input.toLowerCase()) ||
            country.dial_code.includes(input) : false;
        }}
        style={{ width: 120 }}
        optionLabelProp="label"
      >
        {countryOptions}
      </Select>
      
      <Input
        value={phoneNumber}
        onChange={handlePhoneChange}
        placeholder={placeholder}
        disabled={disabled}
        style={{ flex: 1 }}
      />
    </div>
  );
};

export default PhoneNumberInput;
