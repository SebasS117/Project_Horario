import React from 'react';
import AmbienteList from '../components/AmbienteList';
import Layout from '../components/Layout';

const AmbientesPage = () => {
  return (
    <Layout>
      <h1>Gestión de Ambientes de Formación</h1>
      <AmbienteList />
    </Layout>
  );
};

export default AmbientesPage;
