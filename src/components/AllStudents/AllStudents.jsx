import './AllStudents.css';
import Student from '../Student/Student';
import {  useSelector } from 'react-redux';
import '../index.css';

const AllStudents = () => {
    const students = useSelector(state => state.students);
    console.log(students);
    return !students ? <div className="feels-empty">
        <h2>Don not Have any students</h2>
        </div>:(
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