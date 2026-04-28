import axios from 'axios';

// Create axios instance with default config
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
  timeout: parseInt(import.meta.env.VITE_API_TIMEOUT) || 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common errors
    if (error.response) {
      // Server responded with error status
      const { status } = error.response;
      
      if (status === 401) {
        // Unauthorized - clear token and redirect to login
        localStorage.removeItem('token');
        // Add your login redirect logic here
      } else if (status === 403) {
        // Forbidden
        console.error('Access denied');
      } else if (status === 500) {
        // Server error
        console.error('Server error occurred');
      }
    } else if (error.request) {
      // Request made but no response
      console.error('No response from server');
    } else {
      // Request setup error
      console.error('Request error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

// API methods
export const documentAPI = {
  // Upload document
  upload: (formData, onProgress) => {
    return api.post('/api/v1/documents/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: onProgress,
    });
  },

  // Get all documents
  getAll: () => {
    return api.get('/api/v1/documents');
  },

  // Get document by ID
  getById: (id) => {
    return api.get(`/api/v1/documents/${id}`);
  },

  // Delete document
  delete: (id) => {
    return api.delete(`/api/v1/documents/${id}`);
  },

  // Update document
  update: (id, data) => {
    return api.patch(`/api/v1/documents/${id}`, data);
  },
};

export const queryAPI = {
  // Ask question
  ask: (question, documentIds = []) => {
    return api.post('/api/v1/query/ask', {
      question,
      document_ids: documentIds,
    });
  },

  // Get query history
  getHistory: (limit = 10) => {
    return api.get('/api/v1/query/history', {
      params: { limit },
    });
  },

  // Get query by ID
  getById: (id) => {
    return api.get(`/api/v1/query/${id}`);
  },
};

export const authAPI = {
  // Register user
  register: (userData) => {
    return api.post('/api/v1/auth/register', userData);
  },

  // Login user
  login: (credentials) => {
    return api.post('/api/v1/auth/login', credentials);
  },

  // Logout user
  logout: () => {
    return api.post('/api/v1/auth/logout');
  },

  // Get current user
  getCurrentUser: () => {
    return api.get('/api/v1/auth/me');
  },
};

// Upload file using native fetch API with FormData
export const uploadFile = async (file, onProgress) => {
  const formData = new FormData();
  formData.append('file', file);

  const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
  const token = localStorage.getItem('token');

  try {
    const response = await fetch(`${baseURL}/api/v1/documents/upload`, {
      method: 'POST',
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Upload failed with status ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Upload error:', error);
    throw error;
  }
};

// Upload multiple files
export const uploadFiles = async (files, onProgress) => {
  const uploadPromises = files.map((file) => uploadFile(file, onProgress));
  return Promise.all(uploadPromises);
};

// Simplified query function
export const askQuery = async (question, documentIds = []) => {
  try {
    const response = await queryAPI.ask(question, documentIds);
    return response.data;
  } catch (error) {
    console.error('Query error:', error);
    throw error;
  }
};

export default api;
