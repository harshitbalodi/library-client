import { useSelector } from "react-redux";
import searchIcon from '../../assets/search-icon.svg';
import { useState, useRef, useEffect } from "react";
import './SearchBar.css';
import '../index.css';
import CrossIcon from '../../assets/cross-icon.svg';
import MobileIcon from '../../assets/mobile-icon.svg'
import { formatDate, setImageUrl } from "../../utils/helper";
import StudentUpdateForm from "../StudentUpdateForm/StudentUpdateForm";
import { useNavigate } from "react-router-dom";
import PenEditIcon from '../../assets/pen-edit-icon.svg';
import TrabsactionIcon from '../../assets/transaction-icon.svg';
import DeleteIcon from '../../assets/SvgComponents/DeleteIcon';
import studentService from "../../services/studentService";
import { useDispatch } from "react-redux";
import { setSuccessMessage, setErrorMessage } from "../../store/notificationSlice";
import useLogoutUser from "../../hooks/useLogoutUser";
import { hallsThunk } from "../../store/hallSlice";
import { studentThunk } from "../../store/studentsSlice";


const SearchBar = () => {
    const students = useSelector(state => state.students);
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [choosenStudentId, setChoosenStudentId] = useState(null);
    const [choosenStudent, setChoosenStudent] = useState(null);
    const [formOpen, setFormOpen] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const inputRef = useRef(null);
    const detailRef = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const logoutUser = useLogoutUser();
    console.log(choosenStudentId);
    console.log("choose student", choosenStudent);
    useEffect(() => {
        filterStudents();
    }, [searchQuery, students])

    useEffect(() => {
        document.addEventListener('click', handleBlur);
        return () => document.removeEventListener('click', handleBlur);
    }, []);

    useEffect(() => {
        if (choosenStudentId) {
            setChoosenStudent(students.find(student => student.id === choosenStudentId));
        } else {
            setChoosenStudent(null);
        }
    }, [choosenStudentId, students])

    const handleChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearch = () => {
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
        setFilteredStudents(() => students.filter(student => {
            return student?.name.trim().toLowerCase().includes(searchQuery.toLowerCase().trim())
                || student?.stu_id.toString().trim().toLowerCase().includes(searchQuery.toLowerCase().trim())
        }
        ));
    };

    const handleBlur = (event) => {
        if (!inputRef.current.contains(event.target)) {
            setFilteredStudents([]);
        }
    };

    const handleStudent = (student) => {
        console.log("handle student", student);
        if (!student) setChoosenStudentId(null);
        else setChoosenStudentId(student.id);
    }

    const handleDelete = async (studentId) => {
        console.log(studentId);
        const confirmation = window.confirm("Are you sure you want to delete this student?");
        if (!confirmation) return;
        try {
            const response = studentService.deleteStudent(studentId);
            console.log(response);
            if (response) {
                dispatch(hallsThunk());
                dispatch(studentThunk());
                dispatch(setSuccessMessage("Student deleted successfully"));
            }

        } catch (error) {
            console.log("catch block in delete");
            console.log(error);
            if (error?.response?.status === 401) {
                logoutUser();
                dispatch(setErrorMessage("Your session has expired. Please login again."));
            } else {
                dispatch(setErrorMessage(error.response.data.message));
            }
        }
    }
    return (
        <div className="search-container">
            <div className="search-bar" ref={inputRef}>
                <input className='search-input' value={searchQuery} onFocus={filterStudents} onChange={handleChange} type="text" placeholder="Search for student Detail" />
                <button className='search-btn' onClick={handleSearch}><img width={14.7} src={searchIcon} alt="" /></button>
            </div>
            {filteredStudents.length > 0 && (
                <div className="suggestions-wrapper" onClick={e => e.stopPropagation()}>
                    <div className="suggestions">
                        {filteredStudents.map(student => (
                            <div key={student.id} className="suggestion" onClick={() => handleStudent(student)}>
                                <div className="student-dp-container">
                                    <img className="student-dp" src={setImageUrl(student.image)} alt="student dp" />
                                </div>
                                <div className="name-status">
                                    <div className="name">{student.name} - {student?.stu_id}</div>
                                    <div className="mobile-number">
                                        <img src={MobileIcon} className="" width={30} alt="mobile icon" />
                                        +91-9399245654
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {choosenStudent && <div className="student-description" ref={detailRef} onClick={(e) => e.stopPropagation()}>
                        <StudentUpdateForm student={choosenStudent} formOpen={formOpen} setFormOpen={setFormOpen} />
                        <button className="cross-icon" onClick={handleStudent}>
                            <img src={CrossIcon} alt="" />
                        </button>
                        <div className="profile-picture-block">
                            <img className="profile-picture" width={40} src={setImageUrl(choosenStudent.image)} alt="student profile picture" />
                            <div >{choosenStudent.name} - {choosenStudent?.stu_id}</div>
                            <div className="choosen-student-btns">
                                <button className='pay-edit-btn' onClick={() => setFormOpen(true)}>Modify <img width={14} src={PenEditIcon} alt="📝" /></button>
                                <button className="pay-edit-btn" onClick={() => navigate(`/payments?student=${choosenStudent.id}`)}>Transactions <img width={14} src={TrabsactionIcon} alt="" /></button>
                                {choosenStudent.is_expired && <button
                                    onMouseEnter={() => setIsHovering(true)}
                                    onMouseLeave={() => setIsHovering(false)}
                                    onClick={() => handleDelete(choosenStudent.id)}
                                >
                                    <DeleteIcon isHovering={isHovering} />
                                </button>}
                            </div>


                        </div>
                        <div className="student-suggestion-details">
                            <div>
                                Joining date -
                                <span className="student-data"> {formatDate(choosenStudent.joining_date)}</span>
                            </div>
                            <div>
                                Hall -
                                <span className="student-data"> {choosenStudent.hall.name}</span>
                            </div>
                            <div>
                                shift -
                                <span className="student-data"> {choosenStudent?.hall?.shift?.name}</span>
                            </div>
                            <div>
                                valid upto -
                                <span className="student-data"> {formatDate(choosenStudent.valid_upto)}</span>
                            </div>
                            <div>
                                desk no -
                                <span className="student-data"> {choosenStudent.hall.shift.desk}</span>
                            </div>
                        </div>
                    </div>}
                </div>
            )}
        </div>
    );
};

export default SearchBar;
