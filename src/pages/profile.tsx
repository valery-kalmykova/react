import React, { useState, useCallback, useRef, SyntheticEvent } from 'react';
import { useDispatch, useSelector } from '../services/hooks/hooks';
import styles from './pages.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { changeUser } from '../services/actions/user';
import { mailformat  } from '../utils/constants';
import ProfileNavigation from '../components/ProfileNavigation/ProfileNavigation'

const Profile = () => {
  const dispatch = useDispatch();    
  const name = useSelector(state => state.user.user.name);
  const email = useSelector(state => state.user.user.email);  
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [newUserData, setNewUserData] = useState({
    name: name,
    email: email,
    password: 'Новый пароль'
  });
  const [disabled, setDisabled] = useState({
    name: false,
    email: false,
    password: false    
  });
  const [isChanged, setIsChanged] = useState({
    name: false,
    email: false,
    password: false
  })
  const [hasError, setHasError] = useState({
    name: false,
    email: false,
    password: false 
  });
  const disabledSubmit = (newUserData.email === '' || 
    newUserData.password === '' || 
    newUserData.name === '' ||
    hasError.email || 
    hasError.password ||
    hasError.name
  )
  const activeButtons = (
    isChanged.name || isChanged.email || isChanged.password
  )
  
  const submitHandler = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (disabledSubmit) return
    await dispatch(changeUser(newUserData));
    setDisabled({
      ...disabled,
      name: false,
      email: false,
      password: false
    });
    setIsChanged ({
      ...isChanged,
      name: false,
      email: false,
      password: false
    })
  }    

  const cancelHandler = useCallback(
    () => {
        setNewUserData({
          ...newUserData,
          name: name,
          email: email,
          password: 'Новый пароль'
        });
        setDisabled({
          ...disabled,
          name: false,
          email: false,
          password: false
        });
        setHasError ({
          ...hasError,
          name: false,
          email: false,
          password: false
        });
        setIsChanged ({
          ...isChanged,
          name: false,
          email: false,
          password: false
        })
    },
    [newUserData, disabled, name, email, hasError, isChanged]
  );
   
  return (
    <div className={styles.profileMain}>
      <ProfileNavigation/>
      <div>
        <form className={styles.items} onSubmit={submitHandler}>
          <div className={styles.item + ' mb-6'}>
            <Input 
              value={newUserData.name}              
              onChange={e =>{
                setNewUserData({...newUserData, name: e.target.value});
                setIsChanged({...isChanged, name: true});
              }}
              name={'name'}   
              type={'text'}              
              placeholder={'Имя'}
              icon={'EditIcon'}
              disabled={disabled.name ? false : true}              
              onIconClick={()=>setDisabled({...disabled, name: !disabled.name})} 
              error={hasError.name}
              errorText={'Ошибка'}                        
            />
          </div>
          <div className={styles.item + ' mb-6'}>
            <Input 
              value={newUserData.email} 
              onChange={e => {
                setNewUserData({...newUserData, email: e.target.value});
                setIsChanged({...isChanged, email: true});
                if (emailRef.current && !emailRef.current.value.match(mailformat)) {
                  setHasError({...hasError, email: true})
                } else {
                  setHasError({...hasError, email: false})
                }
              }}
              name={'login'}   
              type={'email'}
              placeholder={'Логин'}
              icon={'EditIcon'}
              disabled={disabled.email ? false : true}
              onIconClick={()=>setDisabled({...disabled, email: !disabled.email})}
              error={hasError.email}
              errorText={'Введите корректный e-mail'} 
              ref={emailRef}                             
            />
          </div>
          <div className={styles.item + ' mb-6'}>
            <Input 
              value={newUserData.password} 
              onChange={e => {
                setNewUserData({...newUserData, password: e.target.value});
                setIsChanged({...isChanged, password: true});
                if (passwordRef.current && passwordRef.current.value.length < 5) {
                  setHasError({...hasError, password: true})                
                } else {
                  setHasError({...hasError, password: false})
                }
              }}
              name={'password'}   
              type={disabled.password ? 'text': 'password'}
              placeholder={'Пароль'}
              icon={'EditIcon'}   
              disabled={disabled.password ? false : true}
              onIconClick={()=>setDisabled({...disabled, password: !disabled.password})}
              error={hasError.password}
              errorText={'Пароль должен содержать не менее 5 символов'}
              ref={passwordRef}
            />
          </div>
          {activeButtons && <div className={styles.buttons + ' mt-10'}>
          <Button type="primary" size="medium" disabled={disabledSubmit}>Сохранить</Button>
          <Button type="primary" size="medium" onClick={cancelHandler}>Отмена</Button>
        </div>}
        </form>
        
      </div>
    </div>
  )
}

export default Profile
