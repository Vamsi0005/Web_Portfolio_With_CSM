import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

// Response interceptor for streamlined error extraction
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      'An unexpected error occurred while connecting to the server.';
    return Promise.reject(new Error(message));
  }
);

// 1. About API
export const getAbout = async () => {
  return await api.get('/about');
};

// 2. Skills API
export const getSkills = async (category) => {
  const params = category && category !== 'All' ? { category } : {};
  return await api.get('/skills', { params });
};

// 3. Projects API
export const getProjects = async (params = {}) => {
  return await api.get('/projects', { params });
};

export const getProjectById = async (idOrSlug) => {
  return await api.get(`/projects/${idOrSlug}`);
};

// 4. Blogs API
export const getBlogs = async (params = {}) => {
  return await api.get('/blogs', { params });
};

export const getBlogById = async (idOrSlug) => {
  return await api.get(`/blogs/${idOrSlug}`);
};

// 5. Experience API
export const getExperience = async () => {
  return await api.get('/experience');
};

// 6. Testimonials API
export const getTestimonials = async () => {
  return await api.get('/testimonials');
};

// 7. Services API
export const getServices = async () => {
  return await api.get('/services');
};

// 8. Contact API
export const submitContact = async (data) => {
  return await api.post('/contact', data);
};

export default api;
