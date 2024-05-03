import "./Dashboard.css";
import SearchBar from "../../components/SearchBar/SearchBar";
import StudentReport from "../../components/StudentReport/StudentReport";


const Dashboard = () => {
  return (
    <div className="Dashboard">
      <SearchBar />
      <div className="member-block-container">
        <div className="member-block total">
          <p>Total Member</p>
          <h2>71</h2>
          <p>People</p>
        </div>
        <div className="member-block new">
          <p>New Member</p>
          <h2>4</h2>
          <p>People</p>
        </div>
        <div className="member-block expired">
          <p>Expired Member</p>
          <h2>2</h2>
          <p>People</p>
        </div>
      </div>
      <StudentReport />
    </div>
  );
}

export default Dashboard;