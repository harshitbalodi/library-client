import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import '../index.css';
import Student from "../Student/Student";
import './NotRenewed.css';
import studentService from "../../services/studentService";
import { studentThunk } from "../../store/studentsSlice";
import { setSuccessMessage } from "../../store/notificationSlice";
import DeleteIcon from "../../assets/SvgComponents/DeleteIcon";


const NotRenewed = () => {
  const dispatch = useDispatch();
  const students = useSelector(state => state.students);
  const [notRenewedStudents, setNotRenewedStudents] = useState([]);
  const [hoverStates, setHoverStates] = useState({});
  useEffect(() => {
    if (students) setNotRenewedStudents(() => students.filter(student => student.is_expired === true));
  }, [students]);

  const handleDelete = async (student) => {
    const confirmation = window.confirm('Are you sure you want to delete this student? Student will be deleted parmanently');
    if (!confirmation) return;
    try {
      const response = await studentService.deleteStudent(student.id);
      if (response) {
        dispatch(studentThunk());
        dispatch(setSuccessMessage(`${student.name} is deleted successfully!`));
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleMouseEnter = (id) =>{
    setHoverStates(prevState=>{
      return {...prevState, [id]: true}
    })
  }

  const handleMouseLeave =(id) =>{
    setHoverStates(prevState=>{
      return {...prevState, [id]: false}
    })
  }

  return notRenewedStudents.length === 0 ? <div className="feels-empty">
    <h2 style={{ margin: '5%', color: '#3e4152' }}>All students are renewed</h2>
  </div> : (
    <div>
      {
        notRenewedStudents.map(student =>
          <Student key={student.id} student={student} >
            <button 
            className="delete-btn" 
            onMouseEnter={()=> handleMouseEnter(student.id)} 
            onMouseLeave={() => handleMouseLeave(student.id)}
            onClick={() => handleDelete(student)}>
              <DeleteIcon isHovering={hoverStates[student.id] || false}/>
            </button>
          </Student>
        )
      }
    </div>
  )

}

export default NotRenewed;