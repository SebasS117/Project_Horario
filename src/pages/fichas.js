import React from 'react';
import FichaList from '../components/FichaList';
import Layout from '../components/Layout';

const FichasPage = () => {
  return (
    <Layout>
      <h1>Gestión de Fichas de Formación</h1>
      <FichaList />
    </Layout>
  );
};

export default FichasPage;
