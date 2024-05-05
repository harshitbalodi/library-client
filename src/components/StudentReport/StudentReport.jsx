/* eslint-disable react/prop-types */
import './StudentReport.css';
import { useEffect, useState } from "react";
import { extractExiringSoon, extractNewBooking } from "../../utils/helper";
import { setImageUrl } from '../../utils/helper';
import NoProfilePicture from '../../assets/no-dp.jpg'


const StudentReport = ({students, filteredStudents, setFilteredStudents}) => {
  const [currentButton, setCurrentButton] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 6;
 

  useEffect(() => {
    if (!students) return;
    if (currentButton === 'all') {
      setFilteredStudents(students);
    } else if (currentButton === 'new') {
      setFilteredStudents(() => extractNewBooking(students));
    } else if (currentButton === 'expired') {
      setFilteredStudents(() => students.filter(student => student.is_expired === true))
    } else if (currentButton === 'renewal') {
      setFilteredStudents(() => extractExiringSoon(students));
    }
    setCurrentPage(1);
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

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents?.slice(indexOfFirstStudent, indexOfLastStudent);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className='student-report'>
      <div className='student-report-search-btns'>
        <input
          type="text"
          placeholder="enter student name or  ID"
          className="student-report-search-input"
          onChange={(e) => setFilteredStudents(filteredStudents.filter(student => student.name.toLowerCase().includes(e.target.value.toLowerCase())))}
        />
        <div className='student-report-btn-container'>
          <button
            className={`student-report-btn ${currentButton === 'all' ? 'active' : ''}`}
            onClick={() => setCurrentButton('all')}>
            All
          </button>
          <button
            className={`student-report-btn ${currentButton === 'new' ? 'active' : ''}`}
            onClick={() => setCurrentButton('new')}>
            New
          </button>
          <button
            className={`student-report-btn ${currentButton === 'expired' ? 'active' : ''}`}
            onClick={() => setCurrentButton('expired')}>
            Expired
          </button>
          <button
            className={`student-report-btn ${currentButton === 'renewal' ? 'active' : ''}`}
            onClick={() => setCurrentButton('renewal')}>
            Renewal
          </button>
        </div>
      </div>

      {currentStudents && <table className='report-table'>
        <tbody>
          <tr className='report-table-headers'>
            <th>Student ID</th>
            <th>Student Name</th>
            <th>Student Image</th>
            <th>Subscription status</th>
            <th>member status</th>
          </tr>

          {currentStudents.map(student => {
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
      {/* Pagination */}
      {filteredStudents && (
        <ul className="pagination">
          {Array.from({ length: Math.ceil(filteredStudents.length / studentsPerPage) }).map((_, index) => (
            <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
              <button onClick={() => paginate(index + 1)} className={`page-link ${index + 1 === currentPage ? 'active' : ''}`}>
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default StudentReport