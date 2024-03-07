import { useSelector } from 'react-redux';
// import { updateBookingDetails } from './bookingSlice'; // Assuming you have a bookingSlice
import './BookingPage.css';
import { useState } from 'react';
const BookingPage = () => {
  const seat = useSelector(state => state.seat);
  //   const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errors, setErrors] = useState({}); // To store validation errors

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

  return (
    <div className="booking-container">
      {!seat && <div>You have not selected any seat</div>}
      {seat && (
        <form onSubmit={handleSubmit} className="booking-form">
          <h2>Booking Details</h2>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              className={errors.name ? 'error' : ''} // Add an error class for invalid input
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="phone-number">Phone Number:</label>
            <input
              type="tel"
              id="phone-number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter phone number"
              className={errors.phoneNumber ? 'error' : ''} // Add an error class for invalid input
            />
            {errors.phoneNumber && <span className="error-message">{errors.phoneNumber}</span>}
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
      )}
    </div>
  );
};

export default BookingPage;
