import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.fooddelivery.com/v1', // Placeholder base URL
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor (e.g. for attaching JWT token in future)
api.interceptors.request.use(
  async (config) => {
    // Add auth token if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
