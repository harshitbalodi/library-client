import { useSelector } from "react-redux";
import searchIcon from '../../assets/search-icon.svg';
import { useState, useRef, useEffect } from "react";
import './SearchBar.css';
import CrossIcon from '../../assets/cross-icon.svg';
import MobileIcon from '../../assets/mobile-icon.svg'
import { setImageUrl } from "../../utils/helper";

const SearchBar = () => {
    const students = useSelector(state => state.students);
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [choosenStudent, setChoosenStudent] = useState(null);
    const inputRef = useRef(null);
    const detailRef = useRef(null);

    console.log(students);
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

    const handleBlur = (event) => {
        if (!inputRef.current.contains(event.target)) {
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
                <div className="suggestions-wrapper" onClick={e=> e.stopPropagation()}>
                    <div className="suggestions">
                        {filteredStudents.map(student => (
                        <div key={student.id} className="suggestion" onClick={(e) => handleStudent(e, student)}>
                            <div>
                                <img className="student-dp" src={setImageUrl(student.image)} alt="student dp" />
                            </div>
                            <div className="name-status">
                                <div className="name">{student.name}</div>
                                <div className="mobile-number">
                                    <img src={MobileIcon} className="" width={30} alt="mobile icon" />
                                    +91-9399245654
                                </div>
                                {/* {student.paid ? (
                                    <div className="paid">Paid</div>
                                )
                                    :
                                    (
                                        <div className="not-paid">Not Paid</div>
                                    )} */}
                            </div>
                        </div>
                    ))}
                    </div>
                    
                    {choosenStudent && <div className="student-description" ref={detailRef} onClick={(e)=>e.stopPropagation()}>
                        <button className="cross-icon" onClick={handleStudent}>
                            <img src={CrossIcon} alt="" />
                        </button>
                        <div className="profile-picture">
                            <img width={40} src={setImageUrl(choosenStudent.image)} alt="student profile picture" />
                        </div>
                        <div >
                            <div >{choosenStudent.name}</div>
                            <div>Joining date:{choosenStudent.joining_date}</div>
                            <div>Hall {choosenStudent.hall.name}</div>
                            <div>shift {choosenStudent.hall.shift.name}</div>
                            <div>desk no: {choosenStudent.hall.shift.desk}</div>
                        </div>
                    </div>}
                </div>
            )}
        </div>
    );
};

export default SearchBar;
