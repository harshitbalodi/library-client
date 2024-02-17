import '../index.css'
import SeatGrid from "../components/SeatGrid";
import AddHall from '../components/AddHall';

const BookSlots = ({ shifts, setShifts }) => {

  return shifts && (
    <div>
      <div className="booking-container">
        {
          shifts.map(shift => {
            return <SeatGrid key={shift.id} shift={shift} />
          })
        }
        <AddHall/>
      </div>
    </div>
  )
}

export default BookSlots