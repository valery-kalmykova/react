import React from 'react';
import { Route, useLocation, Switch }from 'react-router-dom';
import HomePage from '../../pages/home';
import Login from '../../pages/login';
import Register from '../../pages/register';
import ForgotPassword from '../../pages/forgotPassword';
import ResetPassword from '../../pages/resetPassword';
import Profile from '../../pages/profile';
import NotFound from '../../pages/notFound';
import Ingredient from '../../pages/ingredient';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import ModalWithIngridientDetail from '../Modal/ModalWithIngridientDetail'

const RouteSwitch = () => {
  const location = useLocation();
  const keySendSuccess = localStorage.getItem('keySendSuccess');
  const token = localStorage.getItem('accessToken'); 
  const background = location.state && location.state.background;   

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
          {token ? <HomePage/> : <Register/>}          
        </Route>
        <Route path='/forgot-password'>
          {token ? <HomePage/> : <ForgotPassword/>}
        </Route>
        <Route path='/reset-password'>
          {token ? <HomePage/> : 
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
      {background && <Route path='/ingredients/:id'>
        <ModalWithIngridientDetail/>
        </Route>
      }
    </>
  )
}

export default RouteSwitch;