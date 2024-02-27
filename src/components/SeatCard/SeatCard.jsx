import { useNavigate } from 'react-router-dom';
import './SeatCard.css';
import {formatNumber} from '../../utils/helper';

const SeatCard = ({ shift }) => {

    const toggleSeatStatus = (id) => {
        console.log("desk id is clicked",id);
    };
    
    return (
        <div className='seatcard-container'>
            <div className="seatcard-seats">
                {shift.desks.map((desk, index) => (
                    <div
                        key={desk.id}
                        className={`seat ${desk.is_vacant ? 'vacant' : 'occupied'}`}
                        onClick={() => toggleSeatStatus(desk.id)}
                    >
                        {
                            index < shift.capacity && <div className='seat-number'>{index + 1}</div>
                        }
                    </div>
                ))}
            </div>
            <div className='seatcard-details'>
                <div className='hall-name'>{shift.name}</div>
                <div className='timing'>Timing: {shift.start_time} - {shift.end_time}</div>
                <div className='fee'>Fee: Rs {formatNumber(shift.fee)}</div>
            </div>
        </div>
    );
};

export default SeatCard;
