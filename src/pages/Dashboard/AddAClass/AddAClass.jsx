import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../../providers/AuthProvider';

const AddAClass = () => {
    const {user} = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleAddClass = (data) => {
        console.log(data);
    };

    return (
        <div className='w-full mx-auto text-center ml-12'>
            <h2>Add a Class</h2>
            <form onSubmit={handleSubmit(handleAddClass)} className='w-full'>


                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Class Name</span>
                    </label>
                    <input type="text" className="input input-bordered w-full" placeholder="Write Class Title" {...register("className", { required: 'Email is required.' })} />
                    {errors.name && <p className='text-red-600'>{errors.name.message}</p>}
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Class Image</span>
                    </label>
                    <input type="text" className="input input-bordered" placeholder="Enter Image Url" {...register("classImage", { required: 'Email is required.' })} />
                    {errors.classImage && <p className='text-red-600'>{errors.classImage.message}</p>}
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Instructor Name</span>
                    </label>
                    <input type="text" className="input input-bordered" value={user.displayName} {...register("instructorName")} readOnly/>
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Instructor Email</span>
                    </label>
                    <input type="email" className="input input-bordered" value={user.email} {...register("instructorEmail")} readOnly />
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Available Seats</span>
                    </label>
                    <input type="number" className="input input-bordered" placeholder="Enter Your Mobile Number" {...register('availableSeats')} />
                    {errors.availableSeats && <p className='text-red-600'>{errors.availableSeats.message}</p>}
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Price</span>
                    </label>
                    <input type="number" className="input input-bordered" placeholder="Enter Your Mobile Number" {...register('price')} />
                    {errors.price && <p className='text-red-600'>{errors.price.message}</p>}
                </div>
                <button type="submit" className="btn w-full btn-outline btn-primary px-8 py-4 my-8">Add Class</button>
            </form>
        </div>
    );
};

export default AddAClass;
