import React, { useEffect } from 'react';
import { Route, useLocation, Switch }from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import HomePage from '../../pages/home';
import Login from '../../pages/login';
import Register from '../../pages/register';
import ForgotPassword from '../../pages/forgotPassword';
import ResetPassword from '../../pages/resetPassword';
import Profile from '../../pages/profile';
import NotFound from '../../pages/notFound';
import Ingredient from '../../pages/ingredient';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import ModalWithIngridientDetail from '../Modal/ModalWithIngridientDetail';
import { RootState } from '../../services/reducers';
import { refreshToken, setIsLoggedIn, setIsNotLoggedIn } from '../../services/actions/user';

const RouteSwitch = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const keySendSuccess = localStorage.getItem('keySendSuccess');
  const background = location.state && location.state.background;  
  const itemSuccess = useSelector((state:RootState) => state.products.response); 
  const isLoggedIn = useSelector((state:RootState) => state.user.isLoggedIn);
  
  const expiryToken = (token) => {
    return (JSON.parse(atob(token.split('.')[1]))).exp
  }
  function checkToken() {
    const token = localStorage.getItem('accessToken');      
    if (token) {
      if (Date.now() <= expiryToken(token) * 1000) {                 
        dispatch(setIsLoggedIn());
      } else {              
        dispatch(refreshToken());        
      }
    } else {                 
      dispatch(setIsNotLoggedIn());
    }  
  }
  useEffect(
    () => {          
      checkToken();
    }, 
    [isLoggedIn]
  );
   
  return (
    <>
      <Switch location={background || location}>          
        <Route exact path='/'>
          <HomePage/>
        </Route>
        <Route path='/login'>
          <Login/>
        </Route>
        <Route path='/register'>
          {isLoggedIn ? <HomePage/> : <Register/>}          
        </Route>
        <Route path='/forgot-password'>
          {isLoggedIn ? <HomePage/> : <ForgotPassword/>}
        </Route>
        <Route path='/reset-password'>
          {isLoggedIn ? <HomePage/> : 
            keySendSuccess ? <ResetPassword/> : <ForgotPassword/>
          }          
        </Route>          
        <ProtectedRoute path='/profile'>
          <Profile/>
        </ProtectedRoute>
        <Route path='/ingredients/:id'>
          <Ingredient/>
        </Route>      
        <Route path='*'>
          <NotFound/>
        </Route>
      </Switch>
      {background && itemSuccess && <Route path='/ingredients/:id'>
        <ModalWithIngridientDetail/>
        </Route>
      }
    </>
  )
}

export default RouteSwitch;