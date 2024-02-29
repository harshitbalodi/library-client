import { useSelector } from "react-redux"
import '../../index.css';
import CustomCarousel from "../../components/CustomCarousel/CustomCarousel";
import Shimmer from "../../components/Shimmer/Shimmer";
import { ToastContainer } from "react-toastify";
import AddHall from "../../components/AddHall/AddHall";

const HallPage = () => {
  const halls = useSelector(state => state.halls);
  console.log(halls);
  return !halls ? <Shimmer /> : (
    <div >
      <ToastContainer/>
      {
        halls.map(hall => {
          return (<div key={hall.id} >
            <CustomCarousel hall={hall} />
            <hr />
          </div>)
        })
      }
      <AddHall/>
    </div>
  )
}

export default HallPage