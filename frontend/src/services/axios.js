import axios from 'axios';
import store from '@/store/store';

const axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL
});

// if token is available, set Authorization header for every request
axiosInstance.interceptors.request.use((request) => {
  const token = store.state.login.token;
  if (token) {
    request.headers.common.Authorization = token;
  }
  return request;
});

export default axiosInstance;
