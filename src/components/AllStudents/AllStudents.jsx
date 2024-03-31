import './AllStudents.css';
import Student from '../Student/Student';
import {  useSelector } from 'react-redux';

const AllStudents = () => {
    const students = useSelector(state => state.students);
    console.log(students);
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