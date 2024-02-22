import { useEffect, useState } from 'react';
import Button from '../../components/Button/Button';
import './LandingPage.css';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();
  const [callforaction, setCallforAction] = useState(false);
  const [IsbuttonVisible, setIsButtonVisible] = useState(false);
  useEffect(() => {
    const callForActionInterval = setInterval(() => setCallforAction(true), 3100);
    const buttonVisibleInterval = setInterval(() => setIsButtonVisible(true), 5500);

    return () => {
      clearInterval(callForActionInterval);
      clearInterval(buttonVisibleInterval);
    };
  }, [])
  const handleClick = () => {
    navigate('/shift');
  }

  return (
    <div className="parent-container">
      <div className="typing-animation">
        <p>Feel Stuck!</p>
        <div className='first-typed-text'>
          <p >Don`t have a place to study.</p>
        </div>
        <div  className={callforaction ? "second-typed-text" : "suspense"}>
          <p>We have your back</p>
        </div> 
        <div className='nav-btn'>
          {IsbuttonVisible && <Button onClick={handleClick}>Book a seat</Button>}
        </div>
      </div>

    </div>
  )
}

export default LandingPage