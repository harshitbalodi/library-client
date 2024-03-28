/* eslint-disable react/prop-types */
import NoProfilePicture from '../../assets/no-dp.jpg'
import MobileIcon from '../../assets/mobile-icon.svg';
import { setImageUrl } from '../../utils/helper';
import './Student.css'

const Student = ({student}) => {
  return (
    <div  className='student' >
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
  )
}

export default Student