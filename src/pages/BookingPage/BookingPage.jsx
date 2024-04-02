import { useDispatch, useSelector } from 'react-redux';
import './BookingPage.css';
import { useState, useRef } from 'react';
import ImagesIcon from '../../assets/images-icon.svg';
import Button from '../../components/Button/Button'
import { useNavigate } from 'react-router-dom';
import studentService from '../../services/studentService';
import { toast } from 'react-toastify';
import { setSeat } from '../../store/seatSlice';
import { studentThunk } from '../../store/studentsSlice';

const BookingPage = () => {
  const seat = useSelector(state => state.seat);
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('');
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [address, setAddress] = useState('');
  const [months, setMonths] = useState(1);
  const [joiningDate, setJoiningDate] = useState(new Date().toISOString().split('T')[0]);
  const [error, setErrors] = useState('');
  const imageInputRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  console.log(joiningDate);
  console.log(image);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!seat){
      return;
    }

    if (months <= 0) {
      setErrors('Please enter a valid number of months');
      setTimeout(()=>setErrors(''), 3000);
      return;
    }
    if(image === null){
      setErrors('Please upload an image');
      setTimeout(()=>setErrors(''), 3000);
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
    // formData.append('joining_date', Number(new Date().toISOString().split('T')[0]));
    // const studentObj = {
    //   name,
    //   mobile_no: phoneNumber,
    //   gender: gender === 'male',
    //   address,
    //   desk: seat.id,
    //   shift: seat.shift.id,
    //   paid_for_month: months,
    //   joining_date: joiningDate,
    //   // image: encodeURIComponent(URL.createObjectURL(image))
    // }
    // console.log(studentObj);

    try{
      const response = await studentService.createStudent(formData);
      console.log("student created",response);
      toast.success("student created Succesfully");
      dispatch(setSeat(null));
      dispatch(studentThunk());
      navigate('/hall');
    }catch(error){
      console.log(error);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setImage(file);
      const reader = new FileReader();
      reader.onload = (e) => setPreviewImage(e.target.result);
      reader.readAsDataURL(file);
    } else {
      // Clear preview if invalid file
      // setPreviewImage(null); 
      // setImage(null);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];

    if (file && file.type.startsWith('image/')) {
      handleImageChange({ target: { files: [file] } }); // Simulate image change event
    }
  };

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
              value = {gender}
              onChange={(e) => setGender(e.target.value)}
              required
              >
                <option id='opt1' value="male">Male</option>
                <option  id='opt2' value="female">Female</option>
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
            {/* Image picker */}
            <div className="image-picker">
              <label htmlFor="image-input">Profile Picture (Optional)</label>
              <input
                type="file"
                id="image-input"
                ref={imageInputRef}
                onChange={handleImageChange}
                accept="image/*"
                style={{ display: 'none', border: "1px solid black" }}
              />
              <div
                className="image-preview"
                onClick={() => imageInputRef.current.click()} // Open file browser on click
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                {previewImage ? (
                  <img
                    src={previewImage}
                    width={100}
                    alt="Profile preview"
                    style={{ borderRadius: '50%' }}
                  /> // Circle preview
                ) : (
                  <div>
                    <img src={ImagesIcon} alt="" />
                  </div>
                )}
                Drag & Drop or <span style={{ color: 'blue' }}>Browse</span>
              </div>
            </div>
            {/* image picker  end here*/}
            <div style={{ color: 'red' }}>
              {error}
            </div>
            <button type="submit">
              Confirm Booking
            </button>
            <div className="seat-details">
              <h2>Selected Seat Details</h2>
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
