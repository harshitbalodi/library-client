import { useState } from 'react';
import './CustomCarousel.css'; 
import SeatCard from '../SeatCard/SeatCard';

const CustomCarousel = ({ shifts,name }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const goToPrevSlide = () => {
        setCurrentSlide(prevSlide => Math.max(0, prevSlide - 1));
    };
  
    const goToNextSlide = () => {
        setCurrentSlide(prevSlide => Math.min(shifts.length - 3, prevSlide + 1));
    };
  

  return (
    <div>
        <h1>
            {name}
        </h1>
        <div className="custom-carousel">
    <button className="carousel-button prev" onClick={goToPrevSlide}>
      &lt;
    </button>
    <div className="slides-container">
      {shifts.slice(currentSlide, currentSlide + 3).map((shift) => (
        <SeatCard  key={shift.id} shift={shift}/>
      ))}
    </div>
    <button className="carousel-button next" onClick={goToNextSlide}>
      &gt;
    </button>
  </div>
    </div>
    
  );
};

export default CustomCarousel;
