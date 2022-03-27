import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default function ProtectedRoute({ component: Component, ...restOfProps }) { 
  const isUserLoaded = localStorage.getItem('accessToken');
  return (
    <Route
      {...restOfProps}
      render={(props) =>      
        isUserLoaded ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}