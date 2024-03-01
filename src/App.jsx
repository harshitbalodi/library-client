import Footer from "./components/Footer"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from "./pages/LandingPage/LandingPage";
import { useEffect } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header/Header";
import HallPage from "./pages/HallPage/HallPage";
import Dashboard from "./pages/Dashboard/Dashboard";
import { useDispatch } from "react-redux";
import StudentPage from "./pages/StudentPage/StudentPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import ShiftPage from "./pages/ShiftPage/ShiftPage";
import { setHallsThunk } from './store/hallSlice';
import BookingPage from "./pages/BookingPage/BookingPage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import TokenService from "./services/TokenService";
import { setAccess, setToken } from "./store/authSlice";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const getdata = async () => {
      try {
        dispatch(setHallsThunk());
      } catch (error) {
        console.log(error);
      }
    }
    const isUserLoggedIn = async () => {
      const refreshToken = localStorage.getItem('refreshToken');
      console.log(refreshToken);
      if (refreshToken) {
        try {
          const {data} = await TokenService.authenticateUser(refreshToken);
          dispatch(setToken({refresh:refreshToken, access: data.access}));
        } catch (error) {
          console.log(error);
        }
      }

    }

    isUserLoggedIn();
    getdata();
    const clearId = setInterval(getdata, 45000)
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
          <div className="routes-container">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/shift" element={<ShiftPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/hall" element={<HallPage />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="/student/:id" element={<StudentPage />} />
              <Route path="/booking" element={<BookingPage />} />
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
