import { useContext, useEffect, useState } from "react";
import axios from 'axios';
import { AuthContext } from "../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const DisplayClasses = ({ singleClass }) => {
    const { classImage, className, instructorName, availableSeats, price } = singleClass;
    const [currentUser, setCurrentUser] = useState(null);
    const { user } = useContext(AuthContext);
    const currentUserEmail = user ? user.email : '';
    const navigate = useNavigate()


    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/currentUser/${currentUserEmail}`);
                setCurrentUser(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchCurrentUser();
    }, [currentUserEmail]);

    const handleSelect = () => {
        if (isLoggedIn()) {
            if (availableSeats > 0) {
                //TODO Logic for selecting the course
                console.log('Course selected');
            } else {
                console.log('No available seats');
            }
        } else {
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'Your have log in before selecting the course',
                showConfirmButton: false,
                timer: 2000
            });
            navigate('/login')
        }
    };
    const isLoggedIn = () => {
        return currentUser !== null;

    };

    const isButtonDisabled = () => {
        return (
            availableSeats === 0 ||
            (currentUser && (currentUser.role === 'admin' || currentUser.role === 'instructor'))
        );
    };

    const getClassCardClassName = () => {
        return availableSeats === 0 ? 'card card-side bg-red-500 shadow-xl items-center border' : 'card card-side bg-base-100 shadow-xl items-center border';
    };

    return (
        <div className="card card-side bg-base-100 shadow-xl items-center border">
            <figure className='w-60 h-60'>
                <img src={classImage} alt="Movie" />
            </figure>
            <div className="card-body">
                <h2 className="card-title"> Class Name: {className}</h2>
                <h2 className="card-title">Instructor Name: {instructorName}</h2>
                <p>Available Seats: {availableSeats}</p>
                <p>price: $ {price}</p>
                <button
                    onClick={handleSelect}
                    disabled={isButtonDisabled()}
                    className="btn btn-primary"
                >
                    Select
                </button>
            </div>
        </div>
    );
};

export default DisplayClasses;