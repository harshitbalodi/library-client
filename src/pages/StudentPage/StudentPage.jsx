import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import NoDp from '../../assets/no-dp.jpg'
import './StudentPage.css'

const StudentPage = () => {
  const id = useParams().id;
  const student = useSelector(state => {
    return state.students.filter(student => Number(id) === Number(student.id))[0];
  })
  console.log(student)
  return !student ? <div>
    no such student exist
  </div> : (
    <div className="student-container" >
      <div className="student-detail">
        <div className="student-data-section">
          <div>Student Name:{student.name}</div>
          <div>Joining Date:{student.joining_date}</div>
          <div>Fee Status: {student.paid ? <>Paid</> : <>Not Paid</>}</div>
          <h1>Shift Details</h1>
          <div>Shift name: {student.shift.name}</div>
          <div>Start time: {student.shift.start_time}</div>
          <div>End time: {student.shift.end_time}</div>
          <div>Fee: {student.shift.fee}</div>
          <div>Hall: {student.shift.hall.name}</div>
        </div>
        <div className="student-image-section">
          <img src={NoDp} className="student-image" alt="student-profile-picture" />
        </div>
      </div>
      <hr />
      <div className="timeline">

      </div>
    </div>

  )
}

export default StudentPage