import { useContext } from 'react';
import { AuthContext } from '../../../providers/AuthProvider';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';

const PaymentHistory = () => {
    const [axiosSecure] = useAxiosSecure();
    const { user } = useContext(AuthContext);

    const { data: paymentData = [], isLoading, } = useQuery(
        ["paymentData"],
        async () => {
            const res = await axiosSecure.get(`/paymentHistory/${user.email}`);
            return res.data;
        }
    );

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <progress className="progress w-56"></progress>
            </div>
        )
    }
    return (
        <div className='w-full'>
             <Helmet>
                <title>Yoga School | Payment History</title>
            </Helmet>
            <h2 className='text-center my-16 bg-orange-500 py-4 text-white'>My Selected Classes</h2>
            {paymentData.length === 0 ? (
                <p>You Have No Enrolled Any Classes.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                            <tr className=' bg-black text-white'>
                                <th className='text-center'>Class Image</th>
                                <th className='text-center'>Class Name</th>
                                <th className='text-center'>Instructor Name</th>
                                <th className='text-center'>Transaction ID</th>
                                <th className='text-center'>Payment Date</th>
                                <th className='text-center'>Price</th>
                                <th className='text-center'>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paymentData.map((paymentItem) => (
                                <tr key={paymentItem._id}>
                                     <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={paymentItem.classImage} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {paymentItem.className}
                                    </td>
                                    <td>{paymentItem.instructorName}</td>
                                    <td>{paymentItem.transactionId}</td>
                                    <td className='text-center'>{paymentItem.date}</td>
                                    <td>${paymentItem.price}</td>
                                    <td>
                                        <button style={{background:'green', pointerEvents: 'none'}} className='px-4'>{paymentItem.status}</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>
            )}
        </div>
    );
};

export default PaymentHistory;