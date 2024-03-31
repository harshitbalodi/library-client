import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import './NotRenewed.css';
import Student from "../Student/Student";
const NotRenewed = () => {
  const students = useSelector(state => state.students);
  const [notRenewedStudents, setNotRenewedStudents] = useState([]);

  useEffect(() => {
    if (students) setNotRenewedStudents(() => students.filter(student => student.is_expired === true));
  }, [students]);

  return notRenewedStudents.length === 0 ? <div className="empty-renewed">
    <h2 style={{margin:'5%',color:'#3e4152'}}>All students are renewed</h2>
  </div> : (
    <div>
      {
        notRenewedStudents.map(student =>
          <Student key={student.id} student={student} />
        )
      }
    </div>
  )

}

export default NotRenewed;