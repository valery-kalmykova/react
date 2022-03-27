import React, { useState, useCallback } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../services/actions/user';
import styles from './login.module.css';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'

const Login = () => {
  const [userData, setUserData] = useState({
    email: '',
    password: '',    
  })
  const dispatch = useDispatch();
  const history = useHistory();

  const submitHandler = async () => {  
    await dispatch(loginUser(userData));
    history.replace({ pathname: '/' });
  };

  const register = useCallback(
    () => {
        history.replace({ pathname: '/register' });
    },
    [history]
  );

  const forgotPassword = useCallback(
    () => {
        history.replace({ pathname: '/forgot-password' });
    },
    [history]
  );
  
  const onChangePassword = e => {
    setUserData({...userData, password: e.target.value})
  }

  const isUserLoaded = localStorage.getItem('accessToken');
  if(isUserLoaded) {
    return(
      <Redirect
        to={{
          pathname: '/'
        }}
      />
    )
  }

  return (
    <div className={styles.main}>
      <h2 className='text text_type_main-medium mb-6'>Вход</h2>
      <ul className={styles.items}>
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
      <Button type="primary" size="medium" onClick={submitHandler}>Войти</Button>
      <p className={styles.bottomText + ' text text_type_main-default text_color_inactive mt-20'}>
        Вы - новый пользователь?          
          <Button type="secondary" size="medium" onClick={register}>Зарегистрироваться</Button>          
      </p>
      <p className={styles.bottomText + ' text text_type_main-default text_color_inactive mt-4'}>
        Забыли пароль?          
          <Button type="secondary" size="medium" onClick={forgotPassword}>Восстановить пароль</Button>          
      </p>
    </div>
  )
}

export default Login
