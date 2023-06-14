
const DisplayPopularClass = ({popularClass}) => {
    const{classImage, className, availableSeats, enrollmentStudent, instructorEmail, instructorName, price} = popularClass;

    return (
        <div className="card card-side bg-base-100 shadow-xl items-center border">
        <figure className='w-60 h-60'>
            <img src={classImage} alt="Movie" />
        </figure>
        <div className="card-body">
            <h2 className="card-title">Name:{className} </h2>
            <p>Tutor: {instructorName}</p>
            <p>Email: {instructorEmail}</p>
            <p>Price: ${price}</p>
            <p>Available Seats: {availableSeats}</p>
            {/* <p>Enrolled Student: {enrollmentStudent}</p> */}
        </div>
    </div>
    );
};

export default DisplayPopularClass;