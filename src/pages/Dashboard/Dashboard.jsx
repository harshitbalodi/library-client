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

const  Dashboard=()=> {
  const [components, setComponents] = useState([
    { id: 1, component:<ShiftCapacity/> },
    { id: 2, component: <ExpiringSoon/> },
    { id: 3, component: <NotRenewed/>},
    {id:4, component:<AllStudents/>}
  ]);

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

  return (
    <div className="Dashboard">
      <h1>Admin Dashboard</h1>
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