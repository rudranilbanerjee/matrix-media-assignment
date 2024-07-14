import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children }) => {
  const { logged } = useSelector((state) => state.auth);

  return logged ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
