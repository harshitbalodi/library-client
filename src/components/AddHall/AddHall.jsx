import FormModal from "../FormModal";
import { useState } from "react";
import './AddHall.css';
import PlusIcon from '../../assets/plus-icon.svg';

const AddHall = () => {
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
        {/* <button > */}
          <img className="plus-img" src={PlusIcon} alt="add new hall"  onClick={handleOpenModal}/>
        {/* </button> */}
        <FormModal isOpen={isModalOpen} onClose={(event)=>handleCloseModal(event)}/>
    </div>
  )
}

export default AddHall