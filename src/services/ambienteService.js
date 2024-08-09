import axios from 'axios';

const API_URL = '/api/ambientes';
const API_MUNICIPIOS_URL = '/api/municipios';

export const getAmbientes = async () => {
  return await axios.get(API_URL);
};

export const createAmbiente = async (ambiente) => {
  return await axios.post(API_URL, ambiente);
};

export const updateAmbiente = async (id, ambiente) => {
  return await axios.put(`${API_URL}/${id}`, ambiente);
};

export const deleteAmbiente = async (id) => {
  return await axios.delete(`${API_URL}/${id}`);
};

export const getMunicipios = async () => {
  return await axios.get(API_MUNICIPIOS_URL);
};

