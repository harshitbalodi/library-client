import '../index.css'
// import SeatGrid from "../components/SeatGrid";
import AddHall from '../components/AddHall';
import { useSelector } from 'react-redux';
import SeatCard from '../components/SeatCard/SeatCard';

const BookSlots = () => {
  const shifts = useSelector(state => state.shifts);
  return shifts && (
    <div>
      <div className="booking-container">
        {/* {
          shifts.map(shift => {
            return <SeatGrid key={shift.id} shift={shift} />
          })
        } */}
        {
          shifts.map(shift => {
            return <SeatCard key={shift.id} shift={shift} />
          })
        }
        <AddHall/>
      </div>
    </div>
  )
}

export default BookSlots