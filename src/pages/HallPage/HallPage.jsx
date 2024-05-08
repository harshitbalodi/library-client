import { useSelector } from "react-redux"
import '../../index.css';
import CardCarousel from "../../components/CardCarousel/CardCarousel";
import Shimmer from "../../components/Shimmer/Shimmer";
import AddHall from "../../components/AddHall/AddHall";
import Button from "../../components/Button/Button";
import './HallPage.css';
import { useNavigate } from "react-router-dom";

const HallPage = () => {
  const [halls, seat] = useSelector(state => [state.halls, state.seat]);
  const navigate = useNavigate();
  console.log(seat);
  return !halls ? <Shimmer /> : (
    <div  className="hall-page">
      <div className='booking-btn'>
        {seat && <Button onClick={() => navigate(`/booking?desk=${seat.id}&shift=${seat.shift.id}`)} >Proceed</Button>}
      </div>
      {
        halls.map(hall => {
          return (<div key={hall.id} className="hall-carousel-container" >
            <CardCarousel hall={hall} />
            <hr />
          </div>)
        })
      }
      <AddHall />
    </div>
  )
}

export default HallPage