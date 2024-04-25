import { useEffect, useState } from "react";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
  TouchSensor,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import "./Dashboard.css";
import DroppableArea from "../../components/DragAndDrop/DroppableArea/DroppableArea";
import NotRenewed from "../../components/NotRenewed/NotRenewed";
import ExpiringSoon from "../../components/ExpiringSoon/ExpiringSoon";
import AllStudents from "../../components/AllStudents/AllStudents";
import LockIcon from '../../assets/lock.svg';
import UnLockIcon from '../../assets/unlock.svg';
import ShiftTimer from "../../components/ShiftTimer/ShiftTimer";
import SearchBar from "../../components/SearchBar/SearchBar";
import NewBookings from "../../components/NewBookings/NewBookings";
import { useDispatch, useSelector } from "react-redux";
import { setLock } from "../../store/lockSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const lock = useSelector(state => state.lock);
  const [components, setComponents] = useState([
    { id: 143, position: 1, name: "Shift Timer", component: <ShiftTimer /> },
    { id: 243, position: 2, name: "New Bookings", component: <NewBookings /> },
    { id: 765, position: 3, name: "Expiring Soon", component: <ExpiringSoon /> },
    { id: 987, position: 4, name: "Not Renewed", component: <NotRenewed /> },
    { id: 456, position: 5, name: "All Students", component: <AllStudents /> }
  ]);
  const [position, setPosition] = useState(() => {
    const storedPosition = localStorage.getItem('DashboardPositions');
    return storedPosition ? JSON.parse(storedPosition) : [1, 2, 3, 4, 5];
  }
  );

  useEffect(() => {
    if (position != [1, 2, 3, 4, 5]) {
      const posSiz = position.length;
      var newComponents = [];
      for (var i = 0; i < posSiz; i++) {
        var pos = position[i];
        for (var j = 0; j < posSiz; j++) {
          if (pos == components[j].position) {
            newComponents.push(components[j]);
            break;
          }
          
        }
      }
      setComponents(newComponents);
    }
  }, [])

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
    useSensor(TouchSensor)
  );

  const getComponentsPos = (id) => components.findIndex((task) => task.id === id);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!active || !over || active.id === over.id) return;

    setComponents((components) => {
      const originalPos = getComponentsPos(active.id);
      const newPos = getComponentsPos(over.id);
      const newPosition = arrayMove(position, originalPos, newPos);
      setPosition(newPosition);
      localStorage.setItem('DashboardPositions', JSON.stringify(newPosition));
      return arrayMove(components, originalPos, newPos);
    });
  };
  const toggleLock = () => dispatch(setLock(!lock));

  return (
    <div className="Dashboard">
      {/* <h1>Admin Dashboard</h1> */}
      <div className="lock-unlock">
        {!lock ? (<div onClick={toggleLock} title="lock Dashboard" >
          <img src={LockIcon} alt="lock" />
        </div>) :
          (<div onClick={toggleLock} title="unlock Dashboard">
            <img src={UnLockIcon} alt="lock" />
          </div>)
        }
      </div>
      <SearchBar />

      {!lock ? <DndContext
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