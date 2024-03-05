import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { TextField, Button } from '@mui/material';

const UserForm = () => {
  const { register, formState: { errors }, handleSubmit, reset } = useForm();

  const axiosInstance = useMemo(() => axios.create({
    baseURL: 'https://localhost:44335/api/v1/Sales',
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  }), ['https://localhost:44335/api/v1/Sales']);

  const handleNameChange = (event) => {
    console.log(event.target.value);
  };

  const handleEmailChange = (event) => {
    console.log(event.target.value);
  };

  const onSubmit = async (data) => {
    try {
      await axiosInstance.post('/Create', data);
      reset();
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        label="First Name"
        variant="outlined"
        {...register("firstName", { required: true })}
        error={!!errors.firstName}
        helperText={errors.firstName && "First name is required"}
      />
      <TextField
        label="Last Name"
        variant="outlined"
        {...register("lastName", { required: true })}
        error={!!errors.lastName}
        helperText={errors.lastName && "Last name is required"}
      />
      <Button type="submit" variant="contained" color="primary" size="large">
        Submit
      </Button>
    </form>
  );
};

export default UserForm;
