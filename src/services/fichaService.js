import axios from 'axios';

const API_URL = '/api/fichas';
const API_PROGRAMAS_URL = '/api/programas';

export const getFichas = async () => {
  return await axios.get(API_URL);
};

export const createFicha = async (ficha) => {
  return await axios.post(API_URL, ficha);
};

export const updateFicha = async (id, ficha) => {
  return await axios.put(`${API_URL}/${id}`, ficha);
};

export const deleteFicha = async (id) => {
  return await axios.delete(`${API_URL}/${id}`);
};

export const getProgramas = async () => {
    return await axios.get(API_PROGRAMAS_URL);
  };