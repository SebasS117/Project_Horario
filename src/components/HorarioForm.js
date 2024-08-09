import React, { useState, useEffect } from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { createHorario, updateHorario, getInstructores, getFichas, getAmbientes } from '../services/horarioService';
import { toast } from 'react-toastify';

const HorarioForm = ({ open, handleClose, horario, onSubmit }) => {
  const [formData, setFormData] = useState({
    fecha_inicio: '',
    hora_inicio: '',
    fecha_fin: '',
    hora_fin: '',
    dia: '',
    cantidad_horas: '',
    instructor: '',
    ficha: '',
    ambiente: '',
  });

  const [instructores, setInstructores] = useState([]);
  const [fichas, setFichas] = useState([]);
  const [ambientes, setAmbientes] = useState([]);

  useEffect(() => {
    if (horario) {
      setFormData({
        ...horario,
        fecha_inicio: horario.fecha_inicio ? horario.fecha_inicio.slice(0, 16) : '',
        fecha_fin: horario.fecha_fin ? horario.fecha_fin.slice(0, 16) : ''
      });
    }
  }, [horario]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const instructoresRes = await getInstructores();
        setInstructores(instructoresRes.data.datos || []);

        const fichasRes = await getFichas();
        setFichas(fichasRes.data.datos || []);

        const ambientesRes = await getAmbientes();
        setAmbientes(ambientesRes.datos || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleInstructorChange = (e) => {
    const selectedInstructor = instructores.find(instructor => instructor.id_persona === e.target.value);
    if (selectedInstructor) {
      setFormData({
        ...formData,
        instructor: selectedInstructor.id_persona,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (horario) {
        await updateHorario(horario.id_horario, formData);
        toast.success('Horario actualizado correctamente');
      } else {
        await createHorario(formData);
        toast.success('Horario creado correctamente');
      }
      onSubmit();
      handleClose();
    } catch (error) {
      toast.error('Error al guardar el horario');
      console.error('Error submitting form:', error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{horario ? 'Actualizar Horario' : 'Crear Horario'}</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Fecha Inicio"
            name="fecha_inicio"
            type="datetime-local"
            value={formData.fecha_inicio}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Hora Inicio"
            name="hora_inicio"
            value={formData.hora_inicio}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Fecha Fin"
            name="fecha_fin"
            type="datetime-local"
            value={formData.fecha_fin}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Hora Fin"
            name="hora_fin"
            value={formData.hora_fin}
            onChange={handleChange}
            fullWidth
            required
          />
          <FormControl fullWidth>
            <InputLabel>Día</InputLabel>
            <Select
              name="dia"
              value={formData.dia}
              onChange={handleChange}
            >
              <MenuItem value="lunes">Lunes</MenuItem>
              <MenuItem value="martes">Martes</MenuItem>
              <MenuItem value="miércoles">Miércoles</MenuItem>
              <MenuItem value="jueves">Jueves</MenuItem>
              <MenuItem value="viernes">Viernes</MenuItem>
              <MenuItem value="sábado">Sábado</MenuItem>
              <MenuItem value="domingo">Domingo</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Cantidad de Horas"
            name="cantidad_horas"
            value={formData.cantidad_horas}
            onChange={handleChange}
            fullWidth
            required
          />
          <FormControl fullWidth>
            <InputLabel>Instructor</InputLabel>
            <Select
              name="instructor"
              value={formData.instructor}
              onChange={handleInstructorChange}
            >
              {instructores.map((instructor) => (
                <MenuItem key={instructor.id_persona} value={instructor.id_persona}>
                  {instructor.nombres}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Ficha</InputLabel>
            <Select
              name="ficha"
              value={formData.ficha}
              onChange={handleChange}
            >
              {fichas.map((ficha) => (
                <MenuItem key={ficha.codigo} value={ficha.codigo}>
                  {ficha.codigo}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Ambiente</InputLabel>
            <Select
              name="ambiente"
              value={formData.ambiente}
              onChange={handleChange}
            >
              {ambientes.map((ambiente) => (
                <MenuItem key={ambiente.id_ambiente} value={ambiente.id_ambiente}>
                  {ambiente.nombre_amb}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          {horario ? 'Actualizar' : 'Crear'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default HorarioForm;
