import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // Import js-cookie for cookie management

const PrivateRoute = ({ children }) => {
  // Check if the accessToken exists in cookies
  const accessToken = Cookies.get('accessToken');

  // If accessToken exists, assume the user is authenticated
  return accessToken ? children : <Navigate to="/sign-in" />;
};

export default PrivateRoute;
