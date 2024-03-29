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
import LockIcon from '../../assets/lock.svg';
import UnLockIcon from '../../assets/unlock.svg';
import ShiftTimer from "../../components/ShiftTimer/ShiftTimer";
import SearchBar from "../../components/SearchBar/SearchBar";
import NewBookings from "../../components/NewBookings/NewBookings";
const Dashboard = () => {
  const [components, setComponents] = useState([
    { id: 143, name: "Shift Timer", component: <ShiftTimer /> },
    { id: 243, name: "New Bookings", component: <NewBookings /> },
    { id: 654, name: "Shift Capacity", component: <ShiftCapacity /> },
    { id: 765, name: "Expiring Soon", component: <ExpiringSoon /> },
    { id: 987, name: "Not Renewed", component: <NotRenewed /> },
    { id: 456, name: "All Students", component: <AllStudents /> }
  ]);
  const [isLock, setIsLock] = useState(true);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const getComponentsPos = (id) => components.findIndex((task) => task.id === id);


  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!active || !over || active.id === over.id) return;

    setComponents((components) => {
      const originalPos = getComponentsPos(active.id);
      const newPos = getComponentsPos(over.id);

      return arrayMove(components, originalPos, newPos);
    });
  };

  const toggleLock = () => setIsLock((prevIsLock) => !prevIsLock);
  return (
    <div className="Dashboard">
      <h1>Admin Dashboard</h1>
      <div className="lock-unlock">
        {!isLock ? (<div onClick={toggleLock} title="lock Dashboard" >
          <img src={LockIcon} alt="lock" />
        </div>) :
          (<div onClick={toggleLock} title="unlock Dashboard">
            <img src={UnLockIcon} alt="lock" />
          </div>)
        }
      </div>
      <SearchBar />

      {!isLock ? <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragEnd={handleDragEnd}
      >
        <DroppableArea
          id="toDo"
          components={components}
        />
      </DndContext>
        :
        <DroppableArea
          id="toDo"
          components={components}
        />
      }
    </div>
  );
}

export default Dashboard;