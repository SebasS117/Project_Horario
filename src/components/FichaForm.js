import React, { useState, useEffect } from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { createFicha, updateFicha, getProgramas } from '../services/fichaService';

const FichaForm = ({ ficha, setFicha, onSubmit }) => {
  const [formData, setFormData] = useState({
    codigo: '',
    inicio_fecha: '',
    fin_lectiva: '',
    fin_ficha: '',
    programa: '',
    sede: 'centro',
    estado: 'lectiva'
  });
  const [programas, setProgramas] = useState([]);

  useEffect(() => {
    if (ficha) {
      setFormData({
        ...ficha,
        inicio_fecha: ficha.inicio_fecha ? ficha.inicio_fecha.slice(0, 16) : '',
        fin_lectiva: ficha.fin_lectiva ? ficha.fin_lectiva.slice(0, 16) : '',
        fin_ficha: ficha.fin_ficha ? ficha.fin_ficha.slice(0, 16) : ''
      });
    }
  }, [ficha]);

  useEffect(() => {
    const fetchProgramas = async () => {
      try {
        const response = await getProgramas();
        setProgramas(response.data.datos);
      } catch (error) {
        console.error('Error fetching programas:', error);
      }
    };
    fetchProgramas();
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
      if (ficha) {
        await updateFicha(ficha.codigo, formData);
      } else {
        await createFicha(formData);
      }
      onSubmit();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Código"
        name="codigo"
        value={formData.codigo}
        onChange={handleChange}
        fullWidth
        required
      />
      <TextField
        label="Inicio Fecha"
        name="inicio_fecha"
        type="datetime-local"
        value={formData.inicio_fecha}
        onChange={handleChange}
        fullWidth
        required
      />
      <TextField
        label="Fin Lectiva"
        name="fin_lectiva"
        type="datetime-local"
        value={formData.fin_lectiva}
        onChange={handleChange}
        fullWidth
        required
      />
      <TextField
        label="Fin Ficha"
        name="fin_ficha"
        type="datetime-local"
        value={formData.fin_ficha}
        onChange={handleChange}
        fullWidth
        required
      />
      <FormControl fullWidth>
        <InputLabel>Programa</InputLabel>
        <Select
          name="programa"
          value={formData.programa}
          onChange={handleChange}
        >
          {programas.map((programa) => (
            <MenuItem key={programa.id_programa} value={programa.id_programa}>
              {programa.nombre_programa}
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
          <MenuItem value="lectiva">Lectiva</MenuItem>
          <MenuItem value="electiva">Electiva</MenuItem>
          <MenuItem value="finalizada">Finalizada</MenuItem>
        </Select>
      </FormControl>
      <Button type="submit" variant="contained" color="primary">
        {ficha ? 'Actualizar' : 'Crear'}
      </Button>
    </form>
  );
};

export default FichaForm;


