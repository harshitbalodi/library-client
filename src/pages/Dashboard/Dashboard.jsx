import "./Dashboard.css";
import SearchBar from "../../components/SearchBar/SearchBar";
import StudentReport from "../../components/StudentReport/StudentReport";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { extractNewBooking } from "../../utils/helper";
import { setErrorMessage } from "../../store/notificationSlice";
import useLogoutUser from "../../hooks/useLogoutUser";
import paymentService from "../../services/paymentService";

const Dashboard = () => {
  const students = useSelector(state => state.students);
  const [filteredStudents, setFilteredStudents] = useState(null);
  const [lengths, setLengths] = useState({
    all: 0,
    new: 0,
    expired: 0
  })
  const [collectionData, setCollectionData] = useState(null);
  const dispatch = useDispatch();
  const logoutUser = useLogoutUser();

  console.log("collectionData", collectionData);
  useEffect(() => {
    const getCollectionData = async () => {
      try {
        const response = await paymentService.getPaymentCollection();
        console.log(response);
        setCollectionData(response.data.data);
      } catch (error) {
        console.log("error in dashboard", error);
        if (error?.response?.status === 401) {
          logoutUser();
          dispatch(setErrorMessage("Your session has expired. Please login again."));
        } else {
          dispatch(setErrorMessage(error.response.data.message));
        }
      }
    }
    getCollectionData();
  }, []);

  useEffect(() => {
    if (students) {
      setLengths(() => {
        return {
          all: students.length,
          new: extractNewBooking(students)?.length,
          expired: students.filter(student => student.is_expired).length,
        }
      })
    }
  }, [students]);

  return (
    <div className="dashboard-container">
      <SearchBar />
      <div className="member-block-container">
        <div className="member-block voilet-gradient">
          <p>Total Member</p>
          <h2>{lengths?.all}</h2>
          <p>People</p>
        </div>
        <div className="member-block blue-gradient">
          <p>New Member</p>
          <h2>{lengths?.new}</h2>
          <p>People</p>
        </div>
        <div className="member-block orange-gradient">
          <p>Expired Member</p>
          <h2>{lengths?.expired}</h2>
          <p>People</p>
        </div>
        <div className="member-block blue-gradient">
          <p>Today Collection</p>
          <h2>{collectionData?.today_fees}</h2>
          <p>Rupees</p>
        </div>
        <div className="member-block voilet-gradient">
          <p>Monthly Collection</p>
          <h2>{collectionData?.month_total}</h2>
          <p>Rupees</p>
        </div>
      </div>
      <StudentReport
        students={students}
        filteredStudents={filteredStudents}
        setFilteredStudents={setFilteredStudents}
      />
    </div>
  );
}

export default Dashboard;