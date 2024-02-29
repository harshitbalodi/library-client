import './SeatCard.css';
import { formatNumber, formatTime } from '../../utils/helper';
import DeleteIcon from '../../assets/delete-icon.svg';
import EditIcon from '../../assets/edit-icon.svg'
import shiftServices from '../../services/shiftServices';
import { toast } from 'react-toastify';
import { useState } from 'react';
import ModifyShiftForm from '../ModifyShiftForm/ModifyShiftForm';
import { useDispatch, useSelector } from 'react-redux';
import { setHallsThunk } from '../../store/hallSlice';
import { setSeat } from '../../store/seatSlice';

const SeatCard = ({ shift }) => {
    const [isOpen, setIsOpen] = useState(false);
    const seat = useSelector(state => state.seat);
    const dispatch = useDispatch();

    const BookSeat = (desk) => {
        console.log("desk id is clicked", desk);
        if (!desk.is_vacant || !desk.is_active) {
            toast.error(`seat ${desk.seat_no} is already book or inactive`);
            return;
        }
        if (seat && seat.id === desk.id) {
            dispatch(setSeat(null));
            return;
        }
        dispatch(setSeat({ ...desk, shift }));
        toast.success(` seat ${desk.seat_no} in ${shift.name} is selected`);
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
                    toast.error(response.data.message);
                } else {
                    toast.success(response.data.message);
                    dispatch(setHallsThunk());
                }
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }
    }

    return (
        <div className='seatcard-container'>
            <div className="seatcard-seats">
                {shift.desks.map((desk, index) => (
                    <div
                        key={desk.id}
                        className={`seat ${seat && seat.id === desk.id ? "selected" : (desk.is_vacant ? 'vacant' : 'occupied')}`}
                        onClick={() => BookSeat(desk, shift.name)}
                    >
                        {
                            index < shift.capacity && <div className='seat-number'>{index + 1}</div>
                        }
                    </div>
                ))}
            </div>
            <div className='seatcard-details'>
                <div className='hall-name'>{shift.name}</div>
                <div className='timing'>Timing: {formatTime(shift.start_time)} - {formatTime(shift.end_time)}</div>
                <div className='fee'>Fee: Rs {formatNumber(shift.fee)}</div>
            </div>
            <div className='action-buttons'>
                <div className='edit-img' title='edit card' onClick={handleEdit}><img src={EditIcon} alt="edit" /></div>
                <div className='del-img' title='delete card' onClick={handleDelete}><img src={DeleteIcon} alt="del" /></div>
            </div>
            {isOpen && (<ModifyShiftForm
                shift={shift}
                setIsOpen={setIsOpen}
            />)}
        </div>
    );
};

export default SeatCard;
