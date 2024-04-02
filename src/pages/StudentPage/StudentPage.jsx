import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import NoDp from '../../assets/no-dp.jpg';
import './StudentPage.css';

const StudentPage = () => {
  const id = useParams().id;

  const student = useSelector(state =>
    state.students.filter(student => Number(id) === Number(student.id))[0]
  );

  if (!student) {
    return <div>No such student exists.</div>;
  }
  const { name, joining_date, paid, shift: { name: shiftName, start_time, end_time, fee, hall: { name: hallName } } } = student;
  return (
    <div className="student-container">
      <div className="student-detail">
        <div className="student-image-section">
          <img src={NoDp} className="student-image" alt="Student profile picture" />
        </div>
        <div className="student-data-section">
          <h1>{name}</h1>
          <div>Joining Date: {joining_date}</div>
          <div>Fee Status: {paid ? <>Paid</> : <>Not Paid</>}</div>
          <h2>Shift Details</h2>
          <div>Shift Name: {shiftName}</div>
          <div>Start Time: {start_time}</div>
          <div>End Time: {end_time}</div>
          <div>Fee: {fee}</div>
          <div>Hall: {hallName}</div>
        </div>
      </div>
    </div>
  );
};

export default StudentPage;
