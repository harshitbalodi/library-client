import "./Dashboard.css";
import SearchBar from "../../components/SearchBar/SearchBar";
import StudentReport from "../../components/StudentReport/StudentReport";
import { useSelector } from "react-redux";
import { useState } from "react";
import { extractNewBooking } from "../../utils/helper";

const Dashboard = () => {
  const students = useSelector(state => state.students);
  const [filteredStudents, setFilteredStudents] = useState(null);
  const lengths = {
    all: students?.length,
    new: extractNewBooking(students)?.length,
    expired: students?.filter(student => student.is_expired === true)?.length,
  }

  // setFilteredStudents(() => students.filter(student => student.is_expired === true))


  // useEffect(() => {

  // }, [students]);

  return (
    <div className="Dashboard">
      <SearchBar />
      <div className="member-block-container">
        <div className="member-block total">
          <p>Total Member</p>
          <h2>{lengths?.all}</h2>
          <p>People</p>
        </div>
        <div className="member-block new">
          <p>New Member</p>
          <h2>{lengths?.new}</h2>
          <p>People</p>
        </div>
        <div className="member-block expired">
          <p>Expired Member</p>
          <h2>2</h2>
          <p>People</p>
        </div>
      </div>
      <StudentReport
        students={students}
        filteredStudents={filteredStudents}
        setFilteredStudents={setFilteredStudents}
      />
    </div>
  );
}

export default Dashboard;