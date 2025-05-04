import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const encodeUrl = async (originalUrl) => {
  try {
    const response = await api.post('/encode', { originalUrl });
    return response.data;
  } catch (error) {
    console.error('Error encoding URL:', error);
    throw error;
  }
};

export const decodeUrl = async (shortUrl) => {
  try {
    const response = await api.post('/decode', { shortUrl });
    return response.data;
  } catch (error) {
    console.error('Error decoding URL:', error);
    throw error;
  }
};

export const getUrlStats = async (urlPath) => {
  try {
    const response = await api.get(`/statistic/${urlPath}`);
    return response.data;
  } catch (error) {
    console.error('Error getting URL stats:', error);
    throw error;
  }
};

export const getAllUrls = async () => {
  try {
    const response = await api.get('/list');
    return response.data;
  } catch (error) {
    console.error('Error getting all URLs:', error);
    throw error;
  }
};

export const searchUrls = async (query) => {
  try {
    const response = await api.get('/search', { params: { query } });
    return response.data;
  } catch (error) {
    console.error('Error searching URLs:', error);
    throw error;
  }
};