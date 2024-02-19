import { useEffect } from "react"
import hallServices from "../services/hallServices"
import { setHalls } from "../store/hallSlice"
import { useDispatch, useSelector } from "react-redux"
import HallCarousel from "../components/HallCarousel/HallCarousel"

const HallPage = () => {
  const dispatch = useDispatch();
  const halls = useSelector(state => state.halls);
  console.log(halls);
  console.log(halls);
  useEffect(()=>{
    const getdata = async () => {
      try {
        const { data } = await hallServices.getall();
        console.log(data);
        dispatch(setHalls(data));
      } catch (error) {
        console.log(error);
      }
    }
    getdata();
  },[])

  return (
    <div>HallPage
      {
        halls.map(hall=>{
          return <><div>{hall.name}</div>
          <HallCarousel key={hall.id} hallId = {hall.id}/>
          </>
        })
      }
    </div>
  )
}

export default HallPage