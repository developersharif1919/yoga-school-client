import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const AllUsers = () => {
    const [axiosSecure] = useAxiosSecure();
    const { data: users = [], refetch } = useQuery(['users'], async () => {
        const res = await axiosSecure.get('/users');
        return res.data;
    })
    console.log(users)


    const [adminDisabled, setAdminDisabled] = useState(false);
    const [instructorDisabled, setInstructorDisabled] = useState(false);


    const handleMakeAdmin = user => {
        fetch(`http://localhost:5000/users/admin/${user._id}`, {
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
       if(user.email === "developersharif1919@gmail.com"){
        Swal.fire({
            position: "center",
            icon: "error",
            title: "Permission Denied",
            text: "This user cannot be made an instructor.",
            showConfirmButton: false,
          });
       }else{
        fetch(`http://localhost:5000/users/instructor/${user._id}`, {
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


    const handleDelete = user => {

    }
    return (
        <div>
            <h2 className="text-xl">Total Users: {users.length}</h2>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Photo</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Role</th>
                            <th>Action</th>
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
                                <td>
                                    {
                                        user.role === 'admin' ? 'admin' : <button onClick={() => handleMakeAdmin(user)} className="btn btn-outline btn-primary" disabled={adminDisabled}>Made Admin</button>
                                    }
                                </td>
                                <td>
                                    {
                                        user.role === 'instructor' ? 'instructor' :
                                            <button
                                                onClick={() => handleMakeInstructor(user)}
                                                className="btn btn-outline btn-primary"
                                                disabled={instructorDisabled}
                                            >
                                              Made Instructor
                                            </button>
                                    }
                                </td>
                                <td>
                                    <button onClick={() => handleDelete(user)} className="btn btn-secondary"><FaTrashAlt></FaTrashAlt></button>
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