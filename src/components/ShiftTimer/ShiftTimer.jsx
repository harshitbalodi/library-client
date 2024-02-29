import { useSelector } from 'react-redux';
import './ShiftTimer.css';
import { useEffect, useState } from 'react';
import { clubShiftsByTime, getRemainingShiftTime } from '../../utils/helper';
import DisplayTime from './DisplayTime';
import { v4 as uuidv4 } from 'uuid';

const ShiftTimer = () => {
  const shifts = useSelector(state => state.shifts);
  const [shiftsWithSameTimings, setShiftsWithSameTimings] = useState(null);
  const [shiftsTimer, setShiftsTimer] = useState(null);
  useEffect(() => {
    if(!shifts) return;
    const clubShifts = clubShiftsByTime(shifts);
    setShiftsWithSameTimings(clubShifts);
  }, [shifts])

  useEffect(() => {
    if (!shiftsWithSameTimings) return;
    const displayTimeRemaining = () => {
      const timeRemaining = [];
      shiftsWithSameTimings.forEach(sameTimeShifts => {
        const temp = getRemainingShiftTime(sameTimeShifts);
        timeRemaining.push(temp);
      });
      const sortedTimeRemainig = timeRemaining.sort((a, b) => {
        if (a.value === b.value) return 0;
        else if (a.value > b.value) return -1;
        else return 1;
      })
      setShiftsTimer(sortedTimeRemainig);
    }
    displayTimeRemaining();
    const timer = setInterval(() => displayTimeRemaining(), 1000);
    return () => clearInterval(timer);
  }, [shiftsWithSameTimings]);

  return (
    <div>
      Shift Timer
      <hr />
      <div className='timer-container'>
      {
        shiftsTimer && shiftsTimer.map(shifts=>{
          return <DisplayTime key={uuidv4()} shifts={shifts}/>
        })
      }
      </div>

    </div>
  )
}

export default ShiftTimer