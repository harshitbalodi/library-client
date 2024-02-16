/* eslint-disable react/prop-types */
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import '../index.css';
import { useNavigate } from 'react-router-dom';

const Shift = ({ shift }) => {
    const navigate = useNavigate();
    const [seats, setSeats] = useState(() => {
        const initialSeats = Array(32).fill({ vacant: true });
        return initialSeats.slice(0, shift.capacity).concat(Array(32 - shift.capacity).fill({ empty: true  }));
    });

    const toggleSeatStatus = (index) => {
        const updatedSeats = seats.map((seat, i) => {
            if (i === index && i < shift.capacity) {
                return { ...seat, vacant: !seat.vacant };
            }
            return seat;
        });
        setSeats(updatedSeats);
    };

    const handleNavigation = ()=>{
        navigate(`./${shift.id}`);
    }

    return (
        <div className='hall'>
            <div className='hall-details'>
                <div className='hall-name' onClick={handleNavigation}>{shift.name}</div>
                <div className='timing'>Timing {shift.start_time} - {shift.end_time}</div>
            </div>
            <div className="seats-container">
                {seats.map((seat, index) => (
                    <div
                        key={uuidv4()}
                        className={`seat ${seat.empty ? 'dummy' : (seat.vacant ? 'vacant' : 'occupied')}`}
                        onClick={() => toggleSeatStatus(index)}
                    >
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Shift;
