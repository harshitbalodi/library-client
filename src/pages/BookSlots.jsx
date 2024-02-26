import '../index.css'
import { useSelector } from 'react-redux';
import SeatCard from '../components/SeatCard/SeatCard';
import AddShift from '../components/AddShift/AddShift';

const BookSlots = () => {
  const halls = useSelector(state => state.halls);
  return halls && (
    <div>
      <div className="booking-container">
        {
          halls.map(hall=> hall.shifts.map(shift => {
            return <SeatCard key={shift.id} shift={shift} />
          })
          ) 
        }
        <AddShift/>
      </div>
    </div>
  )
}

export default BookSlots