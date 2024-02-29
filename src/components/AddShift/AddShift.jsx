import ShiftForm from "../ShiftForm/ShiftForm";
import { useState } from "react";
import './AddShift.css';
import PlusIcon from '../../assets/plus-icon.svg';

const AddShift = (props) => {
    
    const [isModalOpen, setIsModelOpen] = useState(false);

    const handleOpenModal = ()=>{
        setIsModelOpen(true);
    }
    const handleCloseModal = (event)=>{
        event.preventDefault();
        setIsModelOpen(false);
    }
  return (
    <div className="addhall-container" >
          <img className="plus-img" title="add shift" src={PlusIcon} alt="add new hall"  onClick={handleOpenModal}/>
        <ShiftForm isOpen={isModalOpen} hall={props.hall} onClose={(event)=>handleCloseModal(event)}/>
    </div>
  )
}

export default AddShift