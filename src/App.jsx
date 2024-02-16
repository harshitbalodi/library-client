import Footer from "./components/Footer"
import BookSlots from "./pages/BookSlots"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from "./pages/LandingPage";
import { useEffect, useState } from "react";
import roomsServices from "./services/roomsServices";
import Hall from "./pages/Hall";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

function App() {
  const [shifts, setShifts] = useState(null);
  useEffect(() => {
    const getdata = async () => {
      try {
        const { data } = await roomsServices.getall();
        console.log(data);
        setShifts(data);
      } catch (error) {
        console.log(error);
      }

    }
    getdata();

  }, [])
  return (
    <Router>
      <div>
        <Header />
        <div className="main-container">
          <div className="sidebar-container scrollable box">
            <Sidebar/>
          </div>
          <div className="navigation-container scrollable box">
          <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/shift" element={<BookSlots shifts={shifts} setShifts={setShifts} />} />
              <Route path="/shift/:id" element={<Hall shifts={shifts} />} />
            
          </Routes>
          </div>
        </div>

        <Footer />
      </div>
    </Router>
  )
}


export default App
