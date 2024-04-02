import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import '../index.css';
import Student from "../Student/Student";
import DeleteIcon from '../../assets/delete-icon.svg';
import './NotRenewed.css';
import studentService from "../../services/studentService";
import { studentThunk } from "../../store/studentsSlice";


const NotRenewed = () => {
  const dispatch = useDispatch();
  const students = useSelector(state => state.students);
  const [notRenewedStudents, setNotRenewedStudents] = useState([]);
  useEffect(() => {
    if (students) setNotRenewedStudents(() => students.filter(student => student.is_expired === true));
  }, [students]);

  const handleDelete= async(id)=>{
    const confirmation = window.confirm('Are you sure you want to delete this student? Student will be deleted parmanently');
    if(!confirmation) return;
    try{
      const response =await studentService.deleteStudent(id);
      if(response){
        dispatch(studentThunk());
      }
    }catch(error){
      console.log(error);
    }
  }

  return notRenewedStudents.length === 0 ? <div className="feels-empty">
    <h2 style={{margin:'5%',color:'#3e4152'}}>All students are renewed</h2>
  </div> : (
    <div>
      {
        notRenewedStudents.map(student =>
          <Student key={student.id} student={student} >
            <button className="delete-btn" onClick={() => handleDelete(student.id)}>
                <img  width={25} src={DeleteIcon} alt="" />
            </button>
          </Student>
        )
      }
    </div>
  )

}

export default NotRenewed;