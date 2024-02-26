import { useState } from "react";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import "./Dashboard.css";
import DroppableArea from "../../components/DragAndDrop/DroppableArea/DroppableArea";
import ShiftCapacity from "../../components/ShiftCapacity/ShiftCapacity";
import NotRenewed from "../../components/NotRenewed/NotRenewed";
import ExpiringSoon from "../../components/ExpiringSoon/ExpiringSoon";
import AllStudents from "../../components/AllStudents/AllStudents";
import searchIcon from '../../assets/search-icon.svg';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [components, setComponents] = useState([
    { id: 1, component: <ShiftCapacity /> },
    { id: 2, component: <ExpiringSoon /> },
    { id: 3, component: <NotRenewed /> },
    { id: 4, component: <AllStudents /> }
  ]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const students = useSelector(state=> state.students);
  const navigate = useNavigate();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const getComponentsPos = (id) => components.findIndex((task) => task.id === id);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id === over.id) return;

    setComponents((components) => {
      const originalPos = getComponentsPos(active.id);
      const newPos = getComponentsPos(over.id);

      return arrayMove(components, originalPos, newPos);
    });
  };

   const handleSearch = (e) =>{
    e.preventDefault();
    console.log("search",e.target.search.value);
    const searchQuery = e.target.search.value;
    if(searchQuery.trim() === '') return;
    setFilteredStudents(()=> students.filter(student=> student.name.toLowerCase().includes(searchQuery.toLowerCase().trim())));

    if(setFilteredStudents.length === 1) navigate(`/student/${setFilteredStudents[0].id}`);
   }
   console.log(filteredStudents);

  return (
    <div className="Dashboard">
      <h1>Admin Dashboard</h1>
      <form className="search-bar" onSubmit={(e)=>handleSearch(e)}>
        <input className='search-input' name="search" type="text" placeholder="Search for student Detail" />
        <button className='search-btn' ><img width={14.7} src={searchIcon} alt="" /></button>
      </form>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragEnd={handleDragEnd}
      >
        <DroppableArea id="toDo" components={components} />
      </DndContext>
    </div>
  );
}

export default Dashboard;