import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Your Node.js Backend URL
});

// Automatically add the token to every request if it exists
api.interceptors.request.use((config) => {
  const token = Cookies.get('token');
  if (token) {
    config.headers['x-auth-token'] = token;
  }
  return config;
});

export default api;