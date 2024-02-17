import './index.css'
const FormModal = ({ isOpen, onClose }) => {
    return (
        <div className={`modal-overlay ${isOpen ? 'active' : ''}`} onClick={onClose}>
            <div className={`modal-content ${isOpen ? 'active' : ''}`} onClick={(e) => e.stopPropagation()}>
                <form className="form">
                    <h2>Modal Form</h2>
                    <button onClick={onClose}>Close</button>
                </form>
            </div>
        </div>)
}

export default FormModal