import Button from './Button/Button'
import './index.css'
// import CircularArrow from '../assets/circle-arrow-left.svg'
import CrossIcon from '../assets/cross-icon.svg'
 
const FormModal = ({ isOpen, onClose }) => {
    
    const HandleCreateHall = (event)=>{
        event.preventDefault();
        console.log('create hall clicked');
    }
    return (
        <div className={`modal-overlay ${isOpen ? 'active' : ''}`} onClick={onClose}>
            <div className={`modal-content ${isOpen ? 'active' : ''}`} onClick={(e) => e.stopPropagation()}>
                <img src={CrossIcon} onClick={onClose}/>
                <h2>Add new Shift</h2>
                <form onSubmit={(event)=>HandleCreateHall(event)} className="form">
                    <div>Hall name<input type="text" name='hall'/></div>
                    <div> Capacity<input type='number' name='capacity'/></div>
                    <h3>Timing of the Hall</h3>
                    <div> Start at<input type='time' name='start-time'/></div>
                    <div>Closes at<input type='time' name='end-time'/></div> 
                    <Button >submit</Button>
                </form>
            </div>
        </div>)
}

export default FormModal