import React from 'react';
import CustomersForm from './components/CustomersForm';
import CustomersList from './components/CustomersList';

const App = () => {
  return (
    <div>
      <h1>Form Customers</h1>
      <CustomersForm />
      <h1></h1>
      <CustomersList />
    </div>
  );
};

export default App;
