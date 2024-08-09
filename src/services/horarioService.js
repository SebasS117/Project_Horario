import axios from 'axios';

const API_URL = '/api/horarios';
const API_PERSONAS_URL = '/api/personas'; 
const API_FICHAS_URL = '/api/fichas'; 
const API_AMBIENTES_URL = '/api/ambientes';

export const getHorarios = async () => {
  return await axios.get(API_URL);
};

export const createHorario = async (horario) => {
  return await axios.post(API_URL, horario);
};

export const updateHorario = async (id, horario) => {
  return await axios.put(`${API_URL}/${id}`, horario);
};

export const deleteHorario = async (id) => {
  return await axios.delete(`${API_URL}/${id}`);
};

export const getInstructores = async () => {
  return await axios.get(API_PERSONAS_URL);
};

export const getFichas = async () => {
  return await axios.get(API_FICHAS_URL);
};

export const getAmbientes = async () => {
  return await axios.get(API_AMBIENTES_URL);
};
