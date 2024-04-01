import { useSelector } from 'react-redux';
import '../index.css';
import { useEffect, useState } from 'react';
import Student from '../Student/Student';
import { extractNewBooking } from '../../utils/helper';

const NewBookings = () => {
  const students = useSelector(state => state.students);
  const [NewBookings, setNewBookings] = useState([]);
  useEffect(()=>{
    if(students) setNewBookings(()=>extractNewBooking(students));
  },[students]);
  
  return NewBookings.length === 0 ?( <div className='feels-empty'>
        <h2 style={{margin:'5%',color:'#3e4152'}}>No new Booking in past 10 days</h2>
    </div>
  ):(
    <div>
       { NewBookings.map(student => {
          return <Student key={student.id} student={student}>
            <div style={{color:'green'}}>
              Joined {student.joined_days_past} days ago
            </div>
          </Student>
        })
        }
    </div>
  )
}

export default NewBookings