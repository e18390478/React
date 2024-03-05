import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Paper, Typography ,Button } from '@mui/material';

const CustomersList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://localhost:44335/api/v1/Sales');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = (id) => {
    // Lógica para eliminar el usuario con el ID proporcionado
    console.log('Deleting user with ID:', id);
  };

  const handleUpdate = (id) => {
    // Lógica para actualizar el usuario con el ID proporcionado
    console.log('Updating user with ID:', id);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Paper>
          <Typography variant="h5" component="h2">
            List Customers
          </Typography>
        </Paper>
      </Grid>
      {users.map((user) => (
        <Grid item xs={12} key={user.id}>
          <Paper>
            <Typography variant="h5" component="h2">
              ID: {user.id}
            </Typography>
            <Typography variant="h5" component="h2">
              FirstName: {user.first}
            </Typography>
            <Typography variant="h5" component="h2">
              LastName: {user.last}
            </Typography>
            <Typography variant="h5" component="h2">
              Email: {user.email}
            </Typography>
            <Typography variant="h5" component="h2">
              Company: {user.company}
            </Typography>
            <Typography variant="h5" component="h2">
              Country: {user.country}
            </Typography>
          </Paper>
            <Button variant="contained" color="primary" onClick={() => handleUpdate(user.id)}>Update</Button>
            <Button variant="contained" color="secondary" onClick={() => handleDelete(user.id)}>Delete</Button>
        </Grid>
      ))}
    </Grid>
  );  
  
};

export default CustomersList;