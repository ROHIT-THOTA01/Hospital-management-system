// API configuration
export const API_BASE_URL = 'https://hospital-management-system-2-pi5t.onrender.com';

// API endpoints
export const API_ENDPOINTS = {
  // Auth endpoints
  LOGIN: '/api/auth/login',
  REGISTER: '/api/auth/register',
  LOGOUT: '/api/auth/logout',
  
  // Hospital endpoints
  HOSPITALS: '/api/hospitals',
  HOSPITAL_BY_ID: (id) => `/api/hospitals/${id}`,
  HOSPITAL_CREATE: '/api/hospitals',
  HOSPITAL_UPDATE: (id) => `/api/hospitals/${id}`,
  HOSPITAL_DELETE: (id) => `/api/hospitals/${id}`,
  
  // User endpoints
  USER_PROFILE: '/api/users/profile',
  USER_UPDATE: '/api/users/profile',
  
  // Other endpoints
  SEARCH: '/api/search',
  SPECIALTIES: '/api/specialties',
};

// Request timeout
export const REQUEST_TIMEOUT = 15000; // 15 seconds

// Local storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_DATA: 'user_data',
  THEME_MODE: 'theme_mode',
}; 