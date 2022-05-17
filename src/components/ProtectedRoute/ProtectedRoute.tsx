import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Loader } from '../../ui/Loader/Loader';
import { useSelector, useDispatch } from '../../services/hooks/hooks';
import { getUser } from '../../services/actions/user';

interface ProtectedRouteProps {
  children: JSX.Element,
  exact: boolean,
  path: string
}

export default function ProtectedRoute({ children, ...restOfProps }: ProtectedRouteProps) { 
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.user.isLoggedIn); 
  const isLoading = useSelector(state => state.user.getRequest);
  
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