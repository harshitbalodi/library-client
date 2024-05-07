import './StudentFormPage.css'
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Select } from 'antd';

const StudentFormPage = () => {
  const students = useSelector(state => state.students);
  const [searchParams] = useSearchParams();
  const [student, setStudent] = useState(null);
  const StudentId =  searchParams.get("student");
  console.log("StudentId", StudentId);

  useEffect(()=>{
    if(StudentId && students){
      const studentFound = students.find(student => student.id == StudentId);
      if(studentFound){
        setStudent(studentFound);
      }
    }
  },[StudentId, students]);

  return (
    <div className="student-form-page">
      StudentFormPage
    </div>
  )
}

export default StudentFormPage