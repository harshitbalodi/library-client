import {
    SortableContext,
    horizontalListSortingStrategy
} from "@dnd-kit/sortable";

import Task  from "../Task/Task";
import './Row.css'

const Row = ({ tasks }) => {
    return (
        <div className="row">
            <SortableContext items={tasks} strategy={horizontalListSortingStrategy}>
                {tasks.map((task) => (
                    <Task key={task.id} id={task.id} title={task.title} />
                ))}
            </SortableContext>
        </div>
    );
};

export default Row;