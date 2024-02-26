import Footer from "./components/Footer"
import BookSlots from "./pages/BookSlots"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from "./pages/LandingPage/LandingPage";
import { useEffect } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header/Header";
import HallPage from "./pages/HallPage";
import Dashboard from "./pages/Dashboard/Dashboard";
import { useDispatch} from "react-redux";
import deskService from "./services/deskService";
import { desksToHalls } from "./utils/helper";
import { setHalls } from "./store/hallSlice";
import StudentPage from "./pages/StudentPage/StudentPage";
import LoginPage from "./pages/LoginPage/LoginPage";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const getdata = async () => {
      try {
        const { data } = await deskService.getall();
        const newHallData = desksToHalls(data);
        dispatch(setHalls(newHallData));
      } catch (error) {
        console.log(error);
      }
    }
    getdata();
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
            <Route path="/shift" element={<BookSlots />} />
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/hall" element={<HallPage/>}/>
            <Route path="dashboard" element={<Dashboard/>}/>
            <Route path="/student/:id" element={<StudentPage/>}/>
          </Routes>
        </div>
        </div>
        
        <Footer/>
      </div>
    </Router>
  )
}


export default App
