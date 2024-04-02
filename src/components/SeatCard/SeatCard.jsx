/* eslint-disable react/prop-types */
import './SeatCard.css';
import { formatNumber, formatTime } from '../../utils/helper';
import DeleteIcon from '../../assets/delete-icon.svg';
import EditIcon from '../../assets/edit-icon.svg'
import shiftServices from '../../services/shiftServices';
// import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import ModifyShiftForm from '../ModifyShiftForm/ModifyShiftForm';
import { useDispatch, useSelector } from 'react-redux';
import { hallsThunk } from '../../store/hallSlice';
import { setSeat } from '../../store/seatSlice';
import ArrowDownWard from '../../assets/arrow-circle-right.svg';
import deskService from '../../services/deskService';
import { disableDropdown, enableDropdown } from '../../store/editDropdownSlice';

const SeatCard = ({ shift }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isHovering, setIsHovering] = useState(null);
    const [seat, isEditDropdownOpen, students] = useSelector(state => [state.seat, state.editDropdown.isEnabled, state.students]);
    const dispatch = useDispatch();
    
    useEffect(() => {
        if (!seat || !shift) return;
        shift.desks.forEach(desk => {
            if (desk.id === seat.id && (!desk.is_active || !desk.is_vacant)) {
                dispatch(setSeat(null));
            }
        })
    }, [shift, seat])

    const findName=(deskNo)=>{
        if(!students){
            return 'seat Taken';
        }
        const student = students.find(student => student.hall.shift.id === shift.id && student.hall.shift.desk === deskNo);
        return student ? `${student.name}` : 'seat Taken';
    }
    const BookSeat = (desk) => {
        console.log("desk id is clicked", desk);
        if (!desk.is_vacant || !desk.is_active) {
            return;
        }
        if (seat && seat.id === desk.id) {
            dispatch(setSeat(null));
            return;
        }
        dispatch(setSeat({ ...desk, shift }));
    };

    const handleEdit = () => {
        setIsOpen(!isOpen);
    }

    const handleDelete = async () => {
        const action = window.confirm('Do you really want to delete the shift');
        console.log(action);
        if (action) {
            try {
                const response = await shiftServices.deleteShift(shift.id);
                console.log(response);
                if (response.data.status === "error") {
                    // toast.error(response.data.message);
                } else {
                    // toast.success(response.data.message);
                    dispatch(hallsThunk());
                }
            } catch (error) {
                console.log(error);
                // toast.error(error.message);
            }
        }
    }

    const ChangeAvailablity = async (e, desk) => {
        e.stopPropagation();
        console.log(desk);
        try {
            const response = await deskService.updateDesk(desk.id, { is_active: !desk.is_active });
            console.log(response);
            dispatch(hallsThunk());
        } catch (error) {
            console.log(error);
        }

    }

    const handleDropDown = () => {
        console.log("clicked...")
        if (isEditDropdownOpen) dispatch(disableDropdown());
        else dispatch(enableDropdown());
    }

    return (
        <div className='seatcard-container'>
            <div className="seatcard-seats">
                {shift.desks.map((desk, index) => (
                    <div
                        key={desk.id}
                        className={`seat ${seat && seat.id === desk.id
                            ? "selected" : !desk.is_active
                                ? "inactive"
                                :
                                (desk.is_vacant ? 'vacant' : 'occupied')}`}
                        title={`${!desk.is_vacant && desk.is_active ? findName(desk.seat_no):'' }`}
                        onClick={() => BookSeat(desk, shift.name)}
                        onMouseEnter={() => setIsHovering(index)}
                        onMouseLeave={() => setIsHovering(null)}
                    >
                        {
                            (
                                <div>
                                    <div className='seat-number'>{desk.seat_no}</div>
                                    <div className={`seat-info ${isHovering === index ? "visible" : ""}`}>
                                        {
                                            (!desk.is_active || desk.is_vacant) && (
                                                <img className={`seat-img ${isEditDropdownOpen ? 'upward' : 'downward'}`} src={ArrowDownWard} onClick={handleDropDown} alt="" />
                                            )
                                        }

                                        {isHovering === index && isEditDropdownOpen && (
                                            <div className="dropdown-content">
                                                {!desk.is_active && (
                                                    <button onClick={(e) => ChangeAvailablity(e, desk)}>Activate Seat</button>
                                                )}
                                                {desk.is_vacant && desk.is_active && (
                                                    <button onClick={(e) => ChangeAvailablity(e, desk)}>Deactivate Seat</button>
                                                )}
                                            </div>
                                        )}
                                    </div>


                                </div>
                            )
                        }
                    </div>
                ))
                }
            </div>
            <div className='seatcard-details'>
                <div className='hall-name'>{shift.name}</div>
                <div className='timing'>Timing: {formatTime(shift.start_time)} - {formatTime(shift.end_time)}</div>
                <div className='fee'>Fee: Rs {formatNumber(shift.fee)}</div>
            </div>
            <div className='action-buttons'>
                <div className='edit-img' title='edit card' onClick={handleEdit}>
                    <img src={EditIcon} alt="edit" />
                </div>
                <div className='del-img' title='delete card' onClick={handleDelete}>
                    <img src={DeleteIcon} alt="del" />
                </div>
            </div>
            {isOpen && (<ModifyShiftForm
                shift={shift}
                setIsOpen={setIsOpen}
            />)}
        </div>
    );
};

export default SeatCard;
