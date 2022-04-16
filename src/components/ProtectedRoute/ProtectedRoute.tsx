import React, { useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Loader } from '../../ui/Loader/Loader';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../services/reducers';
import { getUser } from '../../services/actions/user';

export default function ProtectedRoute({ children, ...restOfProps }) { 
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state:RootState) => state.user.isLoggedIn); 
  const isLoading = useSelector((state: RootState) => state.user.getRequest);
  
  useEffect(
    () => {
      if (isLoggedIn) {
        dispatch(getUser())
      }     
    },
    [dispatch, isLoggedIn]
  ); 

  if(isLoading) {
    return <Loader size="large" inverse={true}/>
  } 

  return (
    <Route
      {...restOfProps}
      render={(props) =>    
        isLoggedIn ? (children) : <Redirect to={{pathname: '/login', state: props.location}} />
      }
    />
  );
  
}