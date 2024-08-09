"use client";
import React from 'react';
import Link from 'next/link';
import '../globals.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li><Link href="/modules/ambientes">Ambientes de Formación</Link></li>
        <li><Link href="/modules/fichas">Fichas de Formación</Link></li>
        <li><Link href="/modules/vinculaciones">Vinculación de Instructores</Link></li>
        <li><Link href="/modules/horarios">Administración de Horarios</Link></li>
        <li><Link href="/modules/horarios-instructores">Horarios de Instructores</Link></li>
        <li><Link href="/modules/horarios-ambientes">Horarios de Ambientes</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
