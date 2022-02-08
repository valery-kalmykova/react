import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import modalStyle from './Modal.module.css';
import ModalOverlay from '../ModalOverlay/ModalOverlay'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'


const Modal = ({title, children, handleClose}) => {
  useEffect(() => {
    const close = (e) => {
      if(e.key === 'Escape'){
        handleClose()
      }
    }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  },[])

  const domEl = document.getElementById('react-modals');
  if (!domEl) return null;
  
  return ReactDOM.createPortal(    
    (<div className={modalStyle.wrapper}>
      <ModalOverlay handleClose={handleClose}/>
      <div className={modalStyle.container + ' pt-10 pl-10 pr-10'}>
        <div className={modalStyle.titleContainer}>
          <p className='text text_type_main-large'>{title}</p>
          <button className={modalStyle.btnClose} onClick={handleClose}>
            <CloseIcon type="primary" />
          </button>
        </div>      
        {children}
      </div>
    </div>), domEl
  )
}

Modal.propTypes = {  
  children: PropTypes.element.isRequired,
  title: PropTypes.string,
  handleClose: PropTypes.func
}

export default Modal;