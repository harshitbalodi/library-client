import Slider from 'react-slick';
import './HallCarousel.css';
import SeatCard from '../SeatCard/SeatCard';

const HallCarousel = ({ hall }) => {
  console.log(hall);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3, 
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <div className="hall-carousel">
      <Slider {...settings}>
        {
          hall.shifts.map(shift => (
            <SeatCard key={shift.id} shift={shift} />
          ))
        }

      </Slider>
    </div>
  );
};

export default HallCarousel;
