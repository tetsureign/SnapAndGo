import {AxiosInstance} from 'axios';

export const setupInterceptors = (axiosInstance: AxiosInstance) => {
  // For bearer token auth. Unused for now.
  //
  // axiosInstance.interceptors.request.use(
  //   async config => {
  //     const token = localStorage.getItem('token'); // Replace with SecureStore in React Native
  //     if (token) {
  //       config.headers.Authorization = `Bearer ${token}`;
  //     }
  //     return config;
  //   },
  //   error => Promise.reject(error),
  // );

  axiosInstance.interceptors.response.use(
    response => response,
    error => {
      console.error('API Error:', error.response);
      return Promise.reject(error);
    },
  );
};
