import axios from 'axios';

const API = axios.create({
    baseURL: 'https://warranti-backend.onrender.com', // Backend server
    withCredentials: true,           // Include cookies
});

export const login = (credentials) => API.post('/auth/login', credentials);
export const signup = (data) => API.post('/auth/signup', data);
export const logout = () => API.get('/auth/logout');
export const checkLogin = () => API.get('/auth/checkLogin');