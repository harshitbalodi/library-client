import ShiftForm from "../ShiftForm/ShiftForm";
import { useState } from "react";
import './AddShift.css';
import PlusIcon from '../../assets/plus-icon.svg';

const AddShift = ({hallName}) => {
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
          <img className="plus-img" src={PlusIcon} alt="add new hall"  onClick={handleOpenModal}/>
        <ShiftForm isOpen={isModalOpen} onClose={(event)=>handleCloseModal(event)}/>
    </div>
  )
}

export default AddShift