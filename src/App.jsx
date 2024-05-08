import Footer from "./components/Footer/Footer"
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import HallPage from "./pages/HallPage/HallPage";
import Dashboard from "./pages/Dashboard/Dashboard";
import { useDispatch, useSelector } from "react-redux";
import LoginPage from "./pages/LoginPage/LoginPage";
import { hallsThunk, setHalls } from './store/hallSlice';
import BookingPage from "./pages/BookingPage/BookingPage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import TokenService from "./services/TokenService";
import ChangePassword from "./pages/ChangePassword/ChangePassword";
import token from "./services/token";
import { getCookie } from "./utils/helper";
import { logIn } from "./store/authSlice";
import { setStudents, studentThunk } from "./store/studentsSlice";
import { setShifts } from "./store/shiftSlice";
import Notification from "./components/Notification/Notification";
import Payments from "./pages/Payment/Payments";
import { setErrorMessage } from "./store/notificationSlice";
import NoDp from './assets/no-dp.jpg';
import ArrowDown from './assets/arrow-down-black.svg';
import useLogoutUser from "./hooks/useLogoutUser";
import HamburgerIcon from './assets/hamburger-menu.svg';
import { toggleSidebar } from "./store/SidebarSlice";

function App() {
  const dispatch = useDispatch();
  const [sidebar, adminLoggedIn] = useSelector(state => [state.sidebar, state.auth.adminLoggedIn]);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const logoutUser = useLogoutUser();

  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
  const [hamburgerVisible, setHamburgerVisible] = useState(true);
  useEffect(() => {
    const getdata = async () => {
      try {
        dispatch(hallsThunk());
        dispatch(studentThunk());
      } catch (error) {
        console.log(error);
        dispatch(setErrorMessage(error.message));
      }
    }
    if (adminLoggedIn) getdata();
    if (!adminLoggedIn) {
      dispatch(setHalls(null));
      dispatch(setStudents(null));
      dispatch(setShifts(null));
    }
    const clearId = setInterval(getdata, 300000)
    return () => clearInterval(clearId);
  }, [adminLoggedIn]);

  useEffect(() => {
    const isUserLoggedIn = async () => {
      const refresh = getCookie("refresh");
      if (refresh) {
        try {
          const { data } = await TokenService.authenticateUser(refresh);
          dispatch(logIn());
          token.setToken(data.access);
        } catch (error) {
          console.log(error);
          if (error?.response?.status === 401) {
            logoutUser();
            dispatch(setErrorMessage("Your session has expired. Please login again."));
          } else {
            dispatch(setErrorMessage(error?.response?.data?.message));
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll);

    isUserLoggedIn();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;
    const scrollDirection = currentScrollPos > prevScrollPos ? 'down' : 'up';

    const buffer = 40;
    const shouldBeVisible = scrollDirection === "up" || (currentScrollPos - prevScrollPos) < buffer;
    setHamburgerVisible(shouldBeVisible);
    setPrevScrollPos(currentScrollPos);
  }
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    console.log('Logout clicked');
    logoutUser();
  };

  return (
    <div>
      <div className="body-container">

        <Notification />
        <div className="middle-container">
          {adminLoggedIn && <div>
            <Sidebar />
          </div>}

          <div className={`routes-container ${sidebar && "sidebar-active"}`}>
            {adminLoggedIn && <div className="dropdown-container">
              <button className='dropdown-button' onClick={toggleDropdown}><img className='dp-img' src={NoDp} alt="" /> <img src={ArrowDown} className='dropdown-img' alt="" /></button>
              {isOpen && (
                <ul className="dropdown-menu">
                  <li onClick={() => navigate('/change-password')}>Change password</li>
                  <li onClick={handleLogout}>Logout</li>
                </ul>
              )}
            </div>
            }
            {hamburgerVisible && !sidebar && <div
              className="hamburger-menu"
              onClick={() => dispatch(toggleSidebar())}
            >
              <img width={30} src={HamburgerIcon} alt="" />
            </div>
            }


            <Routes>
              {
                !adminLoggedIn ? (
                  <>
                    <Route path="/" element={<LoginPage />} />
                  </>
                )
                  : (
                    <>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/hall" element={<HallPage />} />
                      <Route path="/booking" element={<BookingPage />} />
                      <Route path="/change-password" element={<ChangePassword />} />
                      <Route path="/payments" element={<Payments />} />
                    </>
                  )
              }
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  )
}


export default App
