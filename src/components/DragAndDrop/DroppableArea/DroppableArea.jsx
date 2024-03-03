import {
    SortableContext,
    horizontalListSortingStrategy
} from "@dnd-kit/sortable";

import Draggable from "../Draggable/Draggable";
import './DroppableArea.css'

const DroppableArea = ({ components }) => {
    return (
        <div className="droppable">
            <SortableContext items={components} strategy={horizontalListSortingStrategy}>
                {components.map((component) => (
                    <Draggable key={component.id} {...component} />
                ))}
            </SortableContext>
        </div>
    );
};

export default DroppableArea;