import '../index.css'
import AddHall from '../components/AddHall/AddHall';
import { useSelector } from 'react-redux';
import SeatCard from '../components/SeatCard/SeatCard';

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
        <AddHall/>
      </div>
    </div>
  )
}

export default BookSlots