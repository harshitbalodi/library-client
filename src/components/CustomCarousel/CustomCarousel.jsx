import { useEffect, useState } from 'react';
import './CustomCarousel.css';
import SeatCard from '../SeatCard/SeatCard';
import RightArrow from '../../assets/arrow-circle-right.svg'
import LeftArrow from '../../assets/arrow-circle-left.svg'
import AddShift from '../AddShift/AddShift';

const CustomCarousel = ({  hall }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [numberOfCarouselSlide, setNumberOfCarousel] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      const windowSize = window.innerWidth;
      if (windowSize > 1385) {
        setNumberOfCarousel(3);
      } else if (windowSize > 945) {
        setNumberOfCarousel(2);
      } else {
        setNumberOfCarousel(1);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const goToPrevSlide = () => {
    setCurrentSlide(prevSlide => Math.max(0, prevSlide - 1));
  };

  const goToNextSlide = () => {
    const nextSlide = currentSlide + 1;
    const maxSlideIndex = Math.max(0, hall.shifts.length - numberOfCarouselSlide +1);
    setCurrentSlide(Math.min(nextSlide, maxSlideIndex));
  };
 
  return (
    <div>
      <h1 >{hall.name}</h1>
      <div className="custom-carousel">
        <div className="carousel-button prev" onClick={goToPrevSlide}>
          <img src={LeftArrow} alt='&lt;' />
        </div>
        <div className="slides-container">
          {hall.shifts.slice(currentSlide, currentSlide + numberOfCarouselSlide).map((shift) => (
            <SeatCard key={shift.id} shift={shift} />
          ))}
          {currentSlide + numberOfCarouselSlide > hall.shifts.length && <AddShift hall={hall}/>}
        </div>
        <div className="carousel-button next" onClick={goToNextSlide}>
          <img src={RightArrow} alt="&gt;" />
        </div>
      </div>
    </div>
  );
};

export default CustomCarousel;
