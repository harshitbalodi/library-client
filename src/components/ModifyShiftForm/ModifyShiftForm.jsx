import './ModifyShiftform.css';
import CrossIcon from '../../assets/cross-icon.svg';
import shiftServices from '../../services/shiftServices';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { hallsThunk } from '../../store/hallSlice';
import { useState } from 'react';

const ModifyShiftForm = ({ shift, setIsOpen }) => {
  const [shiftName, setShiftName] = useState(shift.name || '');
  const [capacity, setCapacity] = useState(shift.capacity || 0);
  const [shiftfee, setShiftfee] = useState(shift.fee || 0);
  const [endTime, setEndTime] = useState(shift.end_time || "00:00:00");
  const [startTime, setStartTime] = useState(shift.start_time || "00:00:00");

  const dispatch = useDispatch();
  console.log(shift);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(capacity, shiftName, startTime, endTime);
    const shiftObj = {
      name: shiftName,
      capacity: Number(capacity),
      start_time: startTime,
      end_time: endTime,
      fee: Number(shiftfee),
    }
    try {
      const response = await shiftServices.updateShift(shift.id, shiftObj);
      console.log(response);
      toast.success(response.data.data.message);
      dispatch(hallsThunk());
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
    setIsOpen(false);
  };

  return (
    <div className="edit-form-container">
      <img title='close' className="cross-icon" src={CrossIcon} alt="❌" onClick={() => setIsOpen(false)} />
      <h3>Edit Shift</h3>
      <form className="updation-Form" onSubmit={(e) => handleSubmit(e)}>
        <div>
          <div>
            <label htmlFor="name"> Shift name</label>
            <input type="text" id='name' value={shiftName} onChange={(e) => setShiftName(e.target.value)} required />
          </div>
          <div>
            <label htmlFor="start-time"> start Time</label>
            <input type="time" id='start-time' value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
          </div>
          <div>
            <label htmlFor="end-time"> End Time</label>
            <input type="time" id='end-time' value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
          </div>
          <div>
            <label htmlFor="capacity"> Capacity</label>
            <input type="number" id='capacity' value={capacity} onChange={(e) => setCapacity(e.target.value)} required />
          </div>
          <div>
            <label htmlFor="fee"> Fee</label>
            <input type="number" id='fee' value={shiftfee} onChange={(e) => setShiftfee(e.target.value)} required />
          </div>
          <button className='submit-btn'>Update</button>
        </div>
      </form>
    </div>
  );
};

export default ModifyShiftForm;
