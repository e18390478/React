import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { Grid, Paper, Typography ,Button } from '@mui/material';
import { Modal  } from 'react-bootstrap';

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
    }
  };

  const handleUpdate = (id, first, last, email, company, country) => {
    setFormData({ id, first, last, email, company, country });
    setShowModal(true);
  };

  const handleCloseModal = () => {
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
      <Modal show={showModal} onHide={handleCloseModal} className="modal-big">
        <Modal.Header closeButton>
          <Modal.Title className="modal-title">Update User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>ID:</label>
              <input type="text" value={formData.id} disabled className="form-control" />
            </div>
            <div className="form-group">
              <label>First Name:</label>
              <input type="text" value={formData.first} onChange={(e) => setFormData({ ...formData, first: e.target.value })} className="form-control" />
            </div>
            <div className="form-group">
              <label>Last Name:</label>
              <input type="text" value={formData.last} onChange={(e) => setFormData({ ...formData, last: e.target.value })} className="form-control" />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="form-control" />
            </div>
            <div className="form-group">
              <label>Company:</label>
              <input type="text" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} className="form-control" />
            </div>
            <div className="form-group">
              <label>Country:</label>
              <input type="text" value={formData.country} onChange={(e) => setFormData({ ...formData, country: e.target.value })} className="form-control" />
            </div>
            <Button variant="primary" type="submit">Update</Button>
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
