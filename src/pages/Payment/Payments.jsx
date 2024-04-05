import { useEffect } from 'react';
import './Payments.css';
import { useDispatch } from 'react-redux';
import { setErrorMessage } from '../../store/notificationSlice';
import { useState } from 'react';
import paymentService from '../../services/paymentService';
import { useSearchParams } from 'react-router-dom';
import { formatDate } from '../../utils/helper';
import CrossIcon from '../../assets/cross-icon.svg';
import UpDownIcon from '../../assets/up-down-icon.svg';

const Payments = () => {
    const dispatch = useDispatch();
    const [payments, setPayments] = useState(null);
    const [filteredPayments, setFilteredPayments] = useState(null);
    const [searchParams] = useSearchParams();
    const [student, setStudent] = useState(null);
    const [shift, setShift] = useState(null);
    const [studentId] = useState(() => searchParams.get('student'));
    const [dateSort, setDateSort] = useState(false);
    const [amountSort, setAmountSort] = useState(false);
    const [feeSort, setFeeSort] = useState(false);

    useEffect(() => {
        try {
            const getdata = async () => {
                const response = await paymentService.getAllPayments();
                setPayments(response.data.data);
            }
            getdata();
        } catch (error) {
            console.log(error);
            dispatch(setErrorMessage(error.message));
        }
    }, [])

    useEffect(() => {
        if (studentId && payments) {
            const filteredPayments = payments.filter(payment => payment.student.id == studentId);
            if (!filteredPayments) return;
            setStudent(filteredPayments[0].student);
            const sortedPayments = filteredPayments.sort((a, b) => new Date(a.payment_date) - new Date(b.payment_date));
            setFilteredPayments(sortedPayments);
        }
        if (!studentId && payments) {
            const sortedPayments = payments.sort((a, b) => new Date(a.payment_date) - new Date(b.payment_date));
            setFilteredPayments(sortedPayments);
            setStudent(null);
        }
    }, [studentId, payments]);

    useEffect(() => {
        if (!filteredPayments) return;
        const sortedPayments = [...filteredPayments];
        if (feeSort) sortedPayments.sort((a, b) => a.shift.fee - b.shift.fee);
        else sortedPayments.sort((a, b) => b.shift.fee - a.shift.fee);
        setFilteredPayments(sortedPayments);
    }, [feeSort]);

    useEffect(() => {
        if (!filteredPayments) return;
        const sortedPayments = [...filteredPayments];
        if (amountSort) sortedPayments.sort((a, b) => a.fee - b.fee);
        else sortedPayments.sort((a, b) => b.fee - a.fee);
        setFilteredPayments(sortedPayments);
    }, [amountSort]);

    useEffect(() => {
        if (!filteredPayments) return;
        const sortedPayments = [...filteredPayments];
        if (dateSort) sortedPayments.sort((a, b) => new Date(a.payment_date) - new Date(b.payment_date));
        else sortedPayments.sort((a, b) => new Date(b.payment_date) - new Date(a.payment_date));
        setFilteredPayments(sortedPayments);
    }, [dateSort]);

    useEffect(()=>{
        if(!payments) return;
        if(student){
            console.log("student", student);
            // const newFilteredPayments = newFilteredPayments;
            // console.log(newFilteredPayments);
            setFilteredPayments(()=>filteredPayments.filter((payment)=> payment.student.id == student.id))
        }else{
            setFilteredPayments(payments);
        }
    },[payments, student]);

    useEffect(()=>{
        if(!payments)return;
        if(shift){
            const newFilteredPayments = filteredPayments.filter((payment)=> payment.shift.id == shift.id);
            setFilteredPayments(newFilteredPayments);
        }else{
            setFilteredPayments(payments);
        }
    },[payments,shift])


    return (<div>
        FILTER:{
            student ?
                <div className='selection-btn'>
                    {student.name}
                    <div
                        className='cross-filter'
                        onClick={() => setStudent(null)}>
                        <img
                            width={25}
                            src={CrossIcon}
                            alt="❌"
                        />
                    </div>
                </div>
                : <div className='selection-btn'>All Students</div>
        }
        {
            shift ?
                <div
                    className='selection-btn'>
                    {shift.name}
                    <div className='cross-filter'
                        onClick={()=>setShift(null)}>
                        <img width={25} src={CrossIcon} alt="❌" />
                    </div>
                </div>
                : <div className='selection-btn'>All Shifts</div>
        }
        <table>
            {filteredPayments && <tbody>
                <tr>
                    <td>student </td>
                    <td>Date of Transaction <img onClick={() => setDateSort(!dateSort)} src={UpDownIcon} alt="" /></td>
                    <td>Amount Payed<img onClick={() => setAmountSort(!amountSort)} src={UpDownIcon} alt="" /></td>
                    <td>Shift</td>
                    <td>Shift Fee <img onClick={() => setFeeSort(!feeSort)} src={UpDownIcon} alt="" /></td>
                </tr>
                {
                    filteredPayments.map(payment => <tr key={payment.id}>
                        <td onClick={() => setStudent(payment.student)}>{payment.student.name}</td>
                        <td>{formatDate(payment.payment_date)}</td>
                        <td>{payment.fee}</td>
                        <td onClick={() => setShift(payment.shift)}>{payment.shift.name}</td>
                        <td>{payment.shift.fee}</td>
                    </tr>
                    )
                }
            </tbody>}
        </table>

    </div>)
}

export default Payments