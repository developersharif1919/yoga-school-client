import { useContext } from "react";
import { FaGoogle } from "react-icons/fa";
import { AuthContext } from "../../../providers/AuthProvider";
import Swal from "sweetalert2";

const SocialLogin = () => {
    const {googleSignIn} = useContext(AuthContext);

    const handleGoogleSignIn = ()=>{
        googleSignIn()
        .then(result =>{
            const loggedInUser = result.user;
            console.log(loggedInUser)
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Login Successful',
                text: 'When you log out, click on your profile picture, and then click the logout button to sign out of your account.',
                showConfirmButton: true,
                confirmButtonText: 'Cool',
                timer: 12000
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