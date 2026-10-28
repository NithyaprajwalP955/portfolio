import axios from 'axios';

const getBaseURL = () => {
  const envUrl = import.meta.env.VITE_API_URL;
  if (envUrl) {
    const clean = envUrl.replace(/\/$/, '');
    return clean.endsWith('/api') ? clean : `${clean}/api`;
  }
  if (import.meta.env.PROD) {
    return 'https://nithyaprajwalp-backend.vercel.app/api';
  }
  return '/api';
};

const API = axios.create({
  baseURL: getBaseURL(),
  // Do NOT set a default Content-Type — let axios set it automatically per request
  // (FormData needs multipart/form-data with boundary; JSON needs application/json)
});

// Only attach JWT token for admin routes
API.interceptors.request.use((config) => {
  const isAdminRoute = config.url && config.url.startsWith('/admin/');
  if (isAdminRoute) {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  // If data is FormData, remove Content-Type so axios sets it with the correct boundary
  if (config.data instanceof FormData) {
    delete config.headers['Content-Type'];
  } else if (!config.headers['Content-Type']) {
    config.headers['Content-Type'] = 'application/json';
  }
  return config;
});

// Auto-clear stale tokens on 401
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const isAdminRoute = error.config?.url?.startsWith('/admin/');
      if (isAdminRoute) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
      }
    }
    return Promise.reject(error);
  }
);

// Public endpoints
export const fetchProfile = () => API.get('/profile/');
export const fetchExperience = () => API.get('/experience/');
export const fetchProjects = () => API.get('/projects/');
export const fetchSkills = () => API.get('/skills/');
export const fetchEducation = () => API.get('/education/');
export const fetchCertifications = () => API.get('/certifications/');
export const fetchAchievements = () => API.get('/achievements/');
export const submitContact = (data) => API.post('/contact/', data);

// Auth
export const adminLogin = (credentials) => API.post('/admin/login/', credentials);

// Admin CRUD endpoints
export const adminFetchProfile = () => API.get('/admin/profile/');
// Supports both JSON (text fields only) and FormData (with photo file)
export const adminUpdateProfile = (data) => API.put('/admin/profile/', data);

const makeCRUD = (resource) => ({
  list: () => API.get(`/admin/${resource}/`),
  create: (data) => API.post(`/admin/${resource}/`, data),
  update: (id, data) => API.put(`/admin/${resource}/${id}/`, data),
  remove: (id) => API.delete(`/admin/${resource}/${id}/`),
});

export const adminExperience = makeCRUD('experience');
export const adminProjects = makeCRUD('projects');
export const adminSkillCategories = makeCRUD('skill-categories');
export const adminSkills = makeCRUD('skills');
export const adminEducation = makeCRUD('education');
export const adminCertifications = makeCRUD('certifications');
export const adminAchievements = makeCRUD('achievements');
export const adminMessages = makeCRUD('messages');

export default API;
