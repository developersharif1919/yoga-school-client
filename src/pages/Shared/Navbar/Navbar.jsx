import { useContext, useState } from 'react';
import { Link } from 'react-router-dom'
import { AuthContext } from '../../../providers/AuthProvider';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [isProfileClicked, setIsProfileClicked] = useState(false);

    const handleProfileClick = () => {
        setIsProfileClicked(!isProfileClicked);
    };
    const navItems = <>
        <li>
            <Link to='/'>Home</Link>
        </li>
        <li>
            <Link to='/instructors'>Instructors</Link>
        </li>
        <li>
            <Link to='/Classes'>Classes</Link>
        </li>
        <li>
            <Link to='/signup'>SignUp</Link>
        </li>
    </>


    return (
        <div>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            {navItems}
                        </ul>
                    </div>
                    <Link to='/'>Yoga School</Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navItems}
                    </ul>
                </div>
                <div className="navbar-end">
                    {user ? (
                        <div className="relative">
                            <div className='flex items-center gap-4'>
                                <Link to="/dashboard">Dashboard</Link>
                                <div className="avatar online">
                                    <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                        <img
                                            src={user.photoURL}
                                            alt="Profile"
                                            className="w-12 h-12 rounded-full cursor-pointer"
                                            onClick={handleProfileClick}
                                        />
                                    </div>
                                </div>

                            </div>
                            {isProfileClicked && (
                                <button
                                    className={`btn btn-outline btn-primary absolute right-14 top-10 ${isProfileClicked ? 'block' : 'hidden'}`}
                                    onClick={logOut}
                                >
                                    Logout
                                </button>
                            )}
                        </div>
                    ) : (
                        <Link
                            to="/login"
                            className="btn btn-outline btn-primary px-8 py-4"
                        >
                            Login
                        </Link>
                    )}

                </div>
            </div>
        </div>
    );
};

export default Navbar;