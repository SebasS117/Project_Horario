import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';
import Link from 'next/link';

const Sidebar = () => {
  return (
    <div style={{ width: 250, background: '#f0f0f0', height: '100vh', padding: 10 }}>
      <List component="nav">
        <ListItem button component="a" href="/ambientes">
          <ListItemText primary="Ambientes de Formación" />
        </ListItem>
        <ListItem button component="a" href="/fichas">
          <ListItemText primary="Fichas de Formación" />
        </ListItem>
        <ListItem button component="a" href="/vinculacion">
          <ListItemText primary="Vinculación de Instructores" />
        </ListItem>
        <ListItem button component="a" href="/horarios">
          <ListItemText primary="Horarios" />
        </ListItem>
      </List>
    </div>
  );
};

export default Sidebar;



