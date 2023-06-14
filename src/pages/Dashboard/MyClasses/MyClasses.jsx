import React, { useContext, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../../providers/AuthProvider';
import { Helmet } from 'react-helmet-async';

const MyClasses = () => {
    const [axiosSecure] = useAxiosSecure();
    const { user } = useContext(AuthContext)
    const { data: classes = [], isLoading, refetch } = useQuery(
        ["classes"],
        async () => {
            const res = await axiosSecure.get(`/classes/${user.email}`); // Update the API endpoint
            return res.data;
        }
    );
    const [showFeedbackModal, setShowFeedbackModal] = useState(false);
    const [feedbackContent, setFeedbackContent] = useState('');

    // Status Color
    const getStatusColor = (status) => {
        switch (status) {
            case "pending":
                return "orange";
            case "approved":
                return "green";
            case "denied":
                return "red";
            default:
                return "white";
        }
    };
    const handleViewFeedback = (feedback) => {
        setFeedbackContent(feedback);
        setShowFeedbackModal(true);
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <progress className="progress w-56"></progress>
            </div>
        )
    }


    return (
        <div>
            <Helmet>
                <title>Yoga School | My Classes</title>
            </Helmet>

                   <h2 className='text-center my-16 bg-orange-600 py-4 text-white'>All My Classes</h2>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className='text-center'>
                            <th>
                                Index
                            </th>
                            <th>Class Image</th>
                            <th>Class Name</th>
                            <th>Status</th>
                            <th>Available Seats</th>
                            {/* <th>Price</th> */}
                            <th>Total Enrolled Students</th>
                            <th>FeedBack</th>
                            <th>Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {classes.map((classItem, index) => (
                            <tr key={classItem._id}>
                                <td>{index + 1}</td>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={classItem.classImage} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {classItem.className}
                                </td>
                                <td>
                                    <button className='btn px-4 py-2 text-white' style={{ backgroundColor: getStatusColor(classItem.status) }}>{classItem.status}</button>
                                </td>
                                <td className='text-center'>{classItem.availableSeats}</td>
                                {/* <td>${classItem.price}</td> */}
                                <td className='text-center'>{classItem.enrollmentStudent > 0 ? classItem.enrollmentStudent : 0}</td>
                                <td className='text-center'>
                                    {(classItem.status === 'denied' || classItem.status === 'approved') && classItem.feedback ? (
                                        <button onClick={() => handleViewFeedback(classItem.feedback)} className='btn btn-outline'>View Feedback</button>
                                    ) : (
                                        classItem.feedback === null ? 'No Feedback' : ''
                                    )}
                                </td>
                                <td className='text-center'>
                                    {classItem.status === 'pending' ? (
                                        <button className='btn btn-outline'>Update</button>
                                    ) : (
                                        '-'
                                    )}
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>


                {showFeedbackModal && (
                    <dialog
                        id="feedbackModal"
                        className="modal sm:modal-middle"
                        open
                    >
                        <div className="modal-box">
                            <h3 className="font-bold text-lg">Your Feedback</h3>
                            <p className="py-4">{feedbackContent}</p>
                            <div className="modal-action">
                                <button onClick={() => setShowFeedbackModal(false)} className="btn">Close</button>
                            </div>
                        </div>
                    </dialog>
                )}
            </div>
        </div>
    );
};

export default MyClasses;