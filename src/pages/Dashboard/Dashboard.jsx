import "./Dashboard.css";
import SearchBar from "../../components/SearchBar/SearchBar";
import StudentReport from "../../components/StudentReport/StudentReport";


const Dashboard = () => {
  return (
    <div className="Dashboard">
      <SearchBar />
      <StudentReport />
    </div>
  );
}

export default Dashboard;