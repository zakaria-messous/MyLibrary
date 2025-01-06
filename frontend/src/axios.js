import axios from 'axios';

// Create an Axios instance with default settings
const instance = axios.create({
  baseURL: 'http://localhost:8080', // Backend base URL (change to match your backend)
  headers: {
    'Content-Type': 'application/json', // Set content type to JSON
  },
});

// Add a request interceptor to include the JWT token in headers (if needed)
instance.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
