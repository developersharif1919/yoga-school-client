
import Swal from 'sweetalert2';
import useSelectedClasses from '../../../hooks/useSelectedClasses';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const MySelectedClass = () => {
    const [selectedClass, refetch] = useSelectedClasses();
    const navigate = useNavigate();

    const handleDelete = classId => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/selectedClass/${classId}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            refetch();
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                        }
                    })
            }
        })
    }

    const handlePay = (classItem) => {
        const classId = classItem._id;
       navigate(`/dashboard/payment/${classId}`);
    };

    return (
        <div>
             <Helmet>
                <title>Yoga School | Selected CLasses</title>
            </Helmet>
            <h2 className='text-center my-16 bg-orange-500 py-4 text-white'>My Selected Classes</h2>
            {selectedClass.length === 0 ? (
                <p>No classes selected.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table">
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
                                <th>Delete</th>
                                <th>Pay</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedClass.map((classItem, index) => (
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
                                        <button
                                        style={{opacity:'1'}}
                                            className="btn btn-secondary px-8 py-2"
                                            onClick={() => handleDelete(classItem._id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                    <td>
                                        <button style={{opacity:'1'}} onClick={()=>{handlePay(classItem)}} className="btn btn-warning px-8 py-2">Pay</button>
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

export default MySelectedClass;