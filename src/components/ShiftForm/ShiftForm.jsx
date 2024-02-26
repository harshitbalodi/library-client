import Button from '../Button/Button'
import './ShiftForm.css'
import CrossIcon from '../../assets/cross-icon.svg'
 
const ShiftForm = ({ isOpen, onClose }) => {
    
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
                    <div>
                        <label htmlFor="hall">Hall name</label>
                        <input type="text" id="hall" name='hall'/>
                    </div>
                    <div> 
                        <label htmlFor="capacity">Capacity</label>  
                        <input type='number' id='capacity' name='capacity'/>
                    </div>
                    <h3>Timing of the Hall</h3>
                    <div> 
                        <label htmlFor="start-time">Start at</label>
                        <input type='time' id='start-time' name='start-time'/>
                    </div>
                    <div>
                        <label htmlFor="end-time">Closes at</label> 
                        <input type='time' id='end-time' name='end-time'/></div> 
                    <Button >submit</Button>
                </form>
            </div>
        </div>)
}

export default ShiftForm;