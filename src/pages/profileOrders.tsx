import React from 'react';
import styles from './pages.module.css';
import ProfileNavigation from '../components/ProfileNavigation/ProfileNavigation'
import OrderFeed from '../components/OrderFeed/OrderFeed';

const ProfileOrders = () => {
  
  return (
    <div className={styles.profileMain}>
      <ProfileNavigation/>
      <OrderFeed/>
    </div>
  )
}

export default ProfileOrders;
