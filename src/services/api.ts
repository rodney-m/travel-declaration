import axios from 'axios';

// API base URL - update this when you have your actual API endpoint
const API_BASE_URL = 'http://10.6.54.213:8000';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Travel declaration API service
export const travelDeclarationAPI = {
  submitDeclaration: async (data: any) => {
    try {
      const response = await api.post('/declaration', data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

// For development/testing - you can use this mock function
export const mockSubmitDeclaration = async (data: any) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Simulate success response
  return {
    success: true,
    message: 'Travel declaration submitted successfully',
    data: {
      id: Math.random().toString(36).substr(2, 9),
      ...data,
      submitted_at: new Date().toISOString(),
    }
  };
};

export default api;

