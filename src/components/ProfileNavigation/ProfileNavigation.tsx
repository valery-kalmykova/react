import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/hooks/hooks';
import styles from './ProfileNavigation.module.css';
import { logoutUser } from '../../services/actions/user';

const ProfileNavigation = () => {
  const dispatch = useDispatch();  
  const history = useHistory();
  const location = useLocation();
  const activeProfile = (location.pathname === '/profile');
  const activeOrders = (location.pathname === '/profile/orders');  
  const logoutSuccess = useSelector(state => state.user.logoutSuccess);    
  
  const logout = async () => {  
    await dispatch(logoutUser());
    if (logoutSuccess) {
      history.replace({ pathname: '/login' });
    }    
  };
  
  return (   
    <div className={styles.sideBlock + ' mr-15 pl-5'}>
      <ul className={styles.nav}>
        <li className={styles.navLink}>
          <button 
            className={styles.link + ' text text_type_main-medium text_color_inactive pt-3 pb-3'}
            style={activeProfile ? {color: 'var(--text-primary-color)'} : undefined}
            onClick={() => history.replace({ pathname: '/profile' })}
          >Профиль</button>
        </li>  
        <li className={styles.navLink}>
          <button 
            className={styles.link + ' text text_type_main-medium text_color_inactive pt-3 pb-3'}
            style={activeOrders ? {color: 'var(--text-primary-color)'} : undefined}
            onClick={() => history.replace({ pathname: '/profile/orders' })}
          >История заказов</button>          
        </li> 
        <li className={styles.navLink}>    
          <button className={styles.link + 
            ' text text_type_main-medium text_color_inactive pt-3 pb-3'} 
            onClick={logout}>Выход</button>          
        </li> 
      </ul>
      <p className='text text_type_main-default text_color_inactive mt-20'>
        В этом разделе вы можете изменить свои персональные данные
      </p>
    </div>
  )
}

export default ProfileNavigation;
