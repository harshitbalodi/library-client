import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import ThreeDots from '../../../assets/three-dots.svg';
import "./Draggable.css";

const Draggable = ({ id, component }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

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
      <div className="slick-col">
        <img className="dot-icon" src={ThreeDots}/>
      </div>
      <div className="draggable">
        {component}
      </div>

    </div>

  );
};

export default Draggable;