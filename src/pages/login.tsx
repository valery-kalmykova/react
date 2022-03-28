import React, { useState, useCallback, useRef } from 'react';
import { useHistory, Redirect, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../services/actions/user';
import styles from './login.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { mailformat } from '../utils/constants';

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { state } = useLocation();
  const [userData, setUserData] = useState({
    email: '',
    password: '',    
  })
  const [hasError, setHasError] = useState({
    email: false,
    password: false, 
  });
  const [passwordShow, setPasswordShow] = useState(false);   
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const disabled = userData.email === '' || userData.password === '' || hasError.email || hasError.password
  
  const onIconClick = () => {
    setPasswordShow(!passwordShow)
  }

  const submitHandler = async () => { 
    console.log(userData) 
    await dispatch(loginUser(userData)); 
    history.replace({ pathname: state?.from || '/' });
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
  
  // const isUserLoaded = localStorage.getItem('accessToken');
  // if(isUserLoaded) {
  //   return(
  //     <Redirect to={ state?.from || '/' }/>
  //   )
  // }

  return (
    <div className={styles.main}>
      <h2 className='text text_type_main-medium mb-6'>Вход</h2>
      <form className={styles.items}>
        <div className={styles.item + ' mb-6'}>
          <Input 
            value={userData.email} 
            onChange={e => {
              setUserData({...userData, email: e.target.value})
              if (emailRef.current && !emailRef.current.value.match(mailformat)) {
                setHasError({...hasError, email: true})
              } else {
                setHasError({...hasError, email: false})
              }
            }}
            name={'email'}   
            type={'email'}
            placeholder={'Email'}
            error={hasError.email}
            errorText={'Введите корректный e-mail'}
            ref={emailRef}                         
          />
        </div>
        <div className={styles.item + ' mb-6'}>          
          <Input 
            value={userData.password} 
            onChange={e => {
              setUserData({...userData, password: e.target.value});              
              if (passwordRef.current && passwordRef.current.value.length < 5) {
                setHasError({...hasError, password: true})                
              } else {
                setHasError({...hasError, password: false})
              }
            }}
            name={'password'} 
            placeholder={'Пароль'}
            type={passwordShow ? 'text': 'password'}
            icon={passwordShow ? 'HideIcon' : 'ShowIcon'}              
            onIconClick={onIconClick}
            error={hasError.password}
            errorText={'Ошибка'}
            ref={passwordRef}                            
          />
        </div>
      </form>
      <Button type="primary" size="medium" onClick={submitHandler} disabled={disabled}>Войти</Button>
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
