import React from 'react';
import VinculacionList from '../components/VinculacionList';
import Layout from '../components/Layout';

const VinculacionPage = () => {
  return (
    <Layout>
      <h1>Gestión de Vinculación de Instructores</h1>
      <VinculacionList />
    </Layout>
  );
};

export default VinculacionPage;
