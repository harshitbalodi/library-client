import './ModifyShiftform.css'
import CrossIcon from '../../assets/cross-icon.svg';
// import { useState } from 'react';

const ModifyShiftForm = ({ isOpen, shift, onClose }) => {
    console.log(shift);
  return (
    <div className={`modal-overlay ${isOpen ? 'active' : ''}`} onClick={onClose}>
      <div className={`modal-content ${isOpen ? 'active' : ''}`} onClick={(e) => e.stopPropagation()}>
        <img src={CrossIcon} onClick={onClose} />
        <h2>Modify Shift</h2>
        <form className="form" >
          
          <button>Modify</button>
        </form>
      </div>
    </div>
  );
};

export default ModifyShiftForm;
