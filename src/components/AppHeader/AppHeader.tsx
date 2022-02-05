import React from 'react';
import appHeaderStyles from './AppHeader.module.css';
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'

const AppHeader = () => {   
  return (
    <header className={appHeaderStyles.header}>
      <div className={appHeaderStyles.headerContainer}>
        <nav className={appHeaderStyles.nav + ' mb-4 mt-4'}>
          <ul className={appHeaderStyles.navList}>
            <li className={appHeaderStyles.navItem + ' pr-5 pl-5 pt-4 pb-4 mr-2'}>
              <BurgerIcon type="primary" />
              <p className="text text_type_main-default ml-2">Конструктор</p>
            </li>
            <li className={appHeaderStyles.navItem + ' pr-5 pl-5 pt-4 pb-4'}>
              <ListIcon type="secondary" />
              <p className="text text_type_main-default ml-2 text_color_inactive">Лента заказов</p>
            </li>
          </ul>
        </nav>
        <div className={appHeaderStyles.logo}><Logo /></div>          
        <div className={appHeaderStyles.autorization + ' pr-5 pl-5 pt-4 pb-4 mb-4 mt-4'}>
          <ProfileIcon type="primary" />
          <p className="text text_type_main-default ml-2 text_color_inactive">Личный кабинет</p>
        </div>
      </div>
    </header>
  );  
}

export default AppHeader;