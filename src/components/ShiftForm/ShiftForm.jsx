/* eslint-disable react/prop-types */
import Button from '../Button/Button';
import './ShiftForm.css';
import CrossIcon from '../../assets/cross-icon.svg';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";
import shiftServices from '../../services/shiftServices';
import { setHallsThunk } from '../../store/hallSlice';

const ShiftForm = ({ isOpen, onClose, hall }) => {
    const halls = useSelector(state => state.halls);
    const dispatch = useDispatch();
    console.log(halls);
    const [hallOptions, setHallOptions] = useState([]);
    const [selectedHallId, setSelectedHallId] = useState(hall?.id || '');
    const [shiftName, setShiftName] = useState('');
    const [capacity, setCapacity] = useState(0);
    const [fee, setFee] = useState(0);
    const [startAt, setStartAt] = useState('');
    const [endAt, setEndAt] = useState('');

    useEffect(() => {
        setHallOptions(halls.map(hall => ({ value: hall.id, label: hall.name })));
    }, [halls, hall]);

    const handleCreateShift = async (event) => {
        event.preventDefault();

        if (!selectedHallId) {
            toast.error('Please select a Hall');
            return;
        }
        const shiftObj = {
            name: shiftName,
            capacity,
            start_time: startAt,
            end_time: endAt,
            fee,
            hall: selectedHallId
        }

        try {
            const response = await shiftServices.addShift(shiftObj);
            if (response) {
                dispatch(setHallsThunk());
                toast.success("new shift is created");
                setHallOptions([]);
                setSelectedHallId('');
                setCapacity(0);
                setFee(0);
                setStartAt('');
                setEndAt('');
                setShiftName('');
                onClose();
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={`modal-overlay ${isOpen ? 'active' : ''}`} onClick={onClose}>
            <div className={`modal-content ${isOpen ? 'active' : ''}`} onClick={(e) => e.stopPropagation()}>
                <div className='cross-icon-container'>
                    <img title='close' src={CrossIcon} onClick={onClose} />
                </div>

                <h2>Add new Shift</h2>
                <form className="form" onSubmit={handleCreateShift}>
                    <div>
                        <label htmlFor="hall">Hall name</label>
                        <select
                            id="hall"
                            value={selectedHallId}
                            onChange={(e) => setSelectedHallId(e.target.value)}
                            required
                        >
                            {hallOptions.length > 0 ? (
                                hallOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))
                            ) : (
                                <option value="">No halls available</option>
                            )}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="shift">Shift name</label>
                        <input
                            type="text"
                            id="shift"
                            value={shiftName}
                            onChange={(e) => setShiftName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="capacity">Capacity</label>
                        <input
                            type="number"
                            id="capacity"
                            value={capacity}
                            onChange={(e) => setCapacity(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="fee">Fee</label>
                        <input
                            type="number"
                            id="fee"
                            value={fee}
                            onChange={(e) => setFee(e.target.value)}
                            required
                        />
                    </div>
                    <h3>Timing of the Hall</h3>
                    <div>
                        <label htmlFor="start-time">Start at</label>
                        <input
                            type="time"
                            id="start-time"
                            value={startAt}
                            onChange={(e) => setStartAt(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="end-time">Closes at</label>
                        <input
                            type="time"
                            id="end-time"
                            value={endAt}
                            onChange={(e) => setEndAt(e.target.value)}
                            required
                        />
                    </div>
                    <Button>Submit</Button>
                </form>
            </div>
        </div>
    );
};

export default ShiftForm;
