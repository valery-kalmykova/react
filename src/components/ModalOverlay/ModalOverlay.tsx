import React from 'react';
import modalOverlayStyle from './ModalOverlay.module.css';


const ModalOverlay = ({handleClose}) => {    
  
  return (
    <div className={modalOverlayStyle.backdrop} onClick={handleClose}></div>
  )
}

export default ModalOverlay;