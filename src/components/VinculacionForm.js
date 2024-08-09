import React, { useState, useEffect } from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { createVinculacion, updateVinculacion, getInstructores, getAreas } from '../services/vinculacionService';

const VinculacionForm = ({ vinculacion, setVinculacion, onSubmit }) => {
  const [formData, setFormData] = useState({
    instructor: '',
    tipo: 'contratista',
    sede: 'centro',
    area: ''
  });

  const [instructores, setInstructores] = useState([]);
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    if (vinculacion) {
      setFormData(vinculacion);
    }
  }, [vinculacion]);

  useEffect(() => {
    const fetchInstructores = async () => {
      try {
        const response = await getInstructores();
        setInstructores(response.data.datos);
      } catch (error) {
        console.error('Error fetching instructores:', error);
      }
    };

    const fetchAreas = async () => {
      try {
        const response = await getAreas();
        setAreas(response.data.datos);
      } catch (error) {
        console.error('Error fetching areas:', error);
      }
    };

    fetchInstructores();
    fetchAreas();
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
      if (vinculacion) {
        await updateVinculacion(vinculacion.id_vinculacion, formData);
      } else {
        await createVinculacion(formData);
      }
      onSubmit();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl fullWidth>
        <InputLabel>Instructor</InputLabel>
        <Select
          name="instructor"
          value={formData.instructor}
          onChange={handleChange}
        >
          {instructores.map((instructor) => (
            <MenuItem key={instructor.id_persona} value={instructor.id_persona}>
              {instructor.nombres}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel>Tipo</InputLabel>
        <Select
          name="tipo"
          value={formData.tipo}
          onChange={handleChange}
        >
          <MenuItem value="contratista">Contratista</MenuItem>
          <MenuItem value="planta">Planta</MenuItem>
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
        <InputLabel>Área</InputLabel>
        <Select
          name="area"
          value={formData.area}
          onChange={handleChange}
        >
          {areas.map((area) => (
            <MenuItem key={area.id_area} value={area.id_area}>
              {area.nombre_area}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button type="submit" variant="contained" color="primary">
        {vinculacion ? 'Actualizar' : 'Crear'}
      </Button>
    </form>
  );
};

export default VinculacionForm;
