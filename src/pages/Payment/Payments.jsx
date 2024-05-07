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
import { Flex, Spin } from 'antd';
import PlusIcon from '../../assets/plus-icon-circle.svg';
import useLogoutUser from '../../hooks/useLogoutUser';
import { Pagination, ConfigProvider } from 'antd';

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
    const [studentSort, setStudentSort] = useState(false);
    const [feeSort, setFeeSort] = useState(false);
    const [shiftSort, setShiftSort] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [hoverStates, setHoverStates] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const logoutUser = useLogoutUser();
    const paymentsPerPage = 15;

    console.log(payments);
    useEffect(() => {
        try {
            const getdata = async () => {
                const response = await paymentService.getAllPayments();
                setPayments(response.data.data);
            }
            getdata();
        } catch (error) {
            if (error?.response?.status === 401) {
                logoutUser();
                dispatch(setErrorMessage("Your session has expired. Please login again."));
            } else {
                dispatch(setErrorMessage(error.response.data.message));
            }
            console.log(error);
        }
    }, [])

    const indexOfLastPayment = currentPage * paymentsPerPage;
  const indexOfFirstStudent = indexOfLastPayment - paymentsPerPage;
  const currentPayments = filteredPayments?.slice(indexOfFirstStudent, indexOfLastPayment);

    useEffect(() => {
        if (studentId && payments) {
            const filteredPayments = payments.filter(payment => payment.student.id == studentId);
            if (!filteredPayments) return;
            setStudent(filteredPayments[0].student);
            const sortedPayments = filteredPayments.sort((a, b) => new Date(a.payment_date) - new Date(b.payment_date));
            setFilteredPayments(sortedPayments);
        } else if (!studentId && payments) {
            const sortedPayments = payments.sort((a, b) => new Date(a.payment_date) - new Date(b.payment_date));
            setFilteredPayments(sortedPayments);
            setStudent(null);
        }
    }, [studentId, payments, searchQuery]);

    useEffect(() => {
        if (!filteredPayments) return;
        const sortedPayments = [...filteredPayments];
        if (studentSort) sortedPayments.sort((a, b) => a.student.name.localeCompare(b.student.name));
        else sortedPayments.sort((a, b) => b.student.name.localeCompare(a.student.name));
        setFilteredPayments(sortedPayments);
    }, [studentSort]);

    useEffect(() => {
        if (!filteredPayments) return;
        const sortedPayments = [...filteredPayments];
        if (dateSort) sortedPayments.sort((a, b) => new Date(a.payment_date) - new Date(b.payment_date));
        else sortedPayments.sort((a, b) => new Date(b.payment_date) - new Date(a.payment_date));
        setFilteredPayments(sortedPayments);
    }, [dateSort]);

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
        if (shiftSort) sortedPayments.sort((a, b) => a.shift.id - b.shift.id);
        else sortedPayments.sort((a, b) => b.shift.id - a.shift.id);
        setFilteredPayments(sortedPayments);
    }, [shiftSort]);


    useEffect(() => {
        if (!filteredPayments) return;
        const sortedPayments = [...filteredPayments];
        if (amountSort) sortedPayments.sort((a, b) => a.fee - b.fee);
        else sortedPayments.sort((a, b) => b.fee - a.fee);
        setFilteredPayments(sortedPayments);
    }, [amountSort]);

    useEffect(() => {
        if (!payments) return;
        let filteredPayments = payments;
        if (student) {
            filteredPayments = filteredPayments.filter((payment) => payment.student.id === student.id);
        }
        if (shift) {
            filteredPayments = filteredPayments.filter((payment) => payment.shift.id === shift.id);
        }
        if (searchQuery) {
            filteredPayments = filteredPayments.filter((payment) => {
                const existStudentID = payment.student.stu_id ? payment.student.stu_id.toLowerCase().includes(searchQuery.toLowerCase()) : false;
                return payment.student.name.toLowerCase().includes(searchQuery.toLowerCase()) || existStudentID;
            });
        }
        setFilteredPayments(filteredPayments);
    }, [payments, student, shift, searchQuery]);

    const handleMouseEnter = (id) => {
        setHoverStates(prevState => {
            return { ...prevState, [id]: true }
        })
    }

    const handleMouseLeave = (id) => {
        setHoverStates(prevState => {
            return { ...prevState, [id]: false }
        })
    }


    return (
        <div className='payments'>
            {
                !filteredPayments && <div className='inspiring-loader'>
                    <Flex gap="small">
                        <Spin tip="Loading..." size='large'>
                            <div className="content" />
                        </Spin>
                    </Flex>
                </div>
            }
            {filteredPayments && <div>
                FILTER:{
                    student ?
                        <div className='selection-btn'>
                            {student.name}
                            <div
                                className='cross-filter'
                                onClick={() => setStudent(null)}>
                                <img
                                    width={20}
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
                                onClick={() => setShift(null)}>
                                <img width={20} src={CrossIcon} alt="❌" />
                            </div>
                        </div>
                        : <div className='selection-btn'>All Shifts</div>
                }
            </div>
            }

            {
                filteredPayments && filteredPayments.length == 0 && <div className='no-data'>No Data Found</div>
            }

            {
                filteredPayments &&
                <input
                    type="text"
                    className='student-search-input'
                    placeholder="Search using student name"
                    onChange={(e) => { setSearchQuery(e.target.value) }}
                />
            }

            <table className='payment-table'>
                {currentPayments && <tbody>
                    <tr>
                        <th>student <img onClick={() => setStudentSort(!studentSort)} src={UpDownIcon} alt="" /></th>
                        <th>Date of Transaction <img onClick={() => setDateSort(!dateSort)} src={UpDownIcon} alt="" /></th>
                        <th>Amount Payed<img onClick={() => setAmountSort(!amountSort)} src={UpDownIcon} alt="" /></th>
                        <th>Shift Name<img onClick={() => setShiftSort(!shiftSort)} src={UpDownIcon} alt="" /></th>
                        <th>Shift Fee <img onClick={() => setFeeSort(!feeSort)} src={UpDownIcon} alt="" /></th>
                    </tr>
                    {
                        currentPayments.map(payment => <tr
                            key={payment.id}
                            onMouseEnter={() => handleMouseEnter(payment.id)}
                            onMouseLeave={() => handleMouseLeave(payment.id)}
                        >
                            <td
                                onClick={() => setStudent(payment.student)}
                            >
                                <div className='student-name'>
                                    {payment.student.name}
                                    {hoverStates[payment.id] && <img width={15} src={PlusIcon} />}
                                </div>

                            </td>
                            <td>{formatDate(payment.payment_date)}</td>
                            <td>{payment.fee}</td>
                            <td
                                onClick={() => setShift(payment.shift)}
                            >
                                <div className='shift-name'>
                                    {payment.shift.name}
                                    {hoverStates[payment.id] && <img width={15} src={PlusIcon} />}
                                </div>
                            </td>
                            <td>{payment.shift.fee}</td>
                        </tr>
                        )
                    }
                </tbody>}
            </table>

            {
                filteredPayments && <ConfigProvider
                    theme={{
                        token: {
                            colorBgTextActive: '#fff',
                            colorText: '#1c268b',
                        }
                    }}
                >
                    <Pagination
                        className="pagination"
                        defaultCurrent={1}
                        total={filteredPayments.length}
                        pageSize={paymentsPerPage}
                        onChange={(page) => setCurrentPage(page)}
                    />
                </ConfigProvider>
            }

        </div>)
}

export default Payments