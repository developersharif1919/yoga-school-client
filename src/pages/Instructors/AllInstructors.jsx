

const AllInstructors = ({ instructor }) => {
    const { name, email, photoUrl
    } = instructor;
    console.log('name', instructor)
    return (
        <div className="card flex-col md:flex-row lg:flex-row card-side bg-base-100 shadow-xl items-center border">
            <figure className='w-60 h-60'>
                <img src={photoUrl} alt="Movie" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">Name: {name}</h2>
                <p>Email: {email}</p>
            </div>
        </div>
    );
};

export default AllInstructors;