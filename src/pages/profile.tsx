import React, { useState, useCallback, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './login.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { getUser, changeUser, logoutUser } from '../services/actions/user';
import { Loader } from '../ui/Loader/Loader'

interface RootState {
  user: {
    user: {
      name: string,
      email: string
    },
    getRequest: boolean
  }
}

const Profile = () => {
  const dispatch = useDispatch(); 
  const history = useHistory();
  const name = useSelector((state:RootState) => state.user.user.name);
  const login = useSelector((state:RootState) => state.user.user.email);
  const isLoading = useSelector((state:RootState) => state.user.getRequest);
  const [newUserData, setNewUserData] = useState({
    name: '',
    email: '',
    password: 'Новый пароль'
  });

  const [disabled, setDisabled] = useState({
    name: false,
    login: false,
    password: false
  });

  // const init = async() => {
  //   await dispatch(getUser());    
  //   setNewUserData({
  //     ...newUserData,
  //     name: name,
  //     email: login
  //   })
  // }
  // useEffect(
  //   () => {
  //     init()
  //   },
  //   []
  // );

  const submitHandler = useCallback(
    () => {
      dispatch(changeUser(newUserData));
      setDisabled({
        ...disabled,
        name: false,
        login: false,
        password: false
      })
    },
    [dispatch, newUserData, disabled]
  );

  const cancelHandler = useCallback(
    () => {
        setNewUserData({
          ...newUserData,
          name: name,
          email: login,
          password: 'Новый пароль'
        });
        setDisabled({
          ...disabled,
          name: false,
          login: false,
          password: false
        })
    },
    [newUserData, disabled, name, login]
  );

  const logout = async () => {  
    await dispatch(logoutUser());
    history.replace({ pathname: '/login' });
  };

    
  return (
    <div className={styles.profileMain}>
      <div className={styles.sideBlock + ' mr-15 pl-5'}>
        <ul className={styles.nav}>
          <li className={styles.navLink + ' text text_type_main-medium'}>
            <NavLink 
              to={{ pathname: `/profile` }}
              className={styles.link}
              activeClassName={styles.activeLink}
            >Профиль</NavLink>
          </li>  
          <li className={styles.navLink + ' text text_type_main-medium'}>
            <NavLink 
              to={{ pathname: `/404` }}
              className={styles.link}            
            >История заказов</NavLink>            
          </li> 
          <li className={styles.navLink}>    
            <button onClick={logout} className={styles.logoutBtn  + ' text text_type_main-medium text_color_inactive'}>Выход</button>
          </li> 
        </ul>
        <p className='text text_type_main-default text_color_inactive mt-20'>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
      {isLoading ? <Loader size="large" inverse={true}/> : <div>
        <ul className={styles.items}>
          <li className={styles.item + ' mb-6'}>
            <Input 
              value={newUserData.name}              
              onChange={e =>setNewUserData({...newUserData, name: e.target.value})}
              name={'name'}   
              type={'text'}
              placeholder={'Имя'}
              icon={'EditIcon'}
              disabled={disabled.name ? false : true}              
              onIconClick={()=>setDisabled({...disabled, name: !disabled.name})}                         
            />
          </li>
          <li className={styles.item + ' mb-6'}>
            <Input 
              value={newUserData.email} 
              onChange={e => setNewUserData({...newUserData, email: e.target.value})}
              name={'login'}   
              type={'email'}
              placeholder={'Логин'}
              icon={'EditIcon'}
              disabled={disabled.login ? false : true}
              onIconClick={()=>setDisabled({...disabled, login: !disabled.login})}                               
            />
          </li>
          <li className={styles.item + ' mb-6'}>
            <Input 
              value={newUserData.password} 
              onChange={e => setNewUserData({...newUserData, password: e.target.value})}
              name={'password'}   
              type={disabled.password ? 'text': 'password'}
              placeholder={'Пароль'}
              icon={'EditIcon'}   
              disabled={disabled.password ? false : true}
              onIconClick={()=>setDisabled({...disabled, password: !disabled.password})}                              
            />
          </li>
        </ul>
        <div className={styles.buttons + ' mt-10'}>
          <Button type="primary" size="medium" onClick={submitHandler}>Сохранить</Button>
          <Button type="primary" size="medium" onClick={cancelHandler}>Отмена</Button>
        </div>
      </div>}
    </div>
  )
}

export default Profile
