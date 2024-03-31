/* eslint-disable react/prop-types */
import NoProfilePicture from '../../assets/no-dp.jpg'
import MobileIcon from '../../assets/mobile-icon.svg';
import { formatDate, setImageUrl } from '../../utils/helper';
import './Student.css'
import { useState } from 'react';
import CrossIcon from '../../assets/cross-icon.svg';
import { useSelector } from 'react-redux';
import paymentService from '../../services/paymentService';

const Student = ({ student, children }) => {
  const [formOpen, setFormOpen] = useState(false);
  const [months, setMonths] = useState(1);
  const [errorMessage, setErrorMessage] = useState('');
  const shifts = useSelector(state => state.shifts);
  // console.log(shifts);
  const handlePayment = async (e) => {
    e.preventDefault();
    if (months <= 0) {
      setErrorMessage('Please enter a valid number of months');
      return;
    }
    try {
      const response = await paymentService.updatePayment(student.id, Math.round(months));
      setFormOpen(false);
      console.log(response);
    } catch (error) {
      console.log(error);
    } 
  };

  const CalculateFee = () => {
    if (months <= 0) return 0;
    const studentShift = shifts.find(shift => shift.id === student.hall.shift.id);
    console.log(studentShift);
    return Math.round(months) * studentShift.fee;
  }
  return (
    <div>
      {
        formOpen && <div
          className={`form-overlay ${formOpen ? 'active' : ''}`}
          onClick={() => setFormOpen(false)}
        >
          <div className={`form-content ${formOpen ? 'active' : ''}`} onClick={(e) => e.stopPropagation()}>
            <h2>Payment</h2>
            <div className='cross-icon' onClick={() => setFormOpen(close)}>
              <img title='close' src={CrossIcon} />
            </div>
            <form onSubmit={handlePayment}>
              <label htmlFor="months">Months</label>
              <input type="number" id='months' value={months} onChange={(e) => setMonths(e.target.value)} />
              <p style={{ color: 'red' }}>{errorMessage}</p>
              <button className='pay-btn'>Pay</button>
            </form>
            <div className="seat-details">
              <h2>Selected Student Details</h2>
              <p>Total Amount: {CalculateFee()}</p>
              <p>Student name: {student.name}</p>
              <p>Expired: {student.expired ? <>Yes</> : <>No</>} </p>
              <p>Last Transaction On:{formatDate(student.modified_t)}</p>
              <p>Valid Upto: {formatDate(student.valid_upto)}</p>
            </div>
          </div>

        </div>
      }
      <div className='student' >
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
        <div>
          <button className='pay-fee-btn' onClick={() => setFormOpen(true)}>Pay Fee</button>
          {children}
        </div>
      </div>
    </div>

  )
}

export default Student