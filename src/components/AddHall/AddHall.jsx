import { useState } from 'react';
import hallServices from '../../services/hallServices';
import CrossIcon from '../../assets/cross-icon.svg';
import PlusIcon from '../../assets/plus-icon.svg';
import './AddHall.css';
import { useDispatch } from 'react-redux';
import { hallsThunk } from '../../store/hallSlice';
import { setErrorMessage, setSuccessMessage } from '../../store/notificationSlice';
import useLogoutUser from '../../hooks/useLogoutUser';

const AddHall = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const logoutUser = useLogoutUser();

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e.target.hallName.value);
    const hallName = e.target.hallName.value;
    e.target.hallName.value = '';
    setIsOpen(false);
    try {
      const response = await hallServices.Addhall(hallName);
      if (response.data.data.status === 'ok') {
        dispatch(setSuccessMessage(`${hallName} is added successfully!`))
      }
      dispatch(hallsThunk());
    } catch (error){
      console.log(error);
      if(error?.response?.status === 401){
        logoutUser();
        dispatch(setErrorMessage("Your session has expired. Please login again."));
      }else{
        dispatch(setErrorMessage(error.response.data.message));
      }
    }
  };

  return (
    <div className="add-hall-container">
      {!isOpen && (
        <button className="add-button" onClick={handleOpen}>
          Add Hall <img className="plus-icon" src={PlusIcon} alt="+" />
        </button>
      )}
      {isOpen && (
        <div className="addhall-form">
          <button className='close-btn' onClick={handleClose}>
            <img className="cross-icon" src={CrossIcon} alt="❌" />
          </button>
          <h3>Add Hall</h3>
          <form onSubmit={(e) => handleSubmit(e)}>
            <label htmlFor="hallName">Hall name</label>
            <input className="name-input" type="text" name="hallName" id="hallName" placeholder="Type hall name" required />
            <button className='submit-btn' type="submit">Add</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddHall;
