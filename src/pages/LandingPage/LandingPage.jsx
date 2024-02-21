import { useEffect, useState } from 'react';
import Button from '../../components/Button/Button';
import './LandingPage.css';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();
  const [callforaction, setCallforAction] = useState(false);
  const [IsbuttonVisible, setIsButtonVisible] = useState(false);
  useEffect(()=>{
    const callForActionInterval = setInterval(() => setCallforAction(true), 1800);
    const buttonVisibleInterval = setInterval(() => setIsButtonVisible(true), 3100);
    
    return () => {
      clearInterval(callForActionInterval);
      clearInterval(buttonVisibleInterval);
    };
  },[])
  const handleClick = ()=>{
    navigate('/shift');
  }

  return (
    <div className="parent-container">
      <div className="typing-animation">
        <p>
          Feel Stuck!
          <br /> 
          <span className='first-typed-text'>Don`t have a place to study.</span>
          <br />
          <span className={callforaction?"second-typed-text":"suspense"}>
            We have your back
          </span>
        </p>
        <div className='btn'>
          {IsbuttonVisible && <Button onClick={handleClick}>Book a seat</Button>}
        </div>
       
      </div>
    </div>
  )
}

export default LandingPage