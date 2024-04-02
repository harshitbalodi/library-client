import Footer from "./components/Footer/Footer"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header/Header";
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
import { ToastContainer } from "react-toastify";
import { setShifts } from "./store/shiftSlice";
function App() {
  const dispatch = useDispatch();
  const [sidebar, adminLoggedIn] = useSelector(state => [state.sidebar, state.auth.adminLoggedIn]);
  console.log(adminLoggedIn)
  useEffect(() => {
    const getdata = async () => {
      try {
        dispatch(hallsThunk());
        dispatch(studentThunk());
      } catch (error) {
        console.log(error);
      }
    }
    if (adminLoggedIn) getdata();
    if(!adminLoggedIn){
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
      console.log("refresh from cookies", refresh);
      if (refresh) {
        try {
          const { data } = await TokenService.authenticateUser(refresh);
          dispatch(logIn());
          token.setToken(data.access);
        } catch (error) {
          console.log(error);
        }
      }
    }

    isUserLoggedIn();
  }, []);
  return (
    <Router>
      <div className="body-container">
        <ToastContainer />
        <Header />
        <div className="middle-container">
          {adminLoggedIn &&<div>
            <Sidebar />
          </div>}
          <div className={`routes-container ${sidebar && "sidebar-active"}`}>
            <Routes>
              {
                !adminLoggedIn ? (
                  <Route path="/" element={<LoginPage />} />
                )
                  : (
                    <>
                      <Route path="/" element={<LoginPage />} />
                      <Route path="/hall" element={<HallPage />} />
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/booking" element={<BookingPage />} />
                      <Route path="/change-password" element={<ChangePassword />} />
                    </>
                  )
              }
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </div>
        </div>

        <Footer />
      </div>
    </Router>
  )
}


export default App
