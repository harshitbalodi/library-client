import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import './NotRenewed.css';
import Student from "../Student/Student";
const NotRenewed = () => {
  const students = useSelector(state => state.students);
  const [notRenewedStudents,setNotRenewedStudents] = useState([]);
  console.log(students);
  console.log(notRenewedStudents);
  useEffect(() => {
    if(students) setNotRenewedStudents(()=>students.filter(student => student.is_expired === true));
  },[students]);
  return notRenewedStudents.length === 0?<div className="empty-notrenewed">
    <p>No students are not renewed</p>
  </div>:(
    <div>
     {
      notRenewedStudents.map(student =>
        <Student key={student.id} student={student}/>
        )
     }
    </div>
  )
  
}

export default NotRenewed;