"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container, TextField, Button, Select, MenuItem,
  Table, TableHead, TableBody, TableRow, TableCell,
  Typography, FormControl, InputLabel, Box
} from '@mui/material';

const Horarios = () => {
  const [horarios, setHorarios] = useState([]);
  const [instructor, setInstructor] = useState('');
  const [area, setArea] = useState('');
  const [areas, setAreas] = useState([]);
  const [fechaInicio, setFechaInicio] = useState('');
  const [horaInicio, setHoraInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [horaFin, setHoraFin] = useState('');
  const [dia, setDia] = useState('');
  const [cantidadHoras, setCantidadHoras] = useState('');

  useEffect(() => {
    fetchHorarios();
    fetchAreas();
  }, []);

  const fetchHorarios = async () => {
    const response = await axios.get('/api/horarios');
    setHorarios(response.data.datos);
  };

  const fetchAreas = async () => {
    const response = await axios.get('/api/areas');
    setAreas(response.data.datos);
  };

  const createHorario = async () => {
    const nuevoHorario = {
      instructor,
      area,
      fecha_inicio: fechaInicio,
      hora_inicio: horaInicio,
      fecha_fin: fechaFin,
      hora_fin: horaFin,
      dia,
      cantidad_horas: cantidadHoras,
    };
    await axios.post('/api/horarios', nuevoHorario);
    setInstructor('');
    setArea('');
    setFechaInicio('');
    setHoraInicio('');
    setFechaFin('');
    setHoraFin('');
    setDia('');
    setCantidadHoras('');
    fetchHorarios();
  };

  const deleteHorario = async (id) => {
    await axios.delete(`/api/horarios/${id}`);
    fetchHorarios();
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Administrar Horarios</Typography>
      <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
        <TextField
          label="Instructor"
          value={instructor}
          onChange={(e) => setInstructor(e.target.value)}
        />
        <FormControl fullWidth>
          <InputLabel>Área</InputLabel>
          <Select
            value={area}
            onChange={(e) => setArea(e.target.value)}
          >
            <MenuItem value="">
              <em>Seleccione un área</em>
            </MenuItem>
            {areas.map((area) => (
              <MenuItem key={area.id_area} value={area.id_area}>
                {area.nombre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          type="date"
          label="Fecha de Inicio"
          InputLabelProps={{ shrink: true }}
          value={fechaInicio}
          onChange={(e) => setFechaInicio(e.target.value)}
        />
        <TextField
          type="time"
          label="Hora de Inicio"
          InputLabelProps={{ shrink: true }}
          value={horaInicio}
          onChange={(e) => setHoraInicio(e.target.value)}
        />
        <TextField
          type="date"
          label="Fecha de Fin"
          InputLabelProps={{ shrink: true }}
          value={fechaFin}
          onChange={(e) => setFechaFin(e.target.value)}
        />
        <TextField
          type="time"
          label="Hora de Fin"
          InputLabelProps={{ shrink: true }}
          value={horaFin}
          onChange={(e) => setHoraFin(e.target.value)}
        />
        <TextField
          label="Día"
          value={dia}
          onChange={(e) => setDia(e.target.value)}
        />
        <TextField
          type="number"
          label="Cantidad de Horas"
          value={cantidadHoras}
          onChange={(e) => setCantidadHoras(e.target.value)}
        />
        <Button variant="contained" onClick={createHorario}>Crear</Button>
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Instructor</TableCell>
            <TableCell>Área</TableCell>
            <TableCell>Fecha Inicio</TableCell>
            <TableCell>Hora Inicio</TableCell>
            <TableCell>Fecha Fin</TableCell>
            <TableCell>Hora Fin</TableCell>
            <TableCell>Día</TableCell>
            <TableCell>Cantidad de Horas</TableCell>
            <TableCell>Admin.</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {horarios.map((horario) => (
            <TableRow key={horario.id_horario}>
              <TableCell>{horario.instructor}</TableCell>
              <TableCell>{horario.area}</TableCell>
              <TableCell>{horario.fecha_inicio}</TableCell>
              <TableCell>{horario.hora_inicio}</TableCell>
              <TableCell>{horario.fecha_fin}</TableCell>
              <TableCell>{horario.hora_fin}</TableCell>
              <TableCell>{horario.dia}</TableCell>
              <TableCell>{horario.cantidad_horas}</TableCell>
              <TableCell>
                <Button variant="contained" color="secondary" onClick={() => deleteHorario(horario.id_horario)}>
                  Eliminar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default Horarios;

