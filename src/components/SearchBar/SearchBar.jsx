import { useSelector } from "react-redux";
import searchIcon from '../../assets/search-icon.svg';
import { useState, useRef, useEffect } from "react";
import './SearchBar.css';
import { useNavigate } from "react-router-dom";
import { formatTime } from "../../utils/helper";
import NoDp from '../../assets/no-dp.jpg';
import CrossIcon from '../../assets/cross-icon.svg';


const SearchBar = () => {
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [choosenStudent, setChoosenStudent] = useState(null);
    const inputRef = useRef(null);
    const students = useSelector(state => state.students);
    const navigate = useNavigate();

    useEffect(() => {
        filterStudents();
    }, [searchQuery])

    useEffect(() => {
        document.addEventListener('click', handleBlur);
        return () => document.removeEventListener('click', handleBlur);
    }, []);

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
        if (!students) return;
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

    const handleStudent = (e, student) => {
        if (!student) setChoosenStudent(null);
        setChoosenStudent(student);
        console.log(student);
    }

    return (
        <div className="search-container">
            <div className="search-bar" ref={inputRef}>
                <input className='search-input' value={searchQuery} onFocus={filterStudents} onChange={handleChange} type="text" placeholder="Search for student Detail" />
                <button className='search-btn' onClick={handleSearch}><img width={14.7} src={searchIcon} alt="" /></button>
            </div>
            {filteredStudents.length > 0 && (
                <div className="suggestions-wrapper" >
                    {/* onClick={() => navigate('/student/' + student.id)} */}
                    {filteredStudents.map(student => (
                        <div key={student.id} className="suggestion" onClick={(e) => handleStudent(e, student)}>
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
                    {choosenStudent && <div className="student-description">
                        <button className="cross-icon" onClick={handleStudent}>
                            <img src={CrossIcon} alt="" />
                        </button>
                        <div>
                            <img width={40} src={NoDp} alt="student profile picture" />
                        </div>
                        <div >
                            <div >{choosenStudent.name}</div>
                            {choosenStudent.paid ? (
                                <div className="paid">Paid</div>
                            )
                                :
                                (
                                    <div className="not-paid">Not Paid</div>
                                )}
                        </div>
                        <div >
                            <div>shift {choosenStudent.shift.name}</div>
                            <div>timing:{formatTime(choosenStudent.shift.start_time)} to {formatTime(choosenStudent.shift.end_time)}</div>
                            <div>seat no {choosenStudent.desk.seat_no}</div>
                        </div>
                    </div>}
                </div>
            )}
        </div>
    );
};

export default SearchBar;
