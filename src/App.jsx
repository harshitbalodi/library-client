import Footer from "./components/Footer/Footer"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from "./pages/LandingPage/LandingPage";
import { useEffect } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header/Header";
import HallPage from "./pages/HallPage/HallPage";
import Dashboard from "./pages/Dashboard/Dashboard";
import { useDispatch, useSelector } from "react-redux";
import StudentPage from "./pages/StudentPage/StudentPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import ShiftPage from "./pages/ShiftPage/ShiftPage";
import { hallsThunk } from './store/hallSlice';
import BookingPage from "./pages/BookingPage/BookingPage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import TokenService from "./services/TokenService";
import ChangePassword from "./pages/ChangePassword/ChangePassword";
import token from "./services/token";
import { getCookie } from "./utils/helper";
import { logIn } from "./store/authSlice";
import { studentThunk } from "./store/studentsSlice";

function App() {
  const dispatch = useDispatch();
  const sidebar = useSelector(state => state.sidebar);
  useEffect(() => {
    const getdata = async () => {
      try {
        dispatch(hallsThunk());
        dispatch(studentThunk());
      } catch (error) {
        console.log(error);
      }
    }
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
    getdata();
    const clearId = setInterval(getdata, 300000)
    return () => clearInterval(clearId);
  }, [])
  return (
    <Router>
      <div className="body-container">
        <Header />

        <div className="middle-container">
          <div>
            <Sidebar />
          </div>
          <div className={`routes-container ${sidebar && "sidebar-active"}`}>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/shift" element={<ShiftPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/hall" element={<HallPage />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="/student/:id" element={<StudentPage />} />
              <Route path="/booking" element={<BookingPage />} />
              <Route path="/change-password" element={<ChangePassword />} />
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
