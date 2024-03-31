import { useSelector } from "react-redux"
import '../../index.css';
import CustomCarousel from "../../components/CustomCarousel/CustomCarousel";
import Shimmer from "../../components/Shimmer/Shimmer";
import { ToastContainer } from "react-toastify";
import AddHall from "../../components/AddHall/AddHall";
import Button from "../../components/Button/Button";
import './HallPage.css';
import { useNavigate } from "react-router-dom";

const HallPage = () => {
  const [halls, seat] = useSelector(state => [state.halls, state.seat]);
  const navigate = useNavigate();
  return !halls ? <Shimmer /> : (
    <div >
      <ToastContainer />
      <div className='booking-btn'>
        {seat && <Button onClick={() => navigate('/booking')} >Proceed</Button>}
      </div>
      {
        halls.map(hall => {
          return (<div key={hall.id} >
            <CustomCarousel hall={hall} />
            <hr />
          </div>)
        })
      }
      <AddHall />
    </div>
  )
}

export default HallPage