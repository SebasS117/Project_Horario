// services/ambienteService.js
import axios from 'axios';

const API_URL = '/api/ambientes';

export const getAmbientes = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.datos;
  } catch (error) {
    console.error('Error fetching ambientes', error);
    throw error;
  }
};
