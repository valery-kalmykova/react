import React, { useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registerUser } from '../services/actions/user';
import styles from './login.module.css';
import { PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'


const Register = () => { 
  const [userData, setUserData] = useState({
    email: '',
    password: '',
    name: '',
  })
  const dispatch = useDispatch(); 

  const onChangePassword = e => {    
    setUserData({...userData, password: e.target.value})   
  }

  const history = useHistory();

  const login = useCallback(
    () => {
        history.replace({ pathname: '/login' });
    },
    [history]
  );

  const submitHandler = async () => {  
    await dispatch(registerUser(userData));
    history.replace({ pathname: '/' });
  };

  return (
    <div className={styles.main}>
      <h2 className='text text_type_main-medium mb-6'>Регистрация</h2>
      <ul className={styles.items}>
      <li className={styles.item + ' mb-6'}>
          <Input 
            value={userData.name} 
            onChange={e => setUserData({...userData, name: e.target.value})}
            name={'name'}   
            type={'text'}
            placeholder={'Имя'}               
          />
        </li>
        <li className={styles.item + ' mb-6'}>
          <Input 
            value={userData.email} 
            onChange={e => setUserData({...userData, email: e.target.value})}
            name={'email'}   
            type={'email'}
            placeholder={'Email'}               
          />
        </li>
        <li className={styles.item + ' mb-6'}>
          <PasswordInput 
            value={userData.password} 
            onChange={onChangePassword}
            name={'password'}
          />
        </li>
      </ul>
      <Button type="primary" size="medium" onClick={submitHandler}>Зарегистрироваться</Button>
      <p className={styles.bottomText + ' text text_type_main-default text_color_inactive mt-20'}>
        Уже зарегистрированы?          
          <Button type="secondary" size="medium" onClick={login}>Войти</Button>          
      </p>      
    </div>
  )
}

export default Register
