/* eslint-disable react/prop-types */
import { formatDate } from '../../utils/helper';
import CrossIcon from '../../assets/cross-icon.svg';
import { useSelector } from 'react-redux';
import paymentService from '../../services/paymentService';
import { useEffect, useState } from 'react';
import './StudentUpdate.css';
import { toast } from 'react-toastify';
import studentService from '../../services/studentService';

const StudentUpdate = ({ student, formOpen, setFormOpen }) => {
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
    const shifts = useSelector((state) => state.shifts);
    
    useEffect(() => {
        const fetchSelectedShift = async () => {
            if (shifts && selectedShiftId) {
                const shift = await shifts.find((shift) => shift.id == selectedShiftId);
                console.log("inside useState", shift);
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
                Math.round(months)
            );
            setFormOpen(false);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

    const CalculateFee = () => {
        if (months <= 0) return 0;
        const studentShift = shifts.find(shift => shift.id === student.hall.shift.id);
        return Math.round(months) * studentShift.fee;
    }
    
    const handleUpdate =async (e) => {
        e.preventDefault();
        if (!selectedShiftId || !selectedDeskId) {
            setErrorMessage('Please select a shift and desk');
            setTimeout(() => setErrorMessage(''), 3000);
            return;
        }
        if (!name || !gender || !address || !mobileNo) {
            setErrorMessage('Please fill all the fields');
            setTimeout(() => setErrorMessage(''), 3000);
            return;
        }
        const selectedDesk = selectedShift.desks.find(desk => desk.id == selectedDeskId);
        
        if(!selectedDesk){
            setErrorMessage('Please select a valid desk');
            setTimeout(() => setErrorMessage(''), 3000);
            return;
        }
        const StudentObj = {
            mobile_no: mobileNo,
            gender: gender === 'male',
            address
        }
        
        if(name != student.name){
            StudentObj['name'] = name;
        } 
        if(student.hall.shift.id != selectedShiftId && student.hall.shift.desk != selectedDesk.seat_no){
            StudentObj['hall'] ={
                    shift: {
                        id: Number(selectedShiftId),
                        desk: Number(selectedDesk.seat_no)
                    }
                }
        }
        
        try {
            const response = await studentService.updateStudent(student.id, StudentObj);
            console.log(response);
            toast.success('student updated successfully');
            setFormOpen(false);
        } catch (error) {
            console.log(error);
            toast.error(error.message);
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
                        <div className='cross-icon' onClick={() => setFormOpen(close)}>
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
                                <div
                                    className='btn-indicator'
                                    style={{
                                        transform: `translateX(${activeForm === 'payfee' ? '0%' : '100%'})`, // Move indicator based on active component
                                        width: `calc(50%)`
                                    }}
                                >
                                </div>
                            </div>
                        </div>
                        {/* Pay fee Form */}
                        {activeForm === 'payfee' && <div className='Pay-fee-form'>
                            <h2>Payment</h2>

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
                        }

                        {
                            activeForm === 'editStudent' && <div className='edit-student-form'>
                                <h2>Edit Student</h2>
                                <form onSubmit={handleUpdate}>
                                    <div>
                                        <label htmlFor="name">Name</label>
                                        <input
                                            type="text"
                                            id='name'
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required />
                                    </div>
                                    <div>
                                        <label htmlFor="gender">Gender</label>
                                        <select
                                            id="gender"
                                            value={gender}
                                            onChange={(e) => setGender(e.target.value)}
                                            required
                                        >
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="address">Addess</label>
                                        <input
                                            type="text"
                                            id='address'
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            required />
                                    </div>
                                    <div>
                                        <label htmlFor="mobile-no">Mobile Number</label>
                                        <input
                                            type="text"
                                            id='mobile-no'
                                            value={mobileNo}
                                            onChange={(e) => setMobileNumber(e.target.value)}
                                            required />
                                    </div>
                                    <div>
                                        <label htmlFor="shift">Shift</label>
                                        <select
                                            id="shift"
                                            value={selectedShiftId}
                                            onChange={(e) => setSelectedShiftId(e.target.value)}
                                            required
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
                                                required
                                            >
                                                {selectedShift && selectedShift.desks?.length > 0 ? (
                                                    selectedShift.desks.map((desk) => (
                                                        (desk.is_active && desk.is_vacant ||student.hall.shift.desk === desk.seat_no) ? (
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

export default StudentUpdate