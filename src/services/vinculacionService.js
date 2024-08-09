import axios from 'axios';

const API_URL = '/api/vinculacion';
const API_INSTRUCTORES_URL = '/api/personas'; // Suponiendo que tienes una API para instructores
const API_AREAS_URL = '/api/areas'; // Suponiendo que tienes una API para áreas

export const getVinculaciones = async () => {
  return await axios.get(API_URL);
};

export const createVinculacion = async (vinculacion) => {
  return await axios.post(API_URL, vinculacion);
};

export const updateVinculacion = async (id, vinculacion) => {
  return await axios.put(`${API_URL}/${id}`, vinculacion);
};

export const deleteVinculacion = async (id) => {
  return await axios.delete(`${API_URL}/${id}`);
};

export const getInstructores = async () => {
  return await axios.get(API_INSTRUCTORES_URL);
};

export const getAreas = async () => {
  return await axios.get(API_AREAS_URL);
};
