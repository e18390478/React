import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { Grid, Paper, Typography, Button } from '@mui/material';
import { Modal } from 'react-bootstrap';

const CustomersList = () => {
  const [users, setUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    first: '',
    last: '',
    email: '',
    company: '',
    country: ''
  });

  const axiosInstance = useMemo(() => axios.create({
    baseURL: 'https://localhost:44335/api/v1/Sales',
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  }), []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get();
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
        setErrorMessage('Error fetching users');
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (!confirmDelete) return;

    try {
      await axiosInstance.delete(`/${id}`);
      window.location.reload();
    } catch (error) {
      console.error('Error deleting user:', error);
      setErrorMessage('Error deleting user');
    }
  };

  const handleUpdate = (id, first, last, email, company, country) => {
    setFormData({ id, first, last, email, company, country });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleCancel = () => {
    setFormData({
      id: '',
      first: '',
      last: '',
      email: '',
      company: '',
      country: ''
    });
    setShowModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/Update', formData);
      setShowModal(false);
      window.location.reload();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <Grid container spacing={2}>
      <Modal show={showModal} onHide={handleCloseModal} style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 9999 }}>
        <Modal.Header closeButton style={{ backgroundColor: '#007bff', color: 'white', fontSize: '24px' }}>
          <Modal.Title>Update Customers</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label style={{ fontSize: '30px' }}>ID:</label>
              <input style={{ fontSize: '30px' }} type="text" value={formData.id} disabled className="form-control" />
            </div>
            <div className="form-group">
              <label style={{ fontSize: '30px' }}>First Name:</label>
              <input style={{ fontSize: '30px' }} type="text" value={formData.first} onChange={(e) => setFormData({ ...formData, first: e.target.value })} className="form-control" />
            </div>
            <div className="form-group">
              <label style={{ fontSize: '30px' }}>Last Name:</label>
              <input style={{ fontSize: '30px' }} type="text" value={formData.last} onChange={(e) => setFormData({ ...formData, last: e.target.value })} className="form-control" />
            </div>
            <div className="form-group">
              <label style={{ fontSize: '30px' }}>Email:</label>
              <input style={{ fontSize: '30px' }} type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="form-control" />
            </div>
            <div className="form-group">
              <label style={{ fontSize: '30px' }}>Company:</label>
              <input style={{ fontSize: '30px' }} type="text" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} className="form-control" />
            </div>
            <div className="form-group">
              <label style={{ fontSize: '30px' }}>Country:</label>
              <input style={{ fontSize: '30px' }} type="text" value={formData.country} onChange={(e) => setFormData({ ...formData, country: e.target.value })} className="form-control" />
            </div>
            <Button variant="contained" color="primary" type="submit">Update</Button>
            <Button variant="contained" color="secondary" onClick={handleCancel}>Cancel</Button>
          </form>
        </Modal.Body>
      </Modal>
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
            <Button variant="contained" color="primary" onClick={() => handleUpdate(user.id, user.first, user.last, user.email, user.company, user.country)}>Update</Button>
            <Button variant="contained" color="secondary" onClick={() => handleDelete(user.id)}>Delete</Button>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default CustomersList;
