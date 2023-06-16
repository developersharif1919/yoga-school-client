import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";


const AllUsers = () => {
    const [axiosSecure] = useAxiosSecure();
    const { isLoading, data: users = [], refetch } = useQuery(['users'], async () => {
        const res = await axiosSecure.get('/users');
        return res.data;
    })

    const [adminDisabled, setAdminDisabled] = useState(false);
    const [instructorDisabled, setInstructorDisabled] = useState(false);

    const handleMakeAdmin = user => {
        fetch(`https://summer-camp-server-developersharif1919.vercel.app/users/admin/${user._id}`, {
            method: 'PATCH',
        })
            .then(res => res.json())
            .then(data => {
                Swal.fire({
                    title: 'Are you sure?',
                    text: "You want to make admin",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, I Made'
                }).then((result) => {
                    if (result.isConfirmed) {
                        if (data.modifiedCount) {
                            refetch();
                            setAdminDisabled(true);
                            setInstructorDisabled(false);
                            Swal.fire({
                                position: 'center',
                                icon: 'success',
                                title: `${user.name} is an Admin Now`,
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
                    }
                })

            })
    }


    const handleMakeInstructor = user => {
        if (user.email === "developersharif@gmail.com") {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Permission Denied",
                text: "This user cannot be made an instructor.",
                showConfirmButton: false,
            });
        } else {
            fetch(`https://summer-camp-server-developersharif1919.vercel.app/users/instructor/${user._id}`, {
                method: 'PATCH',
            })
                .then(res => res.json())
                .then(data => {
                    Swal.fire({
                        title: 'Are you sure?',
                        text: "You want to made instructor",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Yes, i Made!'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            if (data.modifiedCount) {
                                refetch();
                                setAdminDisabled(false);
                                setInstructorDisabled(true);
                                Swal.fire({
                                    position: 'center',
                                    icon: 'success',
                                    title: `${user.name} is Instructor Now`,
                                    showConfirmButton: false,
                                    timer: 1500
                                });
                            }
                        }
                    })

                })
        }
    }


    const handleDelete = async (user) => {
        if (user.email === 'developersharif@gmail.com') {
            Swal.fire({
                position: 'center',
                icon: 'error',
                imageUrl: `${user.photoUrl}`,
                imageWidth: 400,
                imageHeight: 200,
                title: `${user.name} Is Main Admin`,
                text: 'You cannot delete this user',
                showConfirmButton: false,
                timer: 4000
            });
            return;
        }

        Swal.fire({
            title: 'Are you sure?',
            text: 'You want to delete the user',
            icon: 'warning',
            imageUrl: `${user.photoUrl}`,
            imageWidth: 400,
            imageHeight: 200,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axiosSecure.delete(`/users/${user._id}`);
                    refetch();
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        imageUrl: `${user.photoUrl}`,
                        imageWidth: 400,
                        imageHeight: 200,
                        title: `${user.name} has been deleted`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                } catch (error) {
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: 'Failed to delete the user',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            }
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
                <title>Yoga School | All Users</title>
            </Helmet>
            <h2 className="text-xl">Total Users: {users.length}</h2>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th className="text-center">Photo</th>
                            <th className="text-center">Name</th>
                            <th className="text-center">Email</th>
                            <th className="text-center">Role</th>
                            <th className="text-center">Role</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => <tr key={user._id}>
                                <th>{index + 1}</th>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={user.photoUrl} alt="Profile" />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td className="text-center">
                                    {
                                        user.role === 'admin' ? 'admin' : <button style={{ fontSize: '16px', opacity:'1' }} onClick={() => handleMakeAdmin(user)} className="btn btn-outline btn-primary" disabled={adminDisabled}>Made Admin</button>
                                    }
                                </td>
                                <td className="text-center">
                                    {
                                        user.role === 'instructor' ? 'instructor' :
                                            <button
                                                onClick={() => handleMakeInstructor(user)}
                                                style={{ fontSize: '16px', opacity:'1' }}
                                                className="btn btn-outline btn-primary"
                                                disabled={instructorDisabled}
                                            >
                                                Made Instructor
                                            </button>
                                    }
                                </td>
                                <td>
                                    <button onClick={() => handleDelete(user)} className="btn btn-secondary">
                                        <FaTrashAlt />
                                    </button>
                                </td>
                            </tr>)
                        }

                    </tbody>
                    {/* foot */}

                </table>
            </div>
        </div>
    );
};

export default AllUsers;