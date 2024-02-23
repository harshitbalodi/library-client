import { useParams } from "react-router-dom";

const StudentPage = () => {
    const id = useParams().id;
  return (
    <div>StudentPage {id}</div>
  )
}

export default StudentPage