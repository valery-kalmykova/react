import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AppHeader from '../AppHeader/AppHeader';
import appStyle from './App.module.css';
import HomePage from '../../pages/home';
import Login from '../../pages/login';
import Register from '../../pages/register'
import ForgotPassword from '../../pages/forgotPassword'
import ResetPassword from '../../pages/resetPassword'
import Profile from '../../pages/profile'

const App = () => {  
  return (
    <Router>
      <div className={appStyle.app}>
        <AppHeader />
        <Route path="/" exact={true}>
          <HomePage />
        </Route>
        <Route path="/login" exact={true}>
          <Login />
        </Route>
        <Route path="/register" exact={true}>
          <Register />
        </Route>
        <Route path="/forgot-password" exact={true}>
          <ForgotPassword />
        </Route>
        <Route path="/reset-password" exact={true}>
          <ResetPassword />
        </Route>
        <Route path="/profile" exact={true}>
          <Profile />
        </Route>
      </div>
    </Router>
    
  );
}

export default App;
