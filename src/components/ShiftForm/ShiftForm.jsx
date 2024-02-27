import Button from '../Button/Button';
import './ShiftForm.css';
import CrossIcon from '../../assets/cross-icon.svg';
import { useState } from 'react';
import { useSelector } from 'react-redux';
// import { ToastContainer, toast } from "react-toastify";
import shiftServices from '../../services/shiftServices';

const ShiftForm = ({ isOpen, onClose, hall }) => {
    const halls = useSelector(state => state.halls);
    console.log(halls);
    const [hallName, setHallName] = useState(hall?.name || '');
    const [shiftName, setShiftName] = useState('');
    const [capacity, setCapacity] = useState(0);
    const [fee, setFee] = useState(0);
    const [startAt, setStartAt] = useState('');
    const [endAt, setEndAt] = useState('');
    let hallId = hall?.id;
    console.log("hallId", hallId);
    const handleCreateHall = async (event) => {
        event.preventDefault();
        console.log('create hall clicked');
        console.log(hallName, capacity, startAt, endAt);
        const shiftObj={
            name:shiftName,
            capacity,
            start_time:startAt,
            end_time: endAt,
            fee   
        }
        if(!hallId){
            const filteredHalls = halls.filter( hall=> hall.name === hallName);
            if(filteredHalls.length > 1){
                // toast.error('more than 1 Hall with same name');
                console.log('more than 1 Hall with same name');
                return;
            }
            else if(filteredHalls.length === 0){
                // toast.error('no Hall with such name,check all hall names');
                console
                return;
            }
            shiftObj.hall = filteredHalls[0].id;
        }else{
            shiftObj.hall = hall.id;
        }

        if(shiftObj.hall){
            try{
                const response = await shiftServices.addShift(shiftObj);
                console.log(response);
            }catch(error){
                console.log(error);
            }
        }
        setHallName('');
        setCapacity(0);
        setFee(0);
        setStartAt('');
        setEndAt('');
        setShiftName('');
    };

    return (
        <div className={`modal-overlay ${isOpen ? 'active' : ''}`} onClick={onClose}>
            {/* <ToastContainer/> */}
            <div className={`modal-content ${isOpen ? 'active' : ''}`} onClick={(e) => e.stopPropagation()}>
                <img src={CrossIcon} onClick={onClose} />
                <h2>Add new Shift</h2>
                <form className="form" onSubmit={handleCreateHall}>
                    <div>
                        <label htmlFor="hall">Hall name</label>
                        <input
                            type="text"
                            id="hall"
                            value={hallName}
                            onChange={(e) => setHallName(e.target.value)}
                            required
                        />
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