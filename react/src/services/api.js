import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

// Helper to get auth headers
const getAuthHeaders = () => ({
  headers: { Authorization: `Bearer ${getToken()}` }
});

// Simple API functions
export const api = {
  // Auth
  login: async (email, password) => {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
  },

  register: async (name, email, password, password_confirmation) => {
    const response = await axios.post(`${API_URL}/register`, { 
      name, email, password, password_confirmation 
    });
    return response.data;
  },

  logout: async (token) => {
    const response = await axios.post(`${API_URL}/logout`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  // User CRUD
  getAllUsers: async () => {
    const response = await axios.get(`${API_URL}/users`, getAuthHeaders());
    return response.data;
  },

  getUser: async (id) => {
    const response = await axios.get(`${API_URL}/users/${id}`, getAuthHeaders());
    return response.data;
  },

  updateUser: async (id, userData) => {
    const response = await axios.put(`${API_URL}/users/${id}`, userData, getAuthHeaders());
    return response.data;
  },

  deleteUser: async (id) => {
    const response = await axios.delete(`${API_URL}/users/${id}`, getAuthHeaders());
    return response.data;
  },

  // Member CRUD
  getAllMembers: async () => {
    const response = await axios.get(`${API_URL}/members`, getAuthHeaders());
    return response.data;
  },

  createMember: async (memberData) => {
    const response = await axios.post(`${API_URL}/members`, memberData, getAuthHeaders());
    return response.data;
  },

  getMember: async (id) => {
    const response = await axios.get(`${API_URL}/members/${id}`, getAuthHeaders());
    return response.data;
  },

  updateMember: async (id, memberData) => {
    const response = await axios.put(`${API_URL}/members/${id}`, memberData, getAuthHeaders());
    return response.data;
  },

  deleteMember: async (id) => {
    const response = await axios.delete(`${API_URL}/members/${id}`, getAuthHeaders());
    return response.data;
  }
};

// Simple token helpers
export const saveUser = (user, token) => {
  localStorage.setItem('user', JSON.stringify(user));
  localStorage.setItem('token', token);
};

export const getUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const getToken = () => localStorage.getItem('token');

export const clearAuth = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
};