/* eslint-disable react/prop-types */
// import { useState } from 'react';
// import { v4 as uuidv4 } from 'uuid';
// import './SeatCard.css';
// import { useNavigate } from 'react-router-dom';

// const SeatCard = ({ shift }) => {
//     const navigate = useNavigate();
//     const [seats, setSeats] = useState(() => {
//         return Array(shift.capacity).fill({ vacant: true });

//     });

//     const toggleSeatStatus = (index) => {
//         const updatedSeats = seats.map((seat, i) => {
//             if (i === index ) {
//                 return { ...seat, vacant: !seat.vacant };
//             }
//             return seat;
//         });
//         setSeats(updatedSeats);
//     };

//     const handleNavigation = ()=>{
//         navigate(`./${shift.id}`);
//     }

//     return (
//         <div className='seatgrid-container'>
//             <div className="seats-container">
//                 {seats.map((seat, index) => (
//                     <div
//                         key={uuidv4()}
//                         className={`seat ${seat.empty ? 'dummy' : (seat.vacant ? 'vacant' : 'occupied')}`}
//                         onClick={() => toggleSeatStatus(index)}
//                     >
//                     {
//                         index < shift.capacity && <div className='seat-number'>{index+1}</div>
//                     }
//                     </div>
//                 ))}
//             </div>
//             <div className='hall-details'>
//                 <div className='hall-name' onClick={handleNavigation}>{shift.name}</div>
//                 <div className='timing'>Timing {shift.start_time} - {shift.end_time}</div>
//                 <div className='fee'> </div>
//             </div>
//         </div>
//     );
// };

// export default SeatCard;

import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import './SeatCard.css';

const SeatCard = ({ shift }) => {
    const navigate = useNavigate();
    const [seats, setSeats] = useState(() => {
        return Array(shift.capacity).fill({ vacant: true });
    });

    const toggleSeatStatus = (index) => {
        const updatedSeats = seats.map((seat, i) => {
            if (i === index) {
                return { ...seat, vacant: false};
            }
            return seat;
        });
        setSeats(updatedSeats);
    };

    const handleNavigation = () => {
        navigate(`./${shift.id}`);
    };

    return (
        <div className='seatcard-container'>
            <div className="seatcard-seats">
                {seats.map((seat, index) => (
                    <div
                        key={uuidv4()}
                        className={`seat ${seat.vacant ? 'vacant' : 'occupied'}`}
                        onClick={() => toggleSeatStatus(index)}
                    >
                        {
                            index < shift.capacity && <div className='seat-number'>{index + 1}</div>
                        }
                    </div>
                ))}
            </div>
            <div className='seatcard-details'>
                <div className='hall-name' onClick={handleNavigation}>{shift.name}</div>
                <div className='timing'>Timing: {shift.start_time} - {shift.end_time}</div>
                <div className='fee'>Price: {shift.fee}</div>
            </div>
        </div>
    );
};

export default SeatCard;
