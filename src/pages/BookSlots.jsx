import '../index.css'
import SeatGrid from "../components/SeatGrid";

const BookSlots = ({ shifts, setShifts }) => {

  return shifts && (
    <div>
      <div className="booking-container">
        {
          shifts.map(shift => {
            return <SeatGrid key={shift.id} shift={shift} />
          })
        }
      </div>
    </div>
  )
}

export default BookSlots