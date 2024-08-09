import React from 'react';
import HorarioList from '../components/HorarioList';
import Layout from '../components/Layout';

const HorariosPage = () => {
  return (
    <Layout>
      <h1>Gestión de Horarios de Instructores y Ambientes</h1>
      <HorarioList />
    </Layout>
  );
};

export default HorariosPage;
