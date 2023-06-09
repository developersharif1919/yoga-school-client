import { useContext } from "react";
import { FaGoogle } from "react-icons/fa";
import { AuthContext } from "../../../providers/AuthProvider";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";

const SocialLogin = () => {
    const {googleSignIn} = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";


    const handleGoogleSignIn = ()=>{
        googleSignIn()
        .then(result =>{
            const loggedInUser = result.user;
            const saveUserData = {name:loggedInUser.displayName, email: loggedInUser.email}
            fetch('http://localhost:5000/users',{
                method: 'POST',
                headers: {
                    'content-type' : 'application/json'
                },
                body: JSON.stringify(saveUserData)
            })
            .then(res => res.json())
            .then(() => {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Login Successfully',
                    showConfirmButton: false,
                    timer: 2000
                });
                navigate(from, { replace: true });
            })
        })
    }
    return (
        <div className='text-center p-5'>
            <div className='divider'></div>
            <div>
                <button onClick={handleGoogleSignIn} className="btn  btn-circle btn-outline">
                    <FaGoogle className='text-3xl text-green-600 text-center'></FaGoogle>
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;