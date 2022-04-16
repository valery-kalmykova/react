import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import appHeaderStyles from './AppHeader.module.css';
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'

const AppHeader = () => {   
  const history = useHistory();
  const location = useLocation();
  const activeConstructor = (location.pathname === '/');
  const activeOrders = (location.pathname.indexOf('/feed') === 0);
  const activeProfile = (location.pathname.indexOf('/profile') === 0);  

  return (
    <header className={appHeaderStyles.header}>
      <div className={appHeaderStyles.headerContainer}>
        <nav className={appHeaderStyles.nav + ' mb-4 mt-4'}>
          <ul className={appHeaderStyles.navList}>
            <li className={appHeaderStyles.navItem + ' pr-5 pl-5 pt-4 pb-4 mr-2'}>
              <button className={appHeaderStyles.autorization} onClick={() => history.replace({ pathname: '/' })}>
                <BurgerIcon type={activeConstructor ? "primary" :"secondary"} />
                <p className={
                  activeConstructor ? 
                  "text text_type_main-default ml-2" : 
                  "text text_type_main-default ml-2 text_color_inactive"
                  }>Конструктор</p>
              </button>              
            </li>
            <li className={appHeaderStyles.navItem + ' pr-5 pl-5 pt-4 pb-4'}>
              <button className={appHeaderStyles.autorization} onClick={() => history.replace({ pathname: '/feed' })}>
                <ListIcon type={activeOrders ? "primary" :"secondary"} />
                <p className={
                  activeOrders ? 
                  "text text_type_main-default ml-2" : 
                  "text text_type_main-default ml-2 text_color_inactive"
                  }>Лента заказов</p>
              </button>
            </li>
          </ul>
        </nav>
        <button className={appHeaderStyles.logo} onClick={() => history.replace({ pathname: '/' })}><Logo /></button>          
        <button className={appHeaderStyles.autorization + ' pr-5 pl-5 pt-4 pb-4 mb-4 mt-4'} onClick={() => history.replace({ pathname: '/profile' })}>
          <ProfileIcon type={activeProfile ? "primary" :"secondary"} />          
            <p className={
                activeProfile ? 
                "text text_type_main-default ml-2" : 
                "text text_type_main-default ml-2 text_color_inactive"
                }>Личный кабинет</p>          
        </button>
      </div>
    </header>
  );  
}

export default AppHeader;