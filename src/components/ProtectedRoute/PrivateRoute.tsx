import React from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';
import { withRouter } from "react-router";

function PrivateRoute({ component: Component, ...restOfProps }) {  
  const location = useLocation();  
  const fromForgotPassword = location.state === '/forgot-password';

  return (
    <Route
      {...restOfProps}
      render={(props) =>    
        fromForgotPassword ? <Component {...props} /> : <Redirect to={{pathname: '/forgot-password', state: props.location}} />
      }
    />
  );
}

export default withRouter(PrivateRoute)