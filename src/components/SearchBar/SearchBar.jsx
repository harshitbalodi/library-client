import { useSelector } from "react-redux";
import searchIcon from '../../assets/search-icon.svg';
import { useState, useRef, useEffect } from "react";
import './SearchBar.css';
import { useNavigate } from "react-router-dom";
import { formatNumber, formatTime } from "../../utils/helper";
import NoDp from '../../assets/no-dp.jpg';

const SearchBar = () => {
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const inputRef = useRef(null);
    const students = useSelector(state => state.students);
    const navigate = useNavigate();

    useEffect(() => {
        filterStudents();
    }, [searchQuery])

    const handleChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearch = () => {
        console.log(filteredStudents);
        console.log(filteredStudents[0]?.id);

        if (filteredStudents.length === 1) {
            console.log("wgy id hssbh");
            navigate('/student/' + filteredStudents[0].id);
        }
    }

    const filterStudents = () => {
        if (!searchQuery.trim()) {
            setFilteredStudents([]);
            return;
        }
        setFilteredStudents(() => students.filter(student => student.name.trim().toLowerCase().includes(searchQuery.toLowerCase().trim())));
    };

    const handleBlur = () => {
        if (!inputRef.current.contains(document.activeElement)) {
            setFilteredStudents([]);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleBlur);
        return () => document.removeEventListener('click', handleBlur);
    }, []);

    return (
        <div className="search-container">
            <div className="search-bar" ref={inputRef}>
                <input className='search-input' value={searchQuery} onChange={handleChange} type="text" placeholder="Search for student Detail" />
                <button className='search-btn' onClick={handleSearch}><img width={14.7} src={searchIcon} alt="" /></button>
            </div>
            {filteredStudents.length > 0 && (
                <div className="suggestions-wrapper" >
                    {filteredStudents.map(student => (
                        <div key={student.id} className="suggestion" onClick={() => navigate('/student/' + student.id)}>
                            <div>
                                <img className="student-dp" src={NoDp} alt="student profile picture" />
                            </div>
                            <div className="name-status">
                                <div className="name">{student.name}</div>
                                {student.paid ? (
                                    <div className="paid">Paid</div>
                                )
                                    :
                                    (
                                        <div className="not-paid">Not Paid</div>
                                    )}
                            </div>
                            <div className="shift-desk">
                                <div>shift {student.shift.name}</div>
                                <div>timing:{formatTime(student.shift.start_time)} to {formatTime(student.shift.end_time)}</div>
                                <div>seat no {student.desk.seat_no}</div>
                            </div>


                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchBar;
