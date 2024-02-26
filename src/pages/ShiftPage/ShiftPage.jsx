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
    if (halls){  
      const hallstoShifts =extractShifts(halls);
      dispatch(setShifts(hallstoShifts));
      setFilteredShifts(hallstoShifts);
    }
  }, [halls,dispatch])

  const handleSort = (e) => {
    console.log(e.target.value);
    const order = e.target.value;
    if (order === 'default'){ 
      setFilteredShifts(shifts);
      return;
    }
    setFilteredShifts(() => sortShiftsByFee(filteredShifts, order));
  }


  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Start Time:', startTime);
    console.log('End Time:', endTime+":00");
    if(endTime < startTime) {
      toast.error('start time should be smaller than the end time'); 
      return;
    }
    console.log(startTime.toString() < "05:10:00")
    setFilteredShifts(()=>filterShiftsByTime(shifts,startTime.toString(),endTime.toString()))
  };

  const handleClear=()=>{
    setEndTime("");
    setStartTime("");
    setFilteredShifts(shifts);
  }
  return !halls ? <Shimmer /> : (
    <div className='shift-container'>
      <ToastContainer/>
      <div>
        <div>Choose your preferable time window</div>
        <form onSubmit={handleSearch}>
          <label htmlFor="start-time">From </label>
          <input
            type="time"
            id="start-time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />
          <label htmlFor="end-time">To </label>
          <input
            type="time"
            id="end-time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
          />
          <button type="submit">Find Timeslot</button>
          <button type='reset' onClick={handleClear}>clear</button>
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