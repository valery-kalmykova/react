import React, { useState } from 'react';
import styles from './login.module.css';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components'


const Profile = () => {
  const [name, setName] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
    
  return (
    <div className={styles.profileMain}>
      <div className={styles.sideBlock + ' mr-15 pl-5'}>
        <ul className={styles.nav}>
          <li className={styles.navLink + ' text text_type_main-medium'}>Профиль</li>  
          <li className={styles.navLink + ' text text_type_main-medium text_color_inactive'}>История заказов</li> 
          <li className={styles.navLink + ' text text_type_main-medium text_color_inactive'}>Выход</li> 
        </ul>
        <p className='text text_type_main-default text_color_inactive mt-20'>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>           
      <ul className={styles.items}>
        <li className={styles.item + ' mb-6'}>
          <Input 
            value={name} 
            onChange={e => setName(e.target.value)}
            name={'name'}   
            type={'text'}
            placeholder={'Имя'}
            icon={'EditIcon'}                             
          />
        </li>
        <li className={styles.item + ' mb-6'}>
          <Input 
            value={login} 
            onChange={e => setLogin(e.target.value)}
            name={'login'}   
            type={'email'}
            placeholder={'Логин'}
            icon={'EditIcon'}                             
          />
        </li>
        <li className={styles.item + ' mb-6'}>
          <Input 
            value={password} 
            onChange={e => setPassword(e.target.value)}
            name={'password'}   
            type={'text'}
            placeholder={'Пароль'}
            icon={'EditIcon'}                               
          />
        </li>
      </ul>      
    </div>
  )
}

export default Profile
