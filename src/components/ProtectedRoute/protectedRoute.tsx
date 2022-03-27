import React, { useCallback, useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Loader } from '../../ui/Loader/Loader';
import { getUser } from '../../services/actions/user'
import { useDispatch, useSelector } from 'react-redux';

interface RootState {
  user: {    
    getRequest: boolean,    
  }
}
export default function ProtectedRoute({ component: Component, ...restOfProps }) { 
  const [isUserLoaded, setUserLoaded] = useState<string | null>('');
  const dispatch = useDispatch();

  const init = useCallback(async() => {
    await dispatch(getUser());    
    setUserLoaded(localStorage.getItem('accessToken'))   
  },[dispatch])

  useEffect(
    () => {      
      init();    
    },
    [init]
  );
  
  const isLoading = useSelector((state: RootState) => state.user.getRequest);  
   
  if(isLoading) {
    return <Loader size="large" inverse={true}/>
  }

  return (
    <Route
      {...restOfProps}
      render={(props) =>    
        isUserLoaded ? <Component {...props} /> : <Redirect to={{pathname: '/login', state: props.location}} />
      }
    />
  );
}