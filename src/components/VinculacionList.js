import React, { useState, useEffect } from 'react';
import { getVinculaciones, deleteVinculacion } from '../services/vinculacionService';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import VinculacionForm from './VinculacionForm';

const VinculacionList = () => {
  const [vinculaciones, setVinculaciones] = useState([]);
  const [selectedVinculacion, setSelectedVinculacion] = useState(null);

  useEffect(() => {
    fetchVinculaciones();
  }, []);

  const fetchVinculaciones = async () => {
    try {
      const response = await getVinculaciones();
      setVinculaciones(response.data.datos);
    } catch (error) {
      console.error('Error fetching vinculaciones:', error);
    }
  };

  const handleEdit = (vinculacion) => {
    setSelectedVinculacion(vinculacion);
  };

  const handleDelete = async (id) => {
    try {
      await deleteVinculacion(id);
      fetchVinculaciones();
    } catch (error) {
      console.error('Error deleting vinculacion:', error);
    }
  };

  const handleSubmit = () => {
    fetchVinculaciones();
    setSelectedVinculacion(null);
  };

  return (
    <div>
      <VinculacionForm vinculacion={selectedVinculacion} onSubmit={handleSubmit} />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Instructor</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell>Sede</TableCell>
              <TableCell>Área</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vinculaciones.map((vinculacion) => (
              <TableRow key={vinculacion.id_vinculacion}>
                <TableCell>{vinculacion.instructor}</TableCell>
                <TableCell>{vinculacion.tipo}</TableCell>
                <TableCell>{vinculacion.sede}</TableCell>
                <TableCell>{vinculacion.area}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEdit(vinculacion)}>Editar</Button>
                  <Button onClick={() => handleDelete(vinculacion.id_vinculacion)}>Eliminar</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default VinculacionList;
