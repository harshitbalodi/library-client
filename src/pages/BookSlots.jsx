import '../index.css'
import Shift from "../components/Shift";

const BookSlots = ({shifts, setShifts}) => {
  
  return shifts&&(
    <div>
      <div className="main-container">
      {
        shifts.map(shift=>{
          return <Shift  key={shift.id} shift={shift}/>
        })
      } 
      </div>
    </div>
  )
}

export default BookSlots