import { useDispatch, useSelector } from "react-redux"
import './Notification.css';
import SuccessIcon from '../../assets/success-icon.svg';
import ErrorIcon from '../../assets/error-icon.svg';
import CrossIcon from '../../assets/cross-icon.svg';
import { clearNotification } from "../../store/notificationSlice";

const Notification = () => {
    const notification = useSelector(state => state.notification);
    const dispatch = useDispatch();
    const closeNotification = () => {
        dispatch(clearNotification());
    }
    return (notification.success || notification.error) && (
        <div className="notification">
            {notification.success && (
                <div className="success">
                    <img width={25} src={SuccessIcon} alt="success" />
                    <p>success, {notification.success}</p>
                </div>
            )}
            {notification.error && notification.success && <>|</>}
            {notification.error && (
                <div className="error">
                    <img width={25} src={ErrorIcon} alt="error" />
                    <p>error, {notification.error}</p>
                </div>
            )}
            <div className="cross" onClick={closeNotification}>
                <img width={25} src={CrossIcon} alt="" />
            </div>
            
        </div>
    )
}

export default Notification