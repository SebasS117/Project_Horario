import React, { useState, useEffect } from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { createAmbiente, updateAmbiente, getMunicipios } from '../services/ambienteService';

const AmbienteForm = ({ ambiente, setAmbiente, onSubmit }) => {
  const [formData, setFormData] = useState({
    nombre_amb: '',
    municipio: '',
    sede: 'centro',
    estado: 'activo'
  });
  const [municipios, setMunicipios] = useState([]);

  useEffect(() => {
    if (ambiente) {
      setFormData(ambiente);
    }
  }, [ambiente]);

  useEffect(() => {
    const fetchMunicipios = async () => {
      try {
        const response = await getMunicipios();
        setMunicipios(response.data.datos);
      } catch (error) {
        console.error('Error fetching municipios:', error);
      }
    };
    fetchMunicipios();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (ambiente) {
        await updateAmbiente(ambiente.id_ambiente, formData);
      } else {
        await createAmbiente(formData);
      }
      onSubmit();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Nombre"
        name="nombre_amb"
        value={formData.nombre_amb}
        onChange={handleChange}
        fullWidth
        required
      />
      <FormControl fullWidth>
        <InputLabel>Municipio</InputLabel>
        <Select
          name="municipio"
          value={formData.municipio}
          onChange={handleChange}
        >
          {municipios.map((municipio) => (
            <MenuItem key={municipio.id_municipio} value={municipio.id_municipio}>
              {municipio.nombre_mpio}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel>Sede</InputLabel>
        <Select
          name="sede"
          value={formData.sede}
          onChange={handleChange}
        >
          <MenuItem value="centro">Centro</MenuItem>
          <MenuItem value="Yamboro">Yamboro</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel>Estado</InputLabel>
        <Select
          name="estado"
          value={formData.estado}
          onChange={handleChange}
        >
          <MenuItem value="activo">Activo</MenuItem>
          <MenuItem value="inactivo">Inactivo</MenuItem>
        </Select>
      </FormControl>
      <Button type="submit" variant="contained" color="primary">
        {ambiente ? 'Actualizar' : 'Crear'}
      </Button>
    </form>
  );
};

export default AmbienteForm;


