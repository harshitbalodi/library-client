/* eslint-disable react/prop-types */
import './AddPayment.css';
import CrossIcon from '../../assets/cross-icon.svg';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { useState } from 'react';
import { setErrorMessage as setErrorMessageThunk, setSuccessMessage } from '../../store/notificationSlice';
import paymentService from '../../services/paymentService';
import useLogoutUser from '../../hooks/useLogoutUser';
import { formatDate, setImageUrl } from '../../utils/helper';
import defaultMaleImage from '../../assets/no-dp.jpg';

const AddPayment = ({ isOpen, setIsOpen }) => {
  const [students, shifts] = useSelector(state => [state.students, state.shifts]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [months, setMonths] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState({
    monthError: null,
    paymentMethodError: null
  });
  const logoutUser = useLogoutUser();

  console.log("students", students);
  console.log("selectedOption", selectedOption);
  console.log("selectedOptionsId", selectedOption?.value?.id)
  console.log("payment Methods", paymentMethod);
  const studentOptions = students ? students.map((student) => ({
    value: student,
    label: `${student.stu_id} - ${student.name}`,
  })) : [{
    value: null,
    label: 'No students found'
  }];

  const handleChange = (selected) => {
    setSelectedOption(selected);
  };

  const handleClose = ( ) =>{
    setIsOpen(false);
    setSelectedOption(null);
    setMonths(1);
    setPaymentMethod(null);
  }

  const handlePayment = async (e) => {
    e.preventDefault();
    if (months <= 0) {
      setErrorMessage({ ...errorMessage, monthError: 'Please enter a valid number of months' });
      setTimeout(() => setErrorMessage({ ...errorMessage, monthError: null }), 3000);
      return;
    }

    if (!paymentMethod) {
      setErrorMessage({ ...errorMessage, paymentMethodError: 'Please select a payment method' });
      setTimeout(() => setErrorMessage({ ...errorMessage, paymentMethodError: null }), 3000);
      return;
    }

    try {
      setIsButtonDisabled(true);
      const response = await paymentService.updatePayment(
        selectedOption.value.id,
        Math.round(months),
        paymentMethod.value
      );
      setIsButtonDisabled(false);
      setIsOpen(false);
      console.log(response);
      dispatch(setSuccessMessage('Payment updated successfully'));
    } catch (error) {
      setIsButtonDisabled(false);
      console.log(error);
      if (error.status === 401) {
        dispatch(setSuccessMessage('Your session has expired. Please login again.'));
        logoutUser();
      } else {
        dispatch(setErrorMessageThunk(error.response.data.message));
      }
    }
  };

  const CalculateFee = () => {
    if (months <= 0) return 0;
    const studentShift = shifts?.find(shift => shift.id === selectedOption.value.hall.shift.id);
    return Math.round(months) * studentShift?.fee;
  }


  return (
    <div>
      {isOpen && (
        <div
          className={`addpayment-overlay-container ${isOpen ? 'active' : ''}`}
          onClick={handleClose}
        >
          <div className={`addpayment-form-content ${isOpen ? 'active' : ''}`}
            onClick={(e) => e.stopPropagation()}>
            <div className='cross-icon' onClick={handleClose}>
              <img title='close' src={CrossIcon} />
            </div>

            <form onSubmit={handlePayment}>
              <h3>Add Payment</h3>

              <label htmlFor="select-student">Student</label>
              {students && (
                <Select
                  className='select-student'
                  value={selectedOption}
                  onChange={handleChange}
                  options={studentOptions}
                  isClearable
                  filterOption={(option, inputValue) =>
                    option.label.toLowerCase().includes(inputValue.toLowerCase())
                  }
                  required
                />
              )}
              {
                selectedOption?.value && <div className='student-details'>
                  <div className='profile-picture-block'>
                    <img 
                    className='profile-picture'
                    src={selectedOption.value.image ? setImageUrl(selectedOption.value.image) : defaultMaleImage} alt="default image" />
                  </div>
                  <p>Student name: {selectedOption.value.name}</p>
                  <p>Student id: {selectedOption.value.stu_id}</p>
                  <p>Hall name: {selectedOption.value.hall.name}</p>
                  <p>Shift: {selectedOption.value.hall.shift.name}</p>
                </div>
              }
              <div className={` payment-form-content ${selectedOption ? 'active' : ''}`}>
                <label htmlFor="payment-method">Payment method</label>
                <Select
                  className='select-payment-method'
                  value={paymentMethod}
                  onChange={setPaymentMethod}
                  options={[
                    { value: 'CASH', label: 'CASH' },
                    { value: 'NEFT', label: 'NEFT' },
                    { value: 'UPI', label: 'UPI' },
                    { value: 'OTHER', label: 'OTHER' },
                  ]}
                  required
                />
                <div className='error'>{errorMessage.paymentMethodError}</div>

                <label htmlFor="months">Months</label>
                <input type="number" id='months' value={months} onChange={(e) => setMonths(e.target.value)} />
                <div className='error'>{errorMessage.monthError}</div>
                <button className={`pay-btn ${isButtonDisabled ? 'disabled' : ''}`}>Pay</button>
              </div>
            </form>
            {selectedOption && <div className="seat-details">
              <h2>Payment Detail</h2>
              <p>Total Amount: {CalculateFee()}</p>
              <p>Expired: {selectedOption.value.expired ? <>Yes</> : <>No</>} </p>
              <p>Last Transaction On:{formatDate(selectedOption.value.modified_t)}</p>
              <p>Valid Upto: {formatDate(selectedOption.value.valid_upto)}</p>
            </div>}
          </div>
        </div>
      )}
    </div>
  );
};

export default AddPayment;
