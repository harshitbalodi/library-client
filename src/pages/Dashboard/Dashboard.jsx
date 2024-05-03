import "./Dashboard.css";
import SearchBar from "../../components/SearchBar/SearchBar";
import StudentReport from "../../components/StudentReport/StudentReport";


const Dashboard = () => {
  return (
    <div className="Dashboard">
      <SearchBar />
      <div className="member-block-container">
        <div className="member-block total">
          <h4>Total Member</h4>
          <h1>71</h1>
          <h5>People</h5>
        </div>
        <div className="member-block new">
          <h4>New Member</h4>
          <h1>4</h1>
          <h5>People</h5>
        </div>
        <div className="member-block expired">
          <h4>Expired Member</h4>
          <h1>2</h1>
          <h5>People</h5>
        </div>
      </div>
      <StudentReport />
    </div>
  );
}

export default Dashboard;