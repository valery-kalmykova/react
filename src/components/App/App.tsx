import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AppHeader from '../AppHeader/AppHeader';
import appStyle from './App.module.css';
import HomePage from '../../pages/home';
import Login from '../../pages/login';
import Register from '../../pages/register'
import ForgotPassword from '../../pages/forgotPassword'
import ResetPassword from '../../pages/resetPassword'
import Profile from '../../pages/profile'
import NotFound from '../../pages/notFound'
import ProtectedRoute from '../ProtectedRoute/protectedRoute';
import { getItems } from '../../services/actions/products'
import { useDispatch } from 'react-redux';

const App = () => { 
  const dispatch = useDispatch();   
  useEffect(
    () => {
      dispatch(getItems());          
    },
    [dispatch]
  );
  return (
    <Router>
      <div className={appStyle.app}>
        <AppHeader />
        <Route exact path='/' component={HomePage}/>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/register' component={Register}/>
        <Route exact path='/forgot-password' component={ForgotPassword}/>
        <Route exact path='/reset-password' component={ResetPassword}/>
        <Route exact path='/404' component={NotFound}/>        
        <ProtectedRoute exact path='/profile' component={Profile}/>        
      </div>
    </Router>
    
  );
}

export default App;
