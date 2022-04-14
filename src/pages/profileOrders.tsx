import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styles from './pages.module.css';
import ProfileNavigation from '../components/ProfileNavigation/ProfileNavigation'
import OrderFeed from '../components/OrderFeed/OrderFeed';
import { WS_CONNECTION_START } from '../services/actions/wsActions';

const ProfileOrders = () => {
  const dispatch = useDispatch();
  useEffect(
    () => {    
      dispatch({ type: WS_CONNECTION_START });
    },
    [dispatch]
  );
  
  return (
    <div className={styles.profileMain}>
      <ProfileNavigation/>
      <OrderFeed path={'/profile/orders/'}/>
    </div>
  )
}

export default ProfileOrders;
