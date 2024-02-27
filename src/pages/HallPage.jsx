import { useSelector } from "react-redux"
import '../index.css';
import CustomCarousel from "../components/CustomCarousel/CustomCarousel";
import Shimmer from "../components/Shimmer/Shimmer";

const HallPage = () => {
  const halls = useSelector(state => state.halls);
  console.log(halls);
  return !halls ? <Shimmer /> : (
    <div >
      {
        halls.map(hall => {
          return (<div key={hall.id} >
            <CustomCarousel hall={hall} />
            <hr />
          </div>)
        })

      }
    </div>
  )
}

export default HallPage