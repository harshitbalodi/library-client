import './StudentReport.css';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { extractExiringSoon, extractNewBooking } from "../../utils/helper";
import { setImageUrl } from '../../utils/helper';
import NoProfilePicture from '../../assets/no-dp.jpg'


const StudentReport = () => {
  const students = useSelector(state => state.students);
  const [currentButton, setCurrentButton] = useState('all');
  const [filteredStudents, setFilteredStudents] = useState(null);


  useEffect(() => {
    if (!students) return;
    if (currentButton === 'all') {
      setFilteredStudents(students);
    }
    if (currentButton === 'new') {
      setFilteredStudents(() => extractNewBooking(students));
    }
    if (currentButton === 'expired') {
      setFilteredStudents(() => students.filter(student => student.is_expired === true))
    }
    if (currentButton === 'renewal') {
      setFilteredStudents(() => extractExiringSoon(students));
    }
  }, [currentButton, students]);

  const findMemberStatus = (joiningDate) => {
    if (!joiningDate.match(/^\d{4}-\d{2}-\d{2}$/)) {
      console.error('Invalid joining date format. Please use YYYY-MM-DD.');
      return null;
    }
    const today = new Date().toISOString().slice(0, 10);
    const timeDifference = new Date(today) - new Date(joiningDate);
    const daysSinceJoining = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    return daysSinceJoining >= 30 ? 'Old Member' : 'New Member';
  }
  return (
    <div className='student-report'>
      StudentReport
      <button className={`student-report-btn ${currentButton=== 'all'?'active':''}`} onClick={() => setCurrentButton('all')}>All</button>
      <button className={`student-report-btn ${currentButton=== 'new'?'active':''}`} onClick={() => setCurrentButton('new')}>New</button>
      <button className={`student-report-btn ${currentButton=== 'expired'?'active':''}`} onClick={() => setCurrentButton('expired')}>Expired</button>
      <button className={`student-report-btn ${currentButton=== 'renewal'?'active':''}`} onClick={() => setCurrentButton('renewal')}>Renewal</button>
      {filteredStudents && <table className='report-table'>
        <tbody>
          <tr className='report-table-headers'>
            <th>Student ID</th>
            <th>Student Name</th>
            <th>Student Image</th>
            <th>Subscription status</th>
            <th>member status</th>
          </tr>

          {filteredStudents.map(student => {
            return <tr key={student.id}>
              <td className='student-id-member'>{student?.stu_id}</td>
              <td>{student.name}</td>
              <td className='student-img'>
                {student.image ?
                  <img src={setImageUrl(student.image)} alt="student dp" />
                  :
                  <img src={NoProfilePicture} alt="no dp"></img>
                }
              </td>
              <td className='student-status'>
                {
                  student.is_expired ?
                    <div className='expired'>Expired</div> :
                    <div className='active'>Active</div>
                }
              </td>
              <td>
                {findMemberStatus(student.joining_date)}
              </td>
            </tr>
          })
          }

        </tbody>
      </table>
      }
    </div>
  )
}

export default StudentReport