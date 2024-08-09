import React, { useState, useEffect } from 'react';
import { getFichas, deleteFicha } from '../services/fichaService';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import FichaForm from './FichaForm';

const FichaList = () => {
  const [fichas, setFichas] = useState([]);
  const [selectedFicha, setSelectedFicha] = useState(null);

  useEffect(() => {
    fetchFichas();
  }, []);

  const fetchFichas = async () => {
    try {
      const response = await getFichas();
      setFichas(response.data.datos);
    } catch (error) {
      console.error('Error fetching fichas:', error);
    }
  };

  const handleEdit = (ficha) => {
    setSelectedFicha(ficha);
  };

  const handleDelete = async (id) => {
    try {
      await deleteFicha(id);
      fetchFichas();
    } catch (error) {
      console.error('Error deleting ficha:', error);
    }
  };

  const handleSubmit = () => {
    fetchFichas();
    setSelectedFicha(null);
  };

  return (
    <div>
      <FichaForm ficha={selectedFicha} onSubmit={handleSubmit} />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Código</TableCell>
              <TableCell>Inicio Fecha</TableCell>
              <TableCell>Fin Lectiva</TableCell>
              <TableCell>Fin Ficha</TableCell>
              <TableCell>Programa</TableCell>
              <TableCell>Sede</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fichas.map((ficha) => (
              <TableRow key={ficha.codigo}>
                <TableCell>{ficha.codigo}</TableCell>
                <TableCell>{new Date(ficha.inicio_fecha).toLocaleString()}</TableCell>
                <TableCell>{new Date(ficha.fin_lectiva).toLocaleString()}</TableCell>
                <TableCell>{new Date(ficha.fin_ficha).toLocaleString()}</TableCell>
                <TableCell>{ficha.programa}</TableCell>
                <TableCell>{ficha.sede}</TableCell>
                <TableCell>{ficha.estado}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEdit(ficha)}>Editar</Button>
                  <Button onClick={() => handleDelete(ficha.codigo)}>Eliminar</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default FichaList;

