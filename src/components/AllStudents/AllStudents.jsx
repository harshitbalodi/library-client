import { useEffect } from 'react';
import './AllStudents.css';
import studentService from '../../services/studentService';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AllStudents = () => {
    const navigate = useNavigate();
    const [students, setStudents] = useState(null);
    console.log(students);
    useEffect(() => {
        const getStudents=async()=>{
          try {
            const {data} = await studentService.getall();
            setStudents(data);
        } catch (error) {
            console.log(error);
        }  
        }
        getStudents();
    }, [])
    return (
        <div className='all-students'>
            All students
            <hr/>
            {students &&
                students.map(student => {
                    return <div key={student.id} className='student' onClick={()=>navigate(`./student/${student.id}`)}>
                        <img src="https://photosnow.net/wp-content/uploads/2023/12/no-dp32.jpg" alt="" className='student-profile-img' />
                        <div className='name'> {student.name}</div>
                        <div className='joining'>{student.joining_date}</div>
                    </div>
                })
            }
        </div>
    )
}

export default AllStudents