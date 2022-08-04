import React, { useEffect } from 'react';
import { Route, useLocation, Switch}from 'react-router-dom';
import { useSelector, useDispatch } from '../../services/hooks/hooks';
import HomePage from '../../pages/home';
import Login from '../../pages/login';
import Register from '../../pages/register';
import ForgotPassword from '../../pages/forgotPassword';
import ResetPassword from '../../pages/resetPassword';
import Profile from '../../pages/profile';
import ProfileOrders from '../../pages/profileOrders'
import NotFound from '../../pages/notFound';
import Ingredient from '../../pages/ingredient';
import Feed from '../../pages/feed';
import FeedDetail from '../../pages/feedDetail';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import ModalWithIngridientDetail from '../Modal/ModalWithIngridientDetail';
import ModalWithFeedDetail from '../Modal/ModalWithFeedDetail';
import { refreshToken, setIsLoggedIn, setIsNotLoggedIn } from '../../services/actions/user';

interface LocationState {  
  background: any
}

const RouteSwitch = () => {
  const location = useLocation<LocationState>();
  const dispatch = useDispatch();
  const keySendSuccess = localStorage.getItem('keySendSuccess');
  const background = location.state && location.state.background;  
  const itemSuccess = useSelector(state => state.products.response); 
  const isLoggedIn = useSelector(state => state.user.isLoggedIn); 
  const getOrdersSuccess = useSelector(state => state.wsReducer.getOrdersSuccess);
  
  const expiryToken = (token: string) => {
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
        <Route exact path='/react'>
          <HomePage/>
        </Route>
        <Route exact path='/login'>
          <Login/>
        </Route>
        <Route exact path='/feed'>
          <Feed/>
        </Route>
        <Route exact path='/feed/:id'>
          <FeedDetail/>
        </Route>
        <Route exact path='/profile/orders/:id'>
          {isLoggedIn ? <FeedDetail/> : <HomePage/>}
        </Route>
        <Route exact path='/register'>
          {isLoggedIn ? <HomePage/> : <Register/>}          
        </Route>
        <Route exact path='/forgot-password'>
          {isLoggedIn ? <HomePage/> : <ForgotPassword/>}
        </Route>
        <Route exact path='/reset-password'>
          {isLoggedIn ? <HomePage/> : 
            keySendSuccess ? <ResetPassword/> : <ForgotPassword/>
          }          
        </Route>          
        <ProtectedRoute exact path='/profile'>
          <Profile/>
        </ProtectedRoute>
        <Route exact path='/profile/orders'>          
          {isLoggedIn ? <ProfileOrders/> : <HomePage/>}
        </Route>        
        <Route exact path='/ingredients/:id'>
          <Ingredient/>
        </Route>      
        <Route path='*'>
          <NotFound/>
        </Route>
      </Switch>
      {background && getOrdersSuccess && <Route exact path='/feed/:id'>
          <ModalWithFeedDetail/>
        </Route>
      }
      {background && getOrdersSuccess && <Route exact path='/profile/orders/:id'>
          <ModalWithFeedDetail/>
        </Route>
      }
      {background && itemSuccess && <Route exact path='/ingredients/:id'>
          <ModalWithIngridientDetail/>
        </Route>
      }      
    </>
  )
}

export default RouteSwitch;