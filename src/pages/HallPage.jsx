import { useSelector } from "react-redux"
// import HallCarousel from "../components/HallCarousel/HallCarousel"
import '../index.css';
import CustomCarousel from "../components/CustomCarousel/CustomCarousel";

const HallPage = () => {
  const halls = useSelector(state => state.halls);
  console.log(halls);
  return (
    <div >HallPage
       {
        halls.map(hall=>{
          return  <CustomCarousel key={hall.id} shifts={hall.shifts} name={hall.name}/>
        })
      
      } 
    </div>
  )
}

export default HallPage