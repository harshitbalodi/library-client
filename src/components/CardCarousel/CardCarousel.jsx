/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import './CardCarousel.css';
import SeatCard from '../SeatCard/SeatCard';
import RightArrow from '../../assets/arrow-circle-right.svg'
import LeftArrow from '../../assets/arrow-circle-left.svg'
import AddShift from '../AddShift/AddShift';
import DeleteIcon from '../../assets/delete-icon.svg';
import EditIcon from '../../assets/edit-icon.svg';
import CancelIcon from '../../assets/cancel-icon.svg';
import DoneIcon from '../../assets/done-icon.svg';
import hallServices from '../../services/hallServices';
import { useDispatch } from 'react-redux';
import { hallsThunk } from '../../store/hallSlice';
import { setErrorMessage, setSuccessMessage } from '../../store/notificationSlice';
import useLogoutUser from '../../hooks/useLogoutUser';

const CardCarousel = ({ hall }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [numberOfCarouselSlide, setNumberOfCarousel] = useState(null);
  const [isHovering, setIsHovering] = useState(false);
  const [hallName, setHallName] = useState(hall.name || '');
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();
  const logoutUser = useLogoutUser();

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
    const maxSlideIndex = Math.max(0, hall.shifts.length - numberOfCarouselSlide + 1);
    setCurrentSlide(Math.min(nextSlide, maxSlideIndex));
  };

  const handleDelete = async () => {
    console.log("hall delete clicked...")
    const approve = window.confirm(`You want to delete ${hall.name}?`)
    if (!approve) return;
    try {
      const response = await hallServices.deleteHall(hall.id);
      dispatch(setSuccessMessage(`${hall.name} is deleted successfully!`))
      dispatch(hallsThunk());
      console.log(response);
    } catch (error) {
      if (error?.response?.status === 401) {
        logoutUser();
        dispatch(setErrorMessage("Your session has expired. Please login again."));
      } else {
        dispatch(setErrorMessage(error.response.data.message));
      }
    }
  }

  const handleEdit = async (e) => {
    e.preventDefault();
    console.log("hall edit clicked");
    try {
      const response = await hallServices.editHall(hall.id, { name: hallName });
      setEdit(false);
      dispatch(setSuccessMessage(`${hall.name} is edited successfully!`))
      dispatch(hallsThunk());
      console.log(response);
    } catch (error) {
      console.log(error);
      if (error?.response?.status === 401) {
        logoutUser();
        dispatch(setErrorMessage("Your session has expired. Please login again."));
      } else {
        dispatch(setErrorMessage(error.response.data.message));
      }
    }
  }

  return (
    <div onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
      <div className='hall-heading'>
        {edit ? <form onSubmit={handleEdit}>
          <input type="text" value={hallName} onChange={(e) => setHallName(e.target.value)} required />
          <button className='done-btn'>
            <img src={DoneIcon} alt="done edit" title='done edit' />
          </button>
        </form> :
          hall.name
        }
        {
          isHovering && <div>
            {
              !edit ? <div>
                <img title="Edit Hall Name" onClick={() => setEdit(true)} src={EditIcon} alt="edit hall name" />
                <img title='Delete Hall' onClick={handleDelete} src={DeleteIcon} alt="delete hall" />
              </div> :
                <div>
                  <img title='cancel edit' onClick={() => setEdit(false)} src={CancelIcon} alt="cancel edit" />
                </div>
            }
          </div>
        }
      </div>
      <div className="custom-carousel">
        {
          currentSlide !== 0 && <div className="carousel-button prev" onClick={goToPrevSlide}>
            <img src={LeftArrow} alt='&lt;' />
          </div>
        }
        <div className="slides-container">
          {hall.shifts.slice(currentSlide, currentSlide + numberOfCarouselSlide).map((shift) => (
            <SeatCard key={shift.id} shift={shift} />
          ))}
          {currentSlide + numberOfCarouselSlide > hall.shifts.length && <AddShift hall={hall} />}
        </div>
        {(currentSlide + numberOfCarouselSlide < hall.shifts.length + 1) &&
          <div className="carousel-button next" onClick={goToNextSlide}>
            <img src={RightArrow} alt="&gt;" />
          </div>
        }
      </div>
    </div>
  );
};

export default CardCarousel;
