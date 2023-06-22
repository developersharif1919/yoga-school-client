import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const DisplayClasses = ({ singleClass }) => {
  const { classImage, className, instructorEmail, instructorName, availableSeats, price, _id } = singleClass;
  const [axiosSecure] = useAxiosSecure();

  const { user } = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState(null);

  const currentUserEmail = user ? user.email : '';

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axiosSecure.get(`http://localhost:5000/currentUser/${currentUserEmail}`);
        setCurrentUser(response.data);
      } catch (error) {
        // console.log(error);
      }
    };

    fetchCurrentUser();
  }, [axiosSecure, currentUserEmail]);

  const handleSelect = () => {
    if (isLoggedIn()) {
      if (availableSeats > 0) {
        const selectedClass = { selectedClassId: _id, classImage, className, instructorName, instructorEmail, availableSeats, price, userEmail: user.email };
       const singleAddClassId = selectedClass.selectedClassId;
       
        fetch('http://localhost:5000/selectedClass', {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(selectedClass)
        })
          .then(res => res.json())
          .then(data => {
            if (data.message === 'You already selected this class') {
              Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'You have already selected this class',
                showConfirmButton: false,
                timer: 2000
              });
            } else if (data.insertedId) {
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Class Selected Done',
                showConfirmButton: false,
                timer: 2000
              });
            }
          });
      } else {
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'No Available Seats',
          showConfirmButton: false,
          timer: 2000
        });
      }
    } else {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'You need to log in before selecting a class',
        showConfirmButton: false,
        timer: 2000
      });
      navigate('/login', { state: { from: location } });
    }
  };

  const isLoggedIn = () => {
    return currentUser !== null;
  };

  const isButtonDisabled = () => {
    return (
      availableSeats === 0 ||
      (isLoggedIn() && (currentUser.role === 'admin' || currentUser.role === 'instructor'))
    );
  };

  const getClassCardClassName = () => {
    return availableSeats === 0 ? 'card flex-col md:flex-row lg:flex-row card-side bg-red-500 shadow-xl items-center border' : 'card card-side flex-col md:flex-row lg:flex-row  bg-base-100 shadow-xl items-center border';
  };

  return (
    <div className={getClassCardClassName()}>
      <figure className='w-60 h-60'>
        <img src={classImage} alt="Movie" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">Class Name: {className}</h2>
        <h2 className="card-title">Instructor Name: {instructorName}</h2>
        <p>Available Seats: {availableSeats}</p>
        <p>Price: $ {price}</p>
        <button
          onClick={handleSelect}
          style={{opacity:'1'}}
          disabled={isButtonDisabled()}
          className="btn btn-warning"
        >
          Select
        </button>
      </div>
    </div>
  );
};

export default DisplayClasses;
