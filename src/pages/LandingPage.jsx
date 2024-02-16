import { useNavigate } from "react-router-dom"

const LandingPage = () => {
    const navigate = useNavigate();
    const handleClick = ()=>{
        navigate('/shift');
    }
  return (
    <div onClick={handleClick} style={{color:"blue"}}>Book a Timeslot according to your convinence</div>
  )
}

export default LandingPage