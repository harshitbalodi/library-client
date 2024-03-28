import { useEffect } from 'react';
import './AllStudents.css';
import studentService from '../../services/studentService';
import { useDispatch, useSelector } from 'react-redux';
import { setStudents } from '../../store/studentsSlice';
import Student from '../Student/Student';

const AllStudents = () => {
    // const navigate = useNavigate();
    const dispatch = useDispatch();
    const students = useSelector(state => state.students);

    useEffect(() => {
        const getStudents = async () => {
            try {
                const { data } = await studentService.getall();
                dispatch(setStudents(data.data));
            } catch (error) {
                console.log("error in student component", error);
            }
        }
        getStudents();
    }, [])
    return (
        <div className='all-students-container'>
            {students &&
                students.map(student => {
                    return <Student key={student.id} student={student}/>
                })
            }
        </div>
    )
}

export default AllStudents