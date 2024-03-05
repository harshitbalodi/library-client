import { useEffect } from 'react';
import './AllStudents.css';
import studentService from '../../services/studentService';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setStudents } from '../../store/studentsSlice';
import NoProfilePicture from '../../assets/no-dp.jpg'
import MobileIcon from '../../assets/mobile-icon.svg';
import { formatTime } from '../../utils/helper';

const AllStudents = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const students = useSelector(state => state.students);

    useEffect(() => {
        const getStudents = async () => {
            try {
                const { data } = await studentService.getall();
                dispatch(setStudents(data));
            } catch (error) {
                console.log("error in student component",error);
            }
        }
        getStudents();
    }, [])
    return (
        <div className='all-students-container'>
                {students &&
                    students.map(student => {
                        return <div key={student.id} className='student' onClick={() => navigate(`/student/${student.id}`)}>
                           <div className='student-img'>
                           <img src={NoProfilePicture} alt="student dp" />
                            </div> 
                            <div className='student-details'>
                                 <div className='name'> 
                                 {student.name} 
                                    <span className={`${student.paid?'paid':"not_paid"}`}> {student.paid?<>Paid</>:<>Not paid</>}</span>
                                 </div>
                                <div className='joining'>{student.joining_date}</div>
                                <div className='timing'>{formatTime(student.shift.start_time)} to {formatTime(student.shift.end_time)} </div>
                                <div className='phone-number'> <img src={MobileIcon} alt="" />+91-9999999999</div>
                            </div>
                           
                        </div>
                    })
                }
        </div>
    )
}

export default AllStudents