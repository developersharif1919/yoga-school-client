import { useContext, useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AuthContext } from '../../../providers/AuthProvider';
import './Navbar.css'

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isProfileClicked, setIsProfileClicked] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();

  const [theme, setTheme] = useState(
    localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light'
  );

  useEffect(() => {
    localStorage.setItem('theme', theme);
    const localTheme = localStorage.getItem('theme');
    document.querySelector('html').setAttribute('data-theme', localTheme);
    if (localTheme === 'dark') {
      setDarkMode(true);
      document.body.style.backgroundColor = 'black';
    } else {
      setDarkMode(false);
      document.body.style.backgroundColor = '';
    }
  }, [theme]);

  const handleProfileClick = () => {
    setIsProfileClicked(!isProfileClicked);
  };

  const handleToggle = (e) => {
    if (e.target.checked) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };
  const isActive = (path) => {
    // Check if the current location matches the provided path
    return location.pathname === path;
  };


  const navItems = (
    <>
      <li className='mr-2'>
        <NavLink to="/" isActive={isActive} activeClassName="activeLink">Home</NavLink>
      </li>
      <li className='mr-2'>
        <NavLink to="/instructors" isActive={isActive} activeClassName="activeLink">Instructors</NavLink>
      </li >
      <li className='mr-2'>
        <NavLink to="/Classes" isActive={isActive} activeClassName="activeLink">Classes</NavLink>
      </li>
      <li className='mr-2'>
        <NavLink to="/signup" isActive={isActive} activeClassName="activeLink">SignUp</NavLink>
      </li>
    </>
  );

  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <label style={{ opacity: '1', display: 'none' }} tabIndex={0} className="btn mobile-visible btn-ghost bg-orange-400 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm z-10 dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <div className='my-5 bg-orange-400 p-2'>
                <Link to="/" className='font-bold text-2xl ml-5' style={{ color: 'white' }}>Yoga School</Link>

              </div>
              {navItems}
            </ul>
          </div>
          <Link to="/" className='font-bold text-2xl ml-5 logo-hide' style={{ color: 'orange' }}>Yoga School</Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navItems}</ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <div className="relative">
              <div className="flex items-center gap-4">
                <div className="">
                  <label className="swap swap-rotate">
                    {/* this hidden checkbox controls the state */}
                    <input
                      className="w-[50px]"
                      type="checkbox"
                      onChange={handleToggle}
                    />

                    {/* sun icon */}
                    <svg
                      className="swap-on fill-current w-10 h-10"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                    </svg>

                    {/* moon icon */}
                    <svg
                      className="swap-off fill-current w-10 h-10"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                    </svg>
                  </label>
                </div>
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
                  className={`btn btn-outline btn-primary absolute right-14 top-10 ${isProfileClicked ? "block" : "hidden"
                    }`}
                  onClick={logOut}
                >
                  Logout
                </button>
              )}
            </div>
          ) : (
            <div className="flex">
              <NavLink
                to="/login"
                className="btn btn-outline btn-primary px-8 py-4"
              >
                Login
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
