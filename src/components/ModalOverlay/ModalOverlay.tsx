import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import modalOverlayStyle from './ModalOverlay.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'


const ModalOverlay = props => {
  const [isVisible, setIsVisible] = useState(true)  
  
  const hide = () => setIsVisible(false)

  const domEl = document.getElementById('react-modals');
  if (!domEl) return null;
  
  return ReactDOM.createPortal(
    (isVisible && 
    <div className={modalOverlayStyle.wrapper}>
      <div className={modalOverlayStyle.backdrop} onClick={hide}></div>
      <div className={modalOverlayStyle.container}>
        <button className={modalOverlayStyle.btnClose} onClick={hide}>
          <CloseIcon type="primary" />
        </button>
        {props.children}
      </div>      
    </div>),
    domEl
  )
}

ModalOverlay.propTypes = {  
  children: PropTypes.object.isRequired
}

export default ModalOverlay;