import React, { useState, useEffect } from 'react';
import { getHorarios, deleteHorario } from '../services/horarioService';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import HorarioForm from './HorarioForm';
import { toast } from 'react-toastify';

const HorarioList = () => {
  const [horarios, setHorarios] = useState([]);
  const [selectedHorario, setSelectedHorario] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchHorarios();
  }, []);

  const fetchHorarios = async () => {
    try {
      const response = await getHorarios();
      setHorarios(response.data.datos);
    } catch (error) {
      console.error('Error fetching horarios:', error);
    }
  };

  const handleEdit = (horario) => {
    setSelectedHorario(horario);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteHorario(id);
      fetchHorarios();
      toast.success('Horario eliminado correctamente');
    } catch (error) {
      toast.error('Error al eliminar el horario');
      console.error('Error deleting horario:', error);
    }
  };

  const handleOpen = () => {
    setSelectedHorario(null);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    fetchHorarios();
    setSelectedHorario(null);
    handleClose();
  };

  return (
    <div>
      <Button onClick={handleOpen} color="primary" variant="contained">Agregar Horario</Button>
      <HorarioForm open={open} handleClose={handleClose} horario={selectedHorario} onSubmit={handleSubmit} />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Fecha Inicio</TableCell>
              <TableCell>Hora Inicio</TableCell>
              <TableCell>Fecha Fin</TableCell>
              <TableCell>Hora Fin</TableCell>
              <TableCell>Día</TableCell>
              <TableCell>Cantidad de Horas</TableCell>
              <TableCell>Instructor</TableCell>
              <TableCell>Ficha</TableCell>
              <TableCell>Ambiente</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {horarios.map((horario) => (
              <TableRow key={horario.id_horario}>
                <TableCell>{new Date(horario.fecha_inicio).toLocaleString()}</TableCell>
                <TableCell>{horario.hora_inicio}</TableCell>
                <TableCell>{new Date(horario.fecha_fin).toLocaleString()}</TableCell>
                <TableCell>{horario.hora_fin}</TableCell>
                <TableCell>{horario.dia}</TableCell>
                <TableCell>{horario.cantidad_horas}</TableCell>
                <TableCell>{horario.instructor}</TableCell>
                <TableCell>{horario.ficha}</TableCell>
                <TableCell>{horario.ambiente}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEdit(horario)}>Editar</Button>
                  <Button onClick={() => handleDelete(horario.id_horario)}>Eliminar</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default HorarioList;


