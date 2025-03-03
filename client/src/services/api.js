import axios from 'axios';
import { API_BASE_URL, API_ENDPOINTS, REQUEST_TIMEOUT, STORAGE_KEYS } from '../config';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: REQUEST_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.USER_DATA);
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (credentials) => api.post(API_ENDPOINTS.LOGIN, credentials),
  register: (userData) => api.post(API_ENDPOINTS.REGISTER, userData),
  logout: () => api.post(API_ENDPOINTS.LOGOUT),
};

// Hospitals API
export const hospitalsAPI = {
  getAll: (params) => api.get(API_ENDPOINTS.HOSPITALS, { params }),
  getById: (id) => api.get(API_ENDPOINTS.HOSPITAL_BY_ID(id)),
  create: (data) => api.post(API_ENDPOINTS.HOSPITAL_CREATE, data),
  update: (id, data) => api.put(API_ENDPOINTS.HOSPITAL_UPDATE(id), data),
  delete: (id) => api.delete(API_ENDPOINTS.HOSPITAL_DELETE(id)),
  search: (query) => api.get(API_ENDPOINTS.SEARCH, { params: { query } }),
};

// User API
export const userAPI = {
  getProfile: () => api.get(API_ENDPOINTS.USER_PROFILE),
  updateProfile: (data) => api.put(API_ENDPOINTS.USER_UPDATE, data),
};

// Specialties API
export const specialtiesAPI = {
  getAll: () => api.get(API_ENDPOINTS.SPECIALTIES),
};

export default api; 