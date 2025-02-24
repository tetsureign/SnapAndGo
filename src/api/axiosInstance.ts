import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

import {setupInterceptors} from './interceptors';
setupInterceptors(axiosInstance);

export default axiosInstance;
