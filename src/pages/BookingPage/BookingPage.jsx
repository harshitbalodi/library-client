import { useDispatch, useSelector } from 'react-redux';
import './BookingPage.css';
import { useState } from 'react';
import Button from '../../components/Button/Button'
import { useNavigate } from 'react-router-dom';
import studentService from '../../services/studentService';
import { toast } from 'react-toastify';
import { setSeat } from '../../store/seatSlice';
import { studentThunk } from '../../store/studentsSlice';
import ImagePicker from '../../components/ImagePicker/ImagePicker';

const BookingPage = () => {
  const seat = useSelector(state => state.seat);
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('');
  const [image, setImage] = useState(null);
  const [address, setAddress] = useState('');
  const [months, setMonths] = useState(1);
  const [joiningDate, setJoiningDate] = useState(new Date().toISOString().split('T')[0]);
  const [error, setErrors] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(seat);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!seat) {
      return;
    }
    if (months <= 0) {
      setErrors('Please enter a valid number of months');
      setTimeout(() => setErrors(''), 3000);
      return;
    }
    const formData = new FormData();
    formData.append('name', name);
    formData.append('mobile_no', phoneNumber);
    formData.append('gender', gender === 'male');
    formData.append('address', address);
    if (image) {
      formData.append('image', image);
    }
    formData.append('desk', seat.id);
    formData.append('shift', seat.shift.id);
    formData.append('paid_for_month', Number(months));
    formData.append('joining_date', joiningDate);
    try {
      const response = await studentService.createStudent(formData);
      console.log("student created", response);
      toast.success("student created Succesfully");
      dispatch(setSeat(null));
      dispatch(studentThunk());
      navigate('/hall');
    } catch (error) {
      console.log(error);
    }
  };
  const CalculateFee = () => {
    if (months <= 0 || !seat) return 0;
    return Math.round(months) * seat.shift.fee;
  }

  return (
    <div >
      {
        !seat && <div className='not-selected'>
          <h2>You have not selected any seat</h2>
          <Button onClick={() => navigate('/')}>Home</Button>
        </div>
      }
      {seat && (
        <div className="booking-container">
          <form onSubmit={handleSubmit} className="booking-form">
            <h2>Booking Details</h2>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className='name-input'
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="mobile-no">Phone Number</label>
              <input
                type="tel"
                id="mobile-no"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter phone number"
                className='phone-number-input'
                required
              />
            </div>
            <div className='form-group'>
              <label htmlFor="gender">Gender</label>
              <select
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
              >
                <option id='opt1' value="male">Male</option>
                <option id='opt2' value="female">Female</option>
              </select>
            </div>
            <div className='form-group'>
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your address"
                className='address-input'
                required
              />
            </div>
            <div className='form-group'>
              <label htmlFor="months">Months</label>
              <input
                type='number'
                id='months'
                value={months}
                onChange={(e) => setMonths(Math.round(e.target.value))}
                className='months-input'
                required
              />
            </div>
            <div className='form-group'>
              <label htmlFor="joining-date">Joining date</label>
              <input
                type='date'
                id='joining-date'
                value={joiningDate}
                onChange={(e) => setJoiningDate(e.target.value)}
                className='joining-input'
                required
              />
            </div>

            <ImagePicker setImage={setImage} />

            <div style={{ color: 'red' }}>
              {error}
            </div>
            <button type="submit">
              Confirm Booking
            </button>
            <div className="seat-details">
              <h2>Selected Seat Details</h2>
              <p>Total Amount: {CalculateFee()}</p>
              <p>Seat Number: {seat.seat_no}</p>
              <p>Shift: {seat.shift.name}</p>
              <p>Start Time: {seat.shift.start_time}</p>
              <p>End Time: {seat.shift.end_time}</p>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default BookingPage;
