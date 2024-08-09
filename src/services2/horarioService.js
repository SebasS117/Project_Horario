// services/horarioService.js
import axios from 'axios';

const API_URL = '/api/horarios';

export const getHorarios = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.datos;
  } catch (error) {
    console.error('Error fetching horarios', error);
    throw error;
  }
};

export const createHorario = async (horario) => {
  try {
    const response = await axios.post(API_URL, horario);
    return response.data;
  } catch (error) {
    console.error('Error creating horario', error);
    throw error;
  }
};

export const updateHorario = async (id, horario) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, horario);
    return response.data;
  } catch (error) {
    console.error('Error updating horario', error);
    throw error;
  }
};

export const deleteHorario = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting horario', error);
    throw error;
  }
};
