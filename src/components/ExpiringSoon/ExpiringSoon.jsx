import { useSelector } from 'react-redux';
import '../index.css';
import { useEffect, useState } from 'react';
import Student from '../Student/Student';
import { extractExiringSoon } from '../../utils/helper';

const ExpiringSoon = () => {
  const [expiringSoon, setExpiringSoon] = useState([]);
  const students = useSelector(state => state.students);
  
  useEffect(() => {
    if (students) setExpiringSoon(() => extractExiringSoon(students));
  }, [students]);

  return (expiringSoon.length === 0?<div className='feels-empty'>
        <h2 style={{margin:'5%',color:'#3e4152'}}>No students expiring in next 4 days</h2>
      </div>:
    <div>
       { expiringSoon.map(student => {
          return <Student key={student.id} student={student}>
            <div style={{color:'red'}}>
              will expire in {student.daysLeft} days
            </div>
          </Student>
        })
        }
    </div>
  )
}

export default ExpiringSoon