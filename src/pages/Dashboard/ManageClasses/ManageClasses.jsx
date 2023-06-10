import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";
import Swal from "sweetalert2";

const ManageClasses = () => {
    const [axiosSecure] = useAxiosSecure();
    const { data: classes = [], isLoading, isError, refetch } = useQuery(
        ["classes"],
        async () => {
            const res = await axiosSecure.get("/manageClasses");
            return res.data;
        }
    );

    const [approvedClassId, setApprovedClassId] = useState(null);
    const [deniedClassId, setDeniedClassId] = useState(null);

    const approveClass = useMutation(async (classId) => {

        await axiosSecure.patch(`/manageClasses/${classId}`, { status: 'Approved' });
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
                setApprovedClassId(classId);
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

    const denyClass = useMutation(async (classId) => {

    });

    // Status Color

    const getStatusColor = (status) => {
        switch (status) {
            case "pending":
                return "red";
            case "approved":
                return "green";
            case "Denied":
                return "orange";
            default:
                return "white";
        }
    };

    return (
        <div>
            <h2>Manage All Classes</h2>



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
                                <td>{classItem.price}</td>
                                <td>
                                    <button className="px-4 py-2 text-white" style={{ backgroundColor: getStatusColor(classItem.status) }}>{classItem.status}</button>
                                </td>
                                <td>
                                    <button
                                        className="btn btn-primary"
                                        disabled={classItem.status === "approved" || classItem.status === "Denied"}
                                        onClick={() => approveClass.mutate(classItem._id)}
                                    >
                                        Approve
                                    </button>
                                </td>
                                <td>
                                    <button
                                        className="btn btn-danger"
                                        disabled={classItem.status === "Denied" || classItem.status === "approved"}
                                        onClick={() => denyClass.mutate(classItem._id)}
                                    >
                                        Deny
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>


        </div>
    );
};

export default ManageClasses;