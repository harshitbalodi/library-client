import {
    SortableContext,
    horizontalListSortingStrategy
} from "@dnd-kit/sortable";

import Draggable from "../Draggable/Draggable";
import './DroppableArea.css'

const DroppableArea = ({ tasks }) => {
    return (
        <div className="droppable">
            <SortableContext items={tasks} strategy={horizontalListSortingStrategy}>
                {tasks.map((task) => (
                    <Draggable key={task.id} id={task.id} title={task.title} />
                ))}
            </SortableContext>
        </div>
    );
};

export default DroppableArea;