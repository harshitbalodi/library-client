/* eslint-disable react/prop-types */
import './StudentReport.css';
import { useEffect, useState } from "react";
import { extractExiringSoon, extractNewBooking } from "../../utils/helper";
import { setImageUrl } from '../../utils/helper';
import NoProfilePicture from '../../assets/no-dp.jpg'
// import Pagination from '../Pagination/Pagination';
import { Pagination, ConfigProvider } from 'antd';


const StudentReport = ({ students, filteredStudents, setFilteredStudents }) => {
  const [currentButton, setCurrentButton] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const studentsPerPage = 6;

  useEffect(() => {
    if (!students) return;
    if (searchQuery) {
      var tempStudents = [];
      if (currentButton === 'all') {
        tempStudents = students;
      } else if (currentButton === 'new') {
        tempStudents = extractNewBooking(students);
      } else if (currentButton === 'expired') {
        tempStudents = students.filter(student => student.is_expired === true)
      } else if (currentButton === 'renewal') {
        tempStudents = extractExiringSoon(students);
      }
      setFilteredStudents(() => tempStudents.filter((student) => {
        const normalizedSearchQuery = searchQuery.toLowerCase().trim();
        const studentName = student?.name?.toLowerCase();
        if (studentName && studentName.includes(normalizedSearchQuery)) {
          return true;
        }
        const studentId = typeof student.stu_id === 'number' ? student.stu_id.toString() : student.stu_id?.toLowerCase();
        if (studentId && studentId.includes(normalizedSearchQuery)) {
          return true;
        }
        return false;
      })
      )
    } else {
      if (currentButton === 'all') {
        setFilteredStudents(students);
      } else if (currentButton === 'new') {
        setFilteredStudents(() => extractNewBooking(students));
      } else if (currentButton === 'expired') {
        setFilteredStudents(() => students.filter(student => student.is_expired === true))
      } else if (currentButton === 'renewal') {
        setFilteredStudents(() => extractExiringSoon(students));
      }
    }
    setCurrentPage(1);
  }, [currentButton, students, searchQuery]);

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents?.slice(indexOfFirstStudent, indexOfLastStudent);


  return (
    <div className='student-report'>
      <div className='student-report-search-btns-container'>
        <input
          type="text"
          placeholder="enter student name or student ID"
          className="student-report-search-input"
          onChange={(e) => setSearchQuery(e.target.value)}
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
            <th>Shift</th>
            <th>seat No</th>
            <th>Subscription status</th>
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
              <td>
                {student.hall.shift.name}
              </td>
              <td>
                {student.hall.shift.desk}
              </td>
              <td className='student-status'>
                {
                  student.is_expired ?
                    <div className='expired'>Expired</div> :
                    <div className='active'>Active</div>
                }
              </td>

            </tr>
          })
          }

        </tbody>
      </table>
      }

      {
        filteredStudents && <ConfigProvider
        theme={{
          token: {
            colorBgTextActive: '#fff',
            colorText: '#1c268b',
          }
        }}
      >
        <Pagination
          className="pagination"
          defaultCurrent={1}
          total={filteredStudents.length}
          pageSize={studentsPerPage}
          onChange={(page) => setCurrentPage(page)}
        />
      </ConfigProvider>
      }

    </div>
  )
}

export default StudentReport




//AntD Pagination
// {
//  currentStudents && <Pagination 
//  defaultCurrent={1} 
//  total={ Math.ceil(filteredStudents.length / studentsPerPage) }
//  onChange={(page) => setCurrentPage(page)}
//  />
// }


// const currentTableData = () => useMemo(()=>{
//   if(filteredStudents){
//      const firstPageIndex = (currentPage - 1) * studentsPerPage;
//   const lastPageIndex = firstPageIndex + studentsPerPage;
//   return filteredStudents.slice(firstPageIndex, lastPageIndex);
//   }else return [];
// },[currentPage, students]);

{/* Pagination */ }
{/* {filteredStudents && (
        <ul className="pagination">
          {Array.from({ length: Math.ceil(filteredStudents.length / studentsPerPage) }).map((_, index) => (
            <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
              <button onClick={() => paginate(index + 1)} className={`page-link ${index + 1 === currentPage ? 'active' : ''}`}>
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      )} */}

// {filteredStudents && (
//   <ul className="pagination">
//     <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
//       <button
//         onClick={() => setCurrentButton(currentPage - 1)}
//         className={`page-link ${currentPage === 1 ? 'disabled' : ''}`}
//         disabled={currentPage === 1}
//       >
//         &laquo;
//       </button>
//     </li>

//     {Array.from({ length: Math.ceil(filteredStudents.length / studentsPerPage) })
//       .slice(
//         Math.max(0, currentPage - Math.floor((5 - 1) / 2)), // Start index
//         Math.min(
//           Math.ceil(filteredStudents.length / studentsPerPage),
//           currentPage + Math.floor((5 - 1) / 2) + 1
//         )
//       )
//       .map((_, index) => (
//         <li
//           key={index}
//           className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
//         >
//           <button
//             onClick={() => setCurrentPage(index + 1)}
//             className={`page-link ${currentPage === index + 1 ? 'active' : ''}`}
//           >
//             {index + 1}
//           </button>
//         </li>
//       ))}

//     <li className={`page-item ${currentPage === Math.ceil(filteredStudents.length / studentsPerPage) ? 'disabled' : ''}`}>
//       <button
//         onClick={() => setCurrentPage(currentPage + 1)}
//         className={`page-link ${currentPage === Math.ceil(filteredStudents.length / studentsPerPage) ? 'disabled' : ''}`}
//         disabled={currentPage === Math.ceil(filteredStudents.length / studentsPerPage)}
//       >
//         &raquo;
//       </button>
//     </li>
//   </ul>
// )}

