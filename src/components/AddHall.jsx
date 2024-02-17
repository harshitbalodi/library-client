import FormModal from "./FormModal";
import { useState } from "react";
import './index.css';

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
        <button onClick={handleOpenModal}><img className="plus-img" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Plus_symbol.svg/500px-Plus_symbol.svg.png" alt="add new hall" /></button>
        <FormModal isOpen={isModalOpen} onClose={(event)=>handleCloseModal(event)}/>
    </div>
  )
}

export default AddHall