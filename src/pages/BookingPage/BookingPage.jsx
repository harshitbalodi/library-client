import { useSelector } from 'react-redux';
// import { updateBookingDetails } from './bookingSlice'; 
import './BookingPage.css';
import { useState, useRef } from 'react';
import ImagesIcon from '../../assets/images-icon.svg';
import Button from '../../components/Button/Button'
import { useNavigate } from 'react-router-dom';

const BookingPage = () => {
  const seat = useSelector(state => state.seat);
  //   const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errors, setErrors] = useState({});
  const [previewImage, setPreviewImage] = useState(null);
  const imageInputRef = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = {};
    if (!name) {
      validationErrors.name = 'Name is required';
    }
    if (!phoneNumber) {
      validationErrors.phoneNumber = 'Phone number is required';
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // Dispatch action to update booking details with name and phone number
      //   dispatch(updateBookingDetails({ name, phoneNumber, seatId: seat.id }));
      // Handle successful submission (e.g., redirect to confirmation page)
      console.log("send user detail to server");
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => setPreviewImage(e.target.result);
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null); // Clear preview if invalid file
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

  // const handleCopy = () => {
  //   // Implement logic to handle image copy from clipboard and set previewImage
  //   // You can explore libraries like clipboard.js for copy-paste functionality
  //   console.warn('Copy-paste functionality not yet implemented');
  // };

  return (
    <div >
      {
        !seat && <div className='not-selected'>
          <h2>You have not selected any seat</h2>
          <Button onClick={() => navigate('/shift')}>Book seat</Button>
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
                // className={errors.name ? 'error' : ''} // Add an error class for invalid input
                className='name-input'
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="phone-number">Phone Number</label>
              <input
                type="tel"
                id="phone-number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter phone number"
                // className={errors.phoneNumber ? 'error' : ''} // Add an error class for invalid input
                className='phone-number-input'
              />
              {errors.phoneNumber && <span className="error-message">{errors.phoneNumber}</span>}
            </div>
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
              // style={{border:"1px solid black"}}
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
              {/* <button type="button" onClick={handleCopy}>
              Copy Image
            </button> */}
            </div>
            <button type="submit" disabled={Object.keys(errors).length > 0}>
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
