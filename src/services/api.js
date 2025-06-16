import axios from 'axios';

const API = axios.create({
   baseURL:  'http://localhost:5000/api',
});

// process.env.REACT_APP_API_URL ||

API.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

export default API;
