import { useEffect } from 'react';
import './Transaction.css';
import { useDispatch } from 'react-redux';
import { setErrorMessage } from '../../store/notificationSlice';
import { useState } from 'react';
import paymentService from '../../services/paymentService';
import { useSearchParams } from 'react-router-dom';

const Transaction = () => {
    const dispatch = useDispatch();
    const [studentsPayment, setStudentsPayments] = useState(null);
    const [searchParams] = useSearchParams();
    const studentId = searchParams.get('student');

    useEffect(() => {
        try {
            const getdata = async () => {
                const response = await paymentService.getAllPayments();
                const payments = response.data.data;
                const filteredPayments = payments.filter(payment => payment.student.id == studentId);
                const sortedPayments = filteredPayments.sort((a, b) => new Date(a.payment_date) - new Date(b.payment_date));
                setStudentsPayments(sortedPayments);
                console.log(response.data.data);
            }
            getdata();
        } catch (error) {
            console.log(error);
            dispatch(setErrorMessage(error.message));
        }
    }, [])
    return (<div>
        {studentsPayment && <table>
            <tr>
                <td>Date of Transaction</td>
                <td>Amount</td>
                <td>Shift</td>
            </tr>
            {
                studentsPayment.map(payment => <tr key={payment.id}>
                   <td>{payment.payment_date}</td>
                   <td>{payment.fee}</td>
                   <td>{payment.shift.name}</td>
                </tr>
                )
            }
        </table>}

    </div>)
}

export default Transaction