import { useDispatch, useSelector } from 'react-redux';
import './BookingPage.css';
import { useEffect, useState } from 'react';
// import Button from '../../components/Button/Button'
import { useNavigate, useSearchParams } from 'react-router-dom';
import studentService from '../../services/studentService';
import { setSeat } from '../../store/seatSlice';
import { studentThunk } from '../../store/studentsSlice';
import ImagePicker from '../../components/ImagePicker/ImagePicker';
import { setErrorMessage, setSuccessMessage } from '../../store/notificationSlice';
import { hallsThunk } from '../../store/hallSlice';

const BookingPage = () => {
  const [seat, shifts] = useSelector(state => [state.seat, state.shifts]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('');
  const [image, setImage] = useState(null);
  const [address, setAddress] = useState('');
  const [months, setMonths] = useState(1);
  const [joiningDate, setJoiningDate] = useState(new Date().toISOString().split('T')[0]);
  const [error, setErrors] = useState("");
  const [deskId] = useState(() => searchParams.get("desk"));
  const [shiftId] = useState(() => searchParams.get("shift"));
  const [bookedSuccessfully, setBookedSuccessfully] = useState(false);

  console.log("deskId", deskId, shiftId);
  console.log("seat", seat);

  useEffect(() => {
    if (deskId && shiftId && shifts) {
      const shift = shifts.find(shift => shift.id == shiftId);
      if (!shift) return;
      const desk = shift.desks.find(desk => desk.id == deskId);
      if (!desk) return;
      dispatch(setSeat({ ...desk, shift }));
    }
  }, [shifts, deskId, shiftId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (months <= 0){
      console.log("months should be greater than 0");
      setErrors('Please enter a valid number of months');
      setTimeout(() => setErrors(''), 3000);
      return;
    }
    if(!image){
      console.log("image not selected");
      setErrors('Please select an image');
      setTimeout(()=> setErrors(''), 3000);
      return;
    }
    const formData = new FormData();
    formData.append('name', name);
    formData.append('mobile_no', phoneNumber);
    formData.append('gender', gender === 'male');
    formData.append('address', address);
    formData.append('image', image);
    formData.append('desk', seat.id);
    formData.append('shift', seat.shift.id);
    formData.append('paid_for_month', Number(months));
    formData.append('joining_date', joiningDate);
    try {
      const response = await studentService.createStudent(formData);
      console.log("student created", response);
      setBookedSuccessfully(true);
      dispatch(setSuccessMessage("student created Sussesfully"));
      dispatch(setSeat(null));
      dispatch(studentThunk());
      dispatch(hallsThunk());
      // navigate('/hall');
    } catch (error) {
      dispatch(setErrorMessage("Error in creating student"));
      console.log(error);
    }
  };
  const CalculateFee = () => {
    if (months <= 0 || !seat) return 0;
    return Math.round(months) * seat.shift.fee;
  }

  return (
    <div>
      {
        !seat && <div  className='not-selected'>
          <h3>You have not selected any seat</h3>
          <p>Go back to Dashboard</p>
          <button className='home-button' onClick={() => navigate('/')}>Dashboard</button>
        </div>
      }
      {
        seat && !bookedSuccessfully && !seat.is_vacant && !seat.is_active && <div className='not-available'>
          <h3>Seat is not available</h3>
          <p>Go back to Dashboard</p>
          <button className='home-button' onClick={() => navigate('/')}>Dashboard</button>
        </div>
      }
      {seat && (
        <div className="booking-container">
          {
            bookedSuccessfully ? (<div className='booked-successfully'>
              <div className='success-animation'>
                <svg width="200" height="200">
                  <circle
                    fill="none"
                    stroke="#68E534"
                    strokeWidth="10" 
                    cx="100" 
                    cy="100"
                    r="85" 
                    strokeLinecap="round"
                    transform="rotate(-90 100 100)"
                    className="circle"
                  />
                  <polyline
                    fill="none"
                    stroke="#68E534"
                    points="44,107 86.5,142 152,69" 
                    strokeWidth="12" 
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="tick"
                  />
                </svg>
              </div>
              <h3>Booked Successfully!</h3>
              <p>Go back to Dashboard</p>
              <button className='home-button' onClick={() => navigate('/')}>Dashboard</button>
            </div>
            )
              :
              (
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

                  <ImagePicker setImage={setImage}/>

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
                </form>)
          }

        </div>
      )}
    </div>
  );
};

export default BookingPage;
