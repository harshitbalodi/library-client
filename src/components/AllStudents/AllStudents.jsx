import { useEffect } from 'react';
import './AllStudents.css';
import studentService from '../../services/studentService';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setStudents } from '../../store/studentsSlice';
import NoProfilePicture from '../../assets/no-dp.jpg'

const AllStudents = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const students = useSelector(state => state.students);
    useEffect(() => {
        const getStudents=async()=>{
          try {
            const {data} = await studentService.getall();
            dispatch(setStudents(data));
        } catch (error) {
            console.log(error);
        }  
        }
        getStudents();
    }, [])
    return (
        <div className='all-students-container'>
            <div className='students-title'>
               All students   
            </div>
            <hr/>
            <div className='all-students'>
              {
              students.map(student => {
                    return <div key={student.id} className='student' onClick={()=>navigate(`/student/${student.id}`)}>
                        <img src={NoProfilePicture} alt="" className='student-profile-img' />
                        <div className='name'> {student.name}</div>
                        <div className='joining'>{student.joining_date}</div>
                    </div>
                })
            }  
            </div>
            
        </div>
    )
}

export default AllStudents