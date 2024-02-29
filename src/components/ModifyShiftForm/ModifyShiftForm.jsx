import './ModifyShiftform.css';
import CrossIcon from '../../assets/cross-icon.svg';
import shiftServices from '../../services/shiftServices';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setHallsThunk } from '../../store/hallSlice';

const ModifyShiftForm = ({ shift, setIsOpen }) => {
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const capacity = e.target.capacity.value;
    console.log(capacity);
    console.log(shift.id);
    try{
       const response = await shiftServices.updateShift(shift.id,{capacity:Number(capacity)});
       console.log(response);
       toast.success(response.data.data.message);
    }catch(error){
      console.log(error);
      toast.error(error.message);
    }
    dispatch(setHallsThunk());
    setIsOpen(false);
  };

  return (
    <div className="edit-form-container">
      <img title='close' className="cross-icon" src={CrossIcon} alt="❌" onClick={() => setIsOpen(false)} />
      <h3>Update Capacity</h3>
      <form className="updation-Form" onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label htmlFor="capacity"> Capacity</label>
          <input type="number" id='capacity' name='capacity' required />
          <button className='submit-btn'>Update</button>
        </div>
      </form>
    </div>
  );
};

export default ModifyShiftForm;
