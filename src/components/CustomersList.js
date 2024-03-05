import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Paper, Typography } from '@mui/material';

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
        </Grid>
      ))}
    </Grid>
  );
  
  
};

export default CustomersList;