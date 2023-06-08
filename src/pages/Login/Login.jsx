import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SocialLogin from "../Shared/SocialLogin/SocialLogin";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();
    const { user, signIn, loading } = useContext(AuthContext);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";



    const handleLogin = (data) => {
        const email = data.email;
        const password = data.password;
        console.log(email, password);

        if (user) {
            Swal.fire({
                position: 'center',
                icon: 'info',
                title: 'You are already logged in.',
                showConfirmButton: false,
                timer: 2000
            });
            return;
        }

        signIn(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Login Successful',
                    text: 'When you log out, click on your profile picture, and then click the logout button to sign out of your account.',
                    showConfirmButton: true,
                    confirmButtonText: 'Cool',
                    timer: 12000
                });
                navigate(from, { replace: true });
            })

    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };
    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                    <div className="card flex-shrink-0 w-1/2 shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit(handleLogin)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    placeholder="Enter Your Register Email"
                                    className="input input-bordered"
                                    {...register('email', { required: 'Email is required.' })}
                                />
                                {errors.email && <p className="text-red-600">{errors.email.message}</p>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <div className="relative form-control">
                                    <input
                                        type={passwordVisible ? "text" : "password"}
                                        placeholder="password"
                                        className="input input-bordered"
                                        {...register('password', { required: 'Password is required.' })}
                                    />
                                    <span
                                        className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
                                        onClick={togglePasswordVisibility}
                                    > {passwordVisible ? (
                                        <FaEyeSlash className="text-2xl"></FaEyeSlash>
                                    ) : (
                                        <FaEye className="text-2xl"></FaEye>
                                    )}
                                    </span>
                                </div>
                                {errors.password && <p className="text-red-600">{errors.password.message}</p>}
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <input className="btn btn-outline btn-primary px-8 py-4" type="submit" value={loading ? "Please wait..." : "Login"}
                                    disabled={loading} />
                            </div>
                        </form>
                        <p> <small> New Here? <Link to='/signup'>Create An Account </Link></small></p>
                        <SocialLogin></SocialLogin>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;