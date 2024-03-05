import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { TextField, Button } from '@mui/material';


const UserForm = () => {
  const { register, formState: { errors }, handleSubmit, reset } = useForm();

  const axiosInstance = useMemo(() => axios.create({
    baseURL: 'https://localhost:44335/api/v1/Sales', // Corregido el método de creación de axiosInstance
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  }), []); // Eliminado el array de dependencias

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
        {...register("first", { required: true })}
        error={!!errors.firstName}
        helperText={errors.firstName && "First name is required"}
      />
      <TextField
        label="Last Name"
        variant="outlined"
        {...register("last", { required: true })}
        error={!!errors.lastName}
        helperText={errors.lastName && "Last name is required"}
      />
      <TextField
        label="Company"
        variant="outlined"
        {...register("company", { required: true })}
        error={!!errors.lastName}
        helperText={errors.lastName && "Company is required"}
      />
      <TextField
        label="Country"
        variant="outlined"
        {...register("country", { required: true })}
        error={!!errors.lastName}
        helperText={errors.lastName && "Country is required"}
      />
      <TextField
        label="Email"
        variant="outlined"
        {...register("email", { required: true, pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ })}
        error={!!errors.email}
        helperText={errors.email && "Please enter a valid email"}
      />
      <Button type="submit" variant="contained" color="primary" size="large">
        Submit
      </Button>
    </form>
  );
};

export default UserForm;
