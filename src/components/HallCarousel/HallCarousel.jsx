/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { useRef, useState} from "react";
import Card from "./Card";

const Carousel = ({ shifts }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const carouselRef = useRef(null);
  
    const handleNext = () => {
      console.log('Next clicked');
      if (currentIndex < shifts.length - 1) {
        console.log('Current Index:', currentIndex);
        setCurrentIndex((prevIndex) => prevIndex + 1);
        console.log('New Index:', currentIndex + 1);
      }
    };
  
    const handlePrev = () => {
      console.log('Prev clicked');
      if (currentIndex > 0) {
        console.log('Current Index:', currentIndex);
        setCurrentIndex((prevIndex) => prevIndex - 1);
        console.log('New Index:', currentIndex - 1);
      }
    };
  
    return (
      <div className="carousel-container">
        <button className="prev" onClick={handlePrev} disabled={currentIndex === 0}>
          ←
        </button>
        <div className="carousel" ref={carouselRef}>
          {shifts.map((shift, index) => (
            <Card key={index} shift={shift}  currentIndex={currentIndex} index={index} />
          ))}
        </div>
        <button className="next" onClick={handleNext} disabled={currentIndex === shifts.length - 1}>
          →
        </button>
      </div>
    );
  };

const HallCarousel = ({hallId}) => {
    const shifts = useSelector(state => {
        console.log(state.shifts);
        const filteredshifts  = state.shifts.filter(state =>{
            console.log("shift hall id",state.hall.id);
            console.log("hallid",hallId);
            return state.hall.id == hallId;
        })
        return filteredshifts;
    })
    
  return (
    <div>
        <Carousel shifts={shifts}/>
    </div>
  )
}

export default HallCarousel