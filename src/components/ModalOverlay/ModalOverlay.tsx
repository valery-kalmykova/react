import React from 'react';
import modalOverlayStyle from './ModalOverlay.module.css';

interface ModalOverlayProps {  
  handleClose: () => void
}

const ModalOverlay: React.FC<ModalOverlayProps> = ({handleClose}) => {    
  
  return (
    <div className={modalOverlayStyle.backdrop} onClick={handleClose}></div>
  )
}

export default ModalOverlay;