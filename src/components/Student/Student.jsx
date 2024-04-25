/* eslint-disable react/prop-types */
import NoProfilePicture from '../../assets/no-dp.jpg'
import MobileIcon from '../../assets/mobile-icon.svg';
import { setImageUrl } from '../../utils/helper';
import './Student.css';
import '../index.css';
import { useState } from 'react';
import StudentUpdate from '../StudentUpdate/StudentUpdate';
import PenEditIcon from '../../assets/pen-edit-icon.svg';

const Student = ({ student, children, ...props }) => {
  const [formOpen, setFormOpen] = useState(false);
 
  return (
    <div>
      <StudentUpdate student={student} formOpen={formOpen} setFormOpen={setFormOpen} />
      <div className='student' {...props} >
        <div className='student-img'>
          {student.image ? <img src={setImageUrl(student.image)} alt="student dp" />
            : <img src={NoProfilePicture} alt="no dp"></img>
          }
        </div>
        <div className='student-details'>
          <div className='name'>{student.name}</div>
          <div className='joining'>{student.joining_date}</div>
          <div className='phone-number'> <img src={MobileIcon} alt="" />+91-9999999999</div>
        </div>
        <div className='right-block'>
          <button className='pay-edit-btn' onClick={() => setFormOpen(true)}>Modify <img width={14} src={PenEditIcon} alt="📝" /></button>
          {children}
        </div>
      </div>
    </div>

  )
}

export default Student