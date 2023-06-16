import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const ManageClasses = () => {
    const [axiosSecure] = useAxiosSecure();
    const { data: classes = [], isLoading, refetch } = useQuery(
        ["classes"],
        async () => {
            const res = await axiosSecure.get("/manageClasses");
            return res.data;
        }
    );

    const [showFeedbackModal, setShowFeedbackModal] = useState(false);
    const [feedbackContent, setFeedbackContent] = useState('');
    const [feedbackClassId, setFeedbackClassId] = useState('');




    // Approved Classes
    const approveClass = useMutation(async (classId) => {

        await axiosSecure.patch(`/manageClasses/${classId}`, { status: 'approved' });
        Swal.fire({
            title: 'Are you sure?',
            text: "Approve This Class",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, I Sure'
        }).then((result) => {
            if (result.isConfirmed) {
                refetch();
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Aproved Done',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        })
    });


    // Denied Class
    const denyClass = useMutation(async (classId) => {

        await axiosSecure.patch(`/manageClasses/${classId}`, { status: 'denied' });
        Swal.fire({
            title: 'Are you sure?',
            text: "Denied This Class",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, I Sure'
        }).then((result) => {
            if (result.isConfirmed) {
                refetch();
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Denied Done',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        })
    });

    // Status Color

    const getStatusColor = (status) => {
        switch (status) {
            case "pending":
                return "red";
            case "approved":
                return "green";
            case "denied":
                return "darkred";
            default:
                return "white";
        }
    };

    // Send Feedback
    const handleSendFeedback = async () => {
        await axiosSecure.patch(`/feedback/${feedbackClassId}`, { feedback: feedbackContent });
        setFeedbackClassId(null);
        setShowFeedbackModal(false)
        setFeedbackContent('')
        refetch();
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Feedback Send Done',
            showConfirmButton: false,
            timer: 1500
        });

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
                <title>Yoga School | Manage Classes</title>
            </Helmet>
            <h2 className="text-center my-16">Manage All Classes</h2>



            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                Index
                            </th>
                            <th>Class Image</th>
                            <th>Class Name</th>
                            <th>Instructor Name</th>
                            <th>Instructor Email</th>
                            <th>Available Seats</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Aprove</th>
                            <th>Deny</th>
                            <th>Actions</th>
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
                                <td>{classItem.instructorName}</td>
                                <td>{classItem.instructorEmail}</td>
                                <td>{classItem.availableSeats}</td>
                                <td>${classItem.price}</td>
                                <td>
                                    <button className="px-4 py-2 text-white" style={{ backgroundColor: getStatusColor(classItem.status) }}>{classItem.status}</button>
                                </td>
                                <td>
                                    <button
                                        style={{ opacity: '1' }}
                                        className="btn btn-primary px-8 py-4"
                                        disabled={classItem.status === "approved" || classItem.status === "Denied"}
                                        onClick={() => approveClass.mutate(classItem._id)}
                                    >
                                        Approve
                                    </button>
                                </td>
                                <td>
                                    <button
                                        style={{ opacity: '1' }}
                                        className="btn btn-error px-8 py-4"
                                        disabled={classItem.status === "denied" || classItem.status === "approved"}
                                        onClick={() => denyClass.mutate(classItem._id)}
                                    >
                                        Deny
                                    </button>
                                </td>
                                <td>
                                    <button
                                        className="btn btn-outline btn-warning"
                                        style={{ opacity: '1' }}

                                        onClick={() => {
                                            setFeedbackClassId(classItem._id)
                                            setShowFeedbackModal(true);
                                        }}
                                        disabled={
                                            classItem.status !== "approved" &&
                                            classItem.status !== "denied"
                                        }
                                    >
                                        Send Feedback
                                    </button>
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
                        <form onSubmit={handleSendFeedback} method="dialog" className="modal-box">
                            <h3 className="font-bold text-lg">Send Feedback</h3>
                            <textarea
                                placeholder="Enter your feedback here..."
                                onChange={(e) => setFeedbackContent(e.target.value)}
                                className="my-4 w-full h-32 p-5"
                            />
                            <div className="modal-action">
                                <input className="btn" type="submit" value="Send" />

                                <button
                                    className="btn"
                                    onClick={() => setShowFeedbackModal(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </dialog>
                )}
            </div>


        </div >
    );
};

export default ManageClasses;