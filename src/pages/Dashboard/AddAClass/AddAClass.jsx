import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../../providers/AuthProvider';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const img_hosting_token = import.meta.env.VITE_image_upload_token;

const AddAClass = () => {
    const {user, loading} = useContext(AuthContext);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [axiosSecure] = useAxiosSecure();
    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`

    const handleAddClass = async (data) => {
        const formData = new FormData();
        formData.append('image', data.classImage[0]);
      
        try {
          const response = await fetch(img_hosting_url, {
            method: 'POST',
            body: formData
          });
          
          const imgResponse = await response.json();
          
          if (imgResponse.success) {
            const imgUrl = imgResponse.data.display_url;
            const {className, instructorName, instructorEmail, availableSeats, price, classDetails } = data;
            const newClass = {className, instructorName, instructorEmail, availableSeats, price: parseFloat(price), classDetails, classImage: imgUrl}
            console.log(newClass)
            axiosSecure.post('/addClass', newClass)
            .then(data =>{
                  
                if(data.data.insertedId){
                    reset();
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Your Class Added Successfully',
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            })
          }
        } catch (error) {
          console.error('Error uploading image:', error);
        }
      };



    return (
        <div className='w-full mx-auto text-center ml-12'>
            <h2>Add a Class</h2>
            <form onSubmit={handleSubmit(handleAddClass)} className='w-full'>


                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Class Name</span>
                    </label>
                    <input type="text" className="input input-bordered w-full" placeholder="Write Class Title" {...register("className", { required: 'Class Name Is Required.' })} />
                    {errors.className && <p className='text-left text-red-600'>{errors.className.message}</p>}
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
                    <input type="number" className="input input-bordered" placeholder="Enter Your Mobile Number" {...register('availableSeats', { required: 'Write Available Seats.' })} />
                    {errors.availableSeats && <p className='text-left text-red-600'>{errors.availableSeats.message}</p>}
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Price</span>
                    </label>
                    <input type="number" className="input input-bordered" placeholder="Write Enrolled Price" {...register('price', { required: 'Price Is Required' })} />
                    {errors.price && <p className='text-left text-red-600'>{errors.price.message}</p>}
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Details</span>
                    </label>
                    <textarea className="textarea textarea-primary" placeholder="Write Details" {...register('classDetails')}></textarea>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Class Image</span>
                    </label>
                    <input type="file" className="input file-input file-input-bordered w-full max-w-xs" placeholder="Enter Image Url" {...register("classImage", { required: 'Class Image Is Required.' })} />
                    {errors.classImage && <p className='text-left text-red-600'>{errors.classImage.message}</p>}
                </div>
                <button type="submit" className="btn w-full btn-outline btn-primary px-8 py-4 my-8">Add Class</button>
            </form>
        </div>
    );
};

export default AddAClass;
