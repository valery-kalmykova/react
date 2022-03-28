import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Loader } from '../../ui/Loader/Loader';
import { getUser } from '../../services/actions/user'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../services/reducers';

export default function ProtectedRoute({ component: Component, ...restOfProps }) { 
  const token = localStorage.getItem('accessToken');
  const dispatch = useDispatch();  
  
  useEffect(
    () => {      
      dispatch(getUser());    
    },
    [token]
  );
  
  const isLoading = useSelector((state: RootState) => state.user.getRequest);  
   
  if(isLoading) {
    return <Loader size="large" inverse={true}/>
  }

  return (
    <Route
      {...restOfProps}
      render={(props) =>    
        token ? <Component {...props} /> : <Redirect to={{pathname: '/login', state: props.location}} />
      }
    />
  );
}