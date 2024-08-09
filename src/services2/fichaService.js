// services/fichaService.js
import axios from 'axios';

const API_URL = '/api/fichas';

export const getFichas = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.datos;
  } catch (error) {
    console.error('Error fetching fichas', error);
    throw error;
  }
};
