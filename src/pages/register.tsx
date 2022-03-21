import React, { useState } from 'react';
import styles from './login.module.css';
import { PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'


const Register = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  
  const onChangePassword = e => {
    setPassword(e.target.value)
  }

  return (
    <div className={styles.main}>
      <h2 className='text text_type_main-medium mb-6'>Регистрация</h2>
      <ul className={styles.items}>
      <li className={styles.item + ' mb-6'}>
          <Input 
            value={name} 
            onChange={e => setName(e.target.value)}
            name={'name'}   
            type={'text'}
            placeholder={'Имя'}               
          />
        </li>
        <li className={styles.item + ' mb-6'}>
          <Input 
            value={email} 
            onChange={e => setEmail(e.target.value)}
            name={'email'}   
            type={'email'}
            placeholder={'Email'}               
          />
        </li>
        <li className={styles.item + ' mb-6'}>
          <PasswordInput 
            value={password} 
            onChange={onChangePassword}
            name={'password'}
          />
        </li>
      </ul>
      <Button type="primary" size="medium">Зарегистрироваться</Button>
      <p className={styles.bottomText + ' text text_type_main-default text_color_inactive mt-20'}>
        Уже зарегистрированы?
          <Button type="secondary" size="medium">
            Войти
          </Button>
      </p>      
    </div>
  )
}

export default Register
