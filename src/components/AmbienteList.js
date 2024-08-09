import React, { useState, useEffect } from 'react';
import { getAmbientes, deleteAmbiente } from '../services/ambienteService';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import AmbienteForm from './AmbienteForm';

const AmbienteList = () => {
  const [ambientes, setAmbientes] = useState([]);
  const [selectedAmbiente, setSelectedAmbiente] = useState(null);

  useEffect(() => {
    fetchAmbientes();
  }, []);

  const fetchAmbientes = async () => {
    const response = await getAmbientes();
    setAmbientes(response.data);
  };

  const handleEdit = (ambiente) => {
    setSelectedAmbiente(ambiente);
  };

  const handleDelete = async (id) => {
    await deleteAmbiente(id);
    fetchAmbientes();
  };

  const handleSubmit = () => {
    fetchAmbientes();
    setSelectedAmbiente(null);
  };

  return (
    <div>
      <AmbienteForm ambiente={selectedAmbiente} onSubmit={handleSubmit} />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Municipio</TableCell>
              <TableCell>Sede</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ambientes.map((ambiente) => (
              <TableRow key={ambiente.id_ambiente}>
                <TableCell>{ambiente.nombre_amb}</TableCell>
                <TableCell>{ambiente.municipio}</TableCell>
                <TableCell>{ambiente.sede}</TableCell>
                <TableCell>{ambiente.estado}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEdit(ambiente)}>Editar</Button>
                  <Button onClick={() => handleDelete(ambiente.id_ambiente)}>Eliminar</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AmbienteList;
