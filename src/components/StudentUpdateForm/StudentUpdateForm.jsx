/* eslint-disable react/prop-types */
import { formatDate } from '../../utils/helper';
import CrossIcon from '../../assets/cross-icon.svg';
import { useDispatch, useSelector } from 'react-redux';
import paymentService from '../../services/paymentService';
import { useEffect, useState } from 'react';
import './StudentUpdateForm.css';
import studentService from '../../services/studentService';
import ImagePicker from '../ImagePicker/ImagePicker';
import { setSuccessMessage, setErrorMessage as setErrorMessageThunk } from '../../store/notificationSlice';
import useLogoutUser from '../../hooks/useLogoutUser';
import { studentThunk } from '../../store/studentsSlice';
import { hallsThunk } from '../../store/hallSlice';

const StudentUpdateForm = ({ student, formOpen, setFormOpen }) => {
    const [errorMessage, setErrorMessage] = useState('');
    const [activeForm, setActiveForm] = useState('payfee');
    const [months, setMonths] = useState(1);
    const [name, setName] = useState(student.name || '');
    const [gender, setGender] = useState(student.gender || '');
    const [address, setAddress] = useState(student.address || '');
    const [mobileNo, setMobileNumber] = useState(student.mobile_no || '');
    const [selectedShiftId, setSelectedShiftId] = useState(student.hall.shift.id);
    const [selectedDeskId, setSelectedDeskId] = useState('');
    const [selectedShift, setSelectedShift] = useState(null);
    const [image, setImage] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState('CASH');
    const shifts = useSelector((state) => state.shifts);
    const dispatch = useDispatch();
    const logoutUser = useLogoutUser();

    useEffect(() => {
        const fetchSelectedShift = async () => {
            if (shifts && selectedShiftId) {
                const shift = await shifts.find((shift) => shift.id == selectedShiftId);
                if (shift) setSelectedShift(shift);
            }
        };
        fetchSelectedShift();
    }, [selectedShiftId, shifts]);

    useEffect(() => {
        const fetchSelectedDesk = async () => {
            if (selectedShift) {
                const selectedDesk = selectedShift.desks.find(
                    (desk) => desk.id === selectedDeskId
                );
                if (selectedDesk) setSelectedDeskId(selectedDesk.seat_no);
            }
        };
        fetchSelectedDesk();
    }, [selectedShiftId, selectedDeskId, selectedShift]);


    const handlePayment = async (e) => {
        e.preventDefault();
        if (months <= 0) {
            setErrorMessage('Please enter a valid number of months');
            return;
        }
        try {
            const response = await paymentService.updatePayment(
                student.id,
                Math.round(months),
                paymentMethod
            );
            setFormOpen(false);
            console.log(response);
            dispatch(setSuccessMessage('Payment updated successfully'));
        } catch (error) {
            console.log(error);
            if (error.status === 401) {
                dispatch(setSuccessMessage('Your session has expired. Please login again.'));
                logoutUser();
            } else {
                dispatch(setErrorMessageThunk(error.response.data.message));
            }
        }
    };

    console.log('selected desk id', selectedDeskId);
    console.log('selected shift id', selectedShiftId);
    const CalculateFee = () => {
        if (months <= 0) return 0;
        const studentShift = shifts.find(shift => shift.id === student.hall.shift.id);
        return Math.round(months) * studentShift.fee;
    }

    console.log(selectedShift);
    const handleUpdate = async (e) => {
        e.preventDefault();
        // if (!selectedShiftId || !selectedDeskId) {
        //     setErrorMessage('Please select a shift and desk');
        //     setTimeout(() => setErrorMessage(''), 3000);
        //     return;
        // }
        const formData = new FormData();
        if (gender && gender != student.gender) {
            formData.append('gender', gender === 'male');
        }
        if (address && address != student.address) {
            formData.append('address', address);
        }
        if (mobileNo && mobileNo != student.mobile_no) {
            formData.append('mobile_no', mobileNo);
        }

        if (name && name != student.name) {
            formData.append('name', name);
        }
        if (image) {
            formData.append('image', image);
        }

        const selectedDesk = selectedShift.desks.find(desk => desk.id == selectedDeskId);

        if (selectedDesk && student.hall.shift.desk != selectedDesk.seat_no) {
            formData.append('shift',Number(selectedShiftId));
            formData.append('desk',Number(selectedDeskId));
        }
        try {
            const response = await studentService.updateStudent(student.id, formData);
            console.log(response);
            dispatch(studentThunk());
            dispatch(hallsThunk());
            dispatch(setSuccessMessage('student updated successfully'))
            setFormOpen(false);

        } catch (error) {
            console.log(error);
            if (error.status === 401) {
                dispatch(setSuccessMessage('Your session has expired. Please login again.'));
                logoutUser();
            } else {
                dispatch(setErrorMessageThunk(error.response.data.message));
            }
        }
    }
    return (
        <div>
            {
                formOpen && <div
                    className={`form-overlay ${formOpen ? 'active' : ''}`}
                    onClick={() => setFormOpen(false)}
                >
                    <div className={`form-content ${formOpen ? 'active' : ''}`} onClick={(e) => e.stopPropagation()}>
                        <div className='cross-icon' onClick={() => setFormOpen(false)}>
                            <img title='close' src={CrossIcon} />
                        </div>
                        <div className='btn-wrapper'>
                            <div className='btn-container'>
                                <button
                                    className={activeForm === 'payfee' ? 'activebtn' : ''}
                                    onClick={() => setActiveForm('payfee')}>
                                    Pay Fee
                                </button>
                                <button
                                    className={activeForm === 'editStudent' ? 'activebtn' : ''}
                                    onClick={() => setActiveForm('editStudent')}>
                                    Edit student
                                </button>
                            </div>
                        </div>
                        {/* Pay fee Form */}
                        {activeForm === 'payfee' && <div className='Pay-fee-form'>
                            <form onSubmit={handlePayment}>
                                <label htmlFor="months">Months</label>
                                <input type="number" id='months' value={months} onChange={(e) => setMonths(e.target.value)} />
                                <label htmlFor="payment-method">Payment method</label>
                                <select
                                    id="payment-method"
                                    value={paymentMethod}
                                    onChange={(e) => setPaymentMethod(e.target.value)}>
                                    <option value="CASH">CASH</option>
                                    <option value="NEFT">NEFT</option>
                                    <option value="UPI">UPI</option>
                                    <option value="OTHER">OTHER</option>
                                </select>
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
                        }

                        {
                            activeForm === 'editStudent' && <div className='edit-student-form'>
                                <form onSubmit={handleUpdate}>
                                    <div>
                                        <label htmlFor="name">Name</label>
                                        <input
                                            type="text"
                                            id='name'
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                            placeholder='Enter your name'
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="address">Addess</label>
                                        <input
                                            type="text"
                                            id='address'
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            placeholder='Enter your address'
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="mobile-no">Mobile Number</label>
                                        <input
                                            type="text"
                                            id='mobile-no'
                                            value={mobileNo}
                                            onChange={(e) => setMobileNumber(e.target.value)}
                                            placeholder='Enter your mobile number'
                                        />
                                    </div>
                                    <div>
                                        <div>
                                            <label htmlFor="gender">Gender</label>
                                            <select
                                                id="gender"
                                                value={gender}
                                                onChange={(e) => setGender(e.target.value)}
                                            >
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                            </select>
                                        </div>
                                        <label htmlFor="shift">Shift</label>
                                        <select
                                            id="shift"
                                            value={selectedShiftId}
                                            onChange={(e) => setSelectedShiftId(e.target.value)}
                                        >
                                            {shifts.length > 0 ? (
                                                shifts.map((option) => (
                                                    <option key={option.id} value={option.id}>
                                                        {option.name}
                                                    </option>
                                                ))
                                            ) : (
                                                <option value="">No shifts available</option>
                                            )}
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="desk">Desk</label>
                                        {
                                            selectedShiftId && <select
                                                id="desk"
                                                value={selectedDeskId}
                                                onChange={(e) => setSelectedDeskId(e.target.value)}

                                            >
                                                {selectedShift && selectedShift.desks?.length > 0 ? (
                                                    selectedShift.desks.map((desk) => (
                                                        (desk.is_active && desk.is_vacant || student.hall.shift.desk === desk.seat_no) ? (
                                                            <option key={desk.id} value={desk.id}>
                                                                Seat no {desk.seat_no}
                                                            </option>
                                                        ) : null
                                                    ))
                                                ) : (
                                                    <option value="">No desks available</option>
                                                )}
                                            </select>
                                        }
                                    </div>
                                    <ImagePicker setImage={setImage} />
                                    <p style={{ color: 'red' }}>{errorMessage}</p>
                                    <button className='pay-btn'>Update Student</button>
                                </form>
                            </div>
                        }

                    </div>

                </div>
            }
        </div>
    )
}

export default StudentUpdateForm