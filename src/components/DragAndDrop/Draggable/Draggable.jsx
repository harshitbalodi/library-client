/* eslint-disable react/prop-types */
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import "./Draggable.css";
import sixDots from '../../../assets/six-dots.svg';
import { useState } from "react";

const Draggable = ({ id, component, name }) => {
  const [isHovering, setIsHovering] = useState(null);
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div className="draggable-container"
      ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
    >
      <div
        className="draggable-title"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        >
        <img className={`six-dots ${isHovering ? 'visible' : ''}`} src={sixDots} alt="" />
        {name}
      </div>
      <div className="draggable">
        {component}
      </div>
    </div>
  );
};

export default Draggable;