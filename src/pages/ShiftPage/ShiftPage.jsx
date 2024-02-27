import { useDispatch, useSelector } from 'react-redux';
import SeatCard from '../../components/SeatCard/SeatCard';
import AddShift from '../../components/AddShift/AddShift';
import Shimmer from '../../components/Shimmer/Shimmer';
import './ShiftPage.css';
import { useEffect, useState } from 'react';
import { extractShifts, filterShiftsByTime, sortShiftsByFee } from '../../utils/helper';
import { setShifts } from '../../store/shiftSlice';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const ShiftPage = () => {
  const halls = useSelector(state => state.halls);
  const shifts = useSelector(state => state.shifts);
  const dispatch = useDispatch();
  const [filteredShifts, setFilteredShifts] = useState([]);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');


  useEffect(() => {
    if (halls) {
      const hallstoShifts = extractShifts(halls);
      dispatch(setShifts(hallstoShifts));
      setFilteredShifts(hallstoShifts);
    }
  }, [halls, dispatch])

  const handleSort = (e) => {
    console.log(e.target.value);
    const order = e.target.value;
    if (order === 'default') {
      setFilteredShifts(shifts);
      return;
    }
    setFilteredShifts(() => sortShiftsByFee(filteredShifts, order));
  }


  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Start Time:', startTime);
    console.log('End Time:', endTime + ":00");
    if (endTime < startTime) {
      toast.error('start time should be smaller than the end time');
      return;
    }
    console.log(startTime.toString() < "05:10:00")
    setFilteredShifts(() => filterShiftsByTime(shifts, startTime.toString(), endTime.toString()))
  };

  const handleClear = () => {
    setEndTime("");
    setStartTime("");
    setFilteredShifts(shifts);
  }
  return !halls ? <Shimmer /> : (
    <div >
      <ToastContainer className='shift-container'/>
      <div className='filter-container'>
        <div className='time-filter'>
          <div className='time-filter-heading'>Choose your preferable time window</div>

          <form className="time-filter-form" onSubmit={handleSearch}>
            <div className="time-filter-inputs">
              <label htmlFor="start-time"> From </label>
              <input type="time" id="start-time" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
              <label htmlFor="end-time">To </label>
              <input type="time" id="end-time" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
            </div>
            <div className="time-filter-buttons">
              <button type="submit" className="red-button">Find Timeslot</button>
              <button type='reset' className="red-button" onClick={handleClear}>clear</button>
            </div>
          </form>
        </div>
        <div className='sorting-options'>
          <label htmlFor="fees">Sort by:</label>
          <select name="fees" id="fees" onChange={(e) => handleSort(e)}>
            <option value="default">default</option>
            <option value="desc">High to Low</option>
            <option value="asc">Low to high</option>
          </select>
        </div>
      </div>

      <div className="booking-container">
        {
          filteredShifts.map(shift => {
            return <SeatCard key={shift.id} shift={shift} />
          })
        }
        <AddShift />
      </div>
    </div>
  )
}

export default ShiftPage