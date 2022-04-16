import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './pages.module.css';
import ProfileNavigation from '../components/ProfileNavigation/ProfileNavigation'
import OrderFeed from '../components/OrderFeed/OrderFeed';
import { WS_CONNECTION_START, WS_CONNECTION_CLOSED } from '../services/actions/wsActions';
import { RootState } from '../services/reducers';

const ProfileOrders = () => {
  const dispatch = useDispatch();
  const wsConnected = useSelector((state:RootState) => state.wsReducer.wsConnected);
  
  useEffect(
    () => {    
      dispatch({ type: WS_CONNECTION_START });
    },
    [dispatch]
  );
  useEffect(
    () => {
      return () => {
        if(wsConnected) {          
          dispatch({ type: WS_CONNECTION_CLOSED })
        }        
      }
    }, [wsConnected, dispatch]
  )
  
  return (
    <div className={styles.profileMain}>
      <ProfileNavigation/>
      <OrderFeed path={'/profile/orders/'}/>
    </div>
  )
}

export default ProfileOrders;
