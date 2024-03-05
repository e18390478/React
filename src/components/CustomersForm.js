import React, { useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { TextField, Button } from '@mui/material';

const UserForm = () => {
  const { register, formState: { errors }, handleSubmit, reset } = useForm();
  const [errorMessage, setErrorMessage] = useState('');
  
  const axiosInstance = useMemo(() => axios.create({
    baseURL: 'https://localhost:44335/api/v1/Sales',
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  }), []); 

  const onSubmit = async (data) => {
    try {
      const result = await axiosInstance.post('/Create', data);
      if(result.data.id) {
        reset();
        window.location.reload();
      } else {
        setErrorMessage('Error creating: ' + JSON.stringify(result.data[0].errorMessage));
      }
    } catch (error) {
      console.error('Error creating:', error);
      setErrorMessage('Error creating: ' + error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="First Name"
          variant="outlined"
          {...register("first", { required: true })}
          error={!!errors.first}
          helperText={errors.first && "First name is required"}
        />
        <TextField
          label="Last Name"
          variant="outlined"
          {...register("last", { required: true })}
          error={!!errors.last}
          helperText={errors.last && "Last name is required"}
        />
        <TextField
          label="Company"
          variant="outlined"
          {...register("company", { required: true })}
          error={!!errors.company}
          helperText={errors.company && "Company is required"}
        />
        <TextField
          label="Country"
          variant="outlined"
          {...register("country", { required: true })}
          error={!!errors.country}
          helperText={errors.country && "Country is required"}
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
      {errorMessage && <div>{errorMessage}</div>}
    </div>
  );
};

export default UserForm;
