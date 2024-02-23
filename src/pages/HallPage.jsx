import { useSelector } from "react-redux"
// import HallCarousel from "../components/HallCarousel/HallCarousel"
import '../index.css';
import CustomCarousel from "../components/CustomCarousel/CustomCarousel";

const HallPage = () => {
  const halls = useSelector(state => state.halls);
  console.log(halls);
  return (
    <div >
      {
        halls.map(hall => {
          return (<div key={hall.id} >
            <CustomCarousel shifts={hall.shifts} name={hall.name} />
            <hr />
          </div>)
        })

      }
    </div>
  )
}

export default HallPage