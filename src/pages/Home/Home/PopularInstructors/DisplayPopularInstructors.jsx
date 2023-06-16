

const DisplayPopularInstructors = ({instructor}) => {
    const {name, photoUrl, email, address, number} = instructor;
    return (
        <div className="card flex-col md:flex-row lg:flex-row p-5 card-side bg-base-100 shadow-xl items-center border">
        <figure className='w-60 h-60'>
            <img src={photoUrl} alt="Profile Photo" />
        </figure>
        <div className="card-body">
            <h2 className="card-title">Name: {name} </h2>
            <p>Email: {email} </p>
            <p>Contact: {number} </p>
            <p>Address: {address} </p>
        </div>
    </div>
    );
};

export default DisplayPopularInstructors;