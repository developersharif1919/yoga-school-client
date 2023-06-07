import { useForm } from "react-hook-form";

const SignUp = () => {
    const { register, handleSubmit, formState: { errors }, watch, } = useForm();
    const onSubmit = data => {
        console.log(data)
    };

    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/;
    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse md:justify-between">
                    <div className="text-center w-1/2 lg:text-left">
                        <h1 className="text-5xl font-bold">Sign Up now!</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                    <div className="card flex-shrink-0 w-1/2 shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" className="input input-bordered" placeholder="Enter Your Name"  {...register("name")} />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" className="input input-bordered" placeholder="Enter Your Email" {...register("email", { required: 'Email is required.' })} />
                                {errors.email && <p className='text-red-600'>{errors.email.message}</p>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" className="input input-bordered" placeholder="Enter Your Password" {...register('password', {
                                    required: 'Password is required.',
                                    pattern: {
                                        value: passwordPattern,
                                        message: 'Password must contain at least one lowercase letter, one uppercase letter, and one special character.',
                                    },
                                })} />
                                {errors.password && <p className="text-red-600">{errors.password.message}</p>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Confirm Password</span>
                                </label>
                                <input type="password" className="input input-bordered" placeholder="Enter Confirm Password" {...register('confirmPassword', {
                                    required: 'Please confirm your password.',
                                    validate: (value) => value === watch('password') || 'Passwords do not match.',
                                })} />
                                {errors.confirmPassword && <p className="text-red-600">{errors.confirmPassword.message}</p>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo</span>
                                </label>
                                <input type="text" className="input input-bordered" defaultValue="Enter Your Photo URL" {...register("photoURL")} />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Gender</span>
                                </label>
                                <select {...register('gender', { required: true })}>
                                    <option value="">Please select</option>
                                    <option value="female">Female</option>
                                    <option value="male">Male</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Phone Number</span>
                                </label>
                                <input type="number" className="input input-bordered" placeholder="Enter Your Mobile Number" {...register('number')} />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Address</span>
                                </label>
                                <input type="text" className="input input-bordered" placeholder="Enter Your Address" {...register('address')} />
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-outline btn-primary px-8 py-4">Sign Up</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;