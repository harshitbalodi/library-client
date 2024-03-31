import { useSelector } from 'react-redux';
import './ExpiringSoon.css';
import { useEffect, useState } from 'react';
import Student from '../Student/Student';
import { extractExiringSoon } from '../../utils/helper';

const ExpiringSoon = () => {
  const [expiringSoon, setExpiringSoon] = useState([]);
  const students = useSelector(state => state.students);
  
  useEffect(() => {
    if (students) setExpiringSoon(() => extractExiringSoon(students));
  }, [students]);

  return (expiringSoon.length === 0?<div className='empty-expiring-soon'>
        <h2 style={{margin:'5%',color:'#3e4152'}}>No students expiring soon</h2>
      </div>:
    <div>
       { expiringSoon.map(student => {
          return <Student key={student.id} student={student}>
            <div className='red-text'>
              will expire in {student.daysLeft} days
            </div>
          </Student>
        })
        }
    </div>
  )
}

export default ExpiringSoon