import { useEffect } from 'react';
import './AllStudents.css';
import studentService from '../../services/studentService';
import { useDispatch, useSelector } from 'react-redux';
import { setStudents } from '../../store/studentsSlice';
import NoProfilePicture from '../../assets/no-dp.jpg'
import MobileIcon from '../../assets/mobile-icon.svg';
import { setImageUrl } from '../../utils/helper';

const AllStudents = () => {
    console.log(import.meta.env.VITE_BACKEND_API_URL);
    // const navigate = useNavigate();
    const dispatch = useDispatch();
    const students = useSelector(state => state.students);

    console.log(students);
    useEffect(() => {
        const getStudents = async () => {
            try {
                const { data } = await studentService.getall();
                console.log("inside all students", data.data);
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
                    // onClick={() => navigate(`/student/${student.id}`)}
                    return <div key={student.id} className='student' >
                        <div className='student-img'>
                        { student.image ? <img src={ setImageUrl(student.image)} alt="student dp" />
                        :<img src={NoProfilePicture} alt="no dp"></img>
                        }
                        </div>
                        <div className='student-details'>
                            <div className='name'>
                                {student.name}
                                {/* <span className={`${student.paid?'paid':"not_paid"}`}> {student.paid?<>Paid</>:<>Not paid</>}</span> */}
                            </div>
                            <div className='joining'>{student.joining_date}</div>
                            {/* <div className='timing'>{formatTime(student.hall.shift.start_time)} to {formatTime(student.shift.end_time)} </div> */}
                            <div className='phone-number'> <img src={MobileIcon} alt="" />+91-9999999999</div>
                        </div>

                    </div>
                })
            }
        </div>
    )
}

export default AllStudents