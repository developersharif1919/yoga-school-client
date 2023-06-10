import React from 'react';

const DisplayMangeClasses = ({ classItem }) => {
    const { classImage, className, instructorName, instructorEmail, availableSeats, price } = classItem;
    console.log(classItem[0].classImage );
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Class Image</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <div className="flex items-center space-x-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={classImage} alt="Class Image" />
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>

                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default DisplayMangeClasses;