import { NavLink, Outlet, useLocation } from "react-router-dom";
import { FaHome, FaUsers } from "react-icons/fa";
import useAdmin from "../hooks/useAdmin";
import useInstructor from "../hooks/useInstructor";
import useSelectedClasses from "../hooks/useSelectedClasses";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import './Dashboard.css'
import useStudent from "../hooks/useStudent";


const Dashboard = () => {
  const [selectedClass] = useSelectedClasses();

  // TODO: Load data from dynamic
  // const isAdmin = true;
  // const isInstructors = false;
  const { user } = useContext(AuthContext)
  const location = useLocation();
  const [isAdmin, isAdminLoading] = useAdmin();
  const [isInstructor, isInstructorLoading] = useInstructor();
  const [isStudent, isStudentLoading] = useStudent();



  if (isAdminLoading || isInstructorLoading || isStudentLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <progress className="progress w-56"></progress>
      </div>
    )
  }
  const profilePhoto = user?.photoURL;

  const isActive = (path) => {
    // Check if the current location matches the provided path
    return location.pathname === path;
  };

  return (
    <div className="">
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex p-6  flex-col items-center justify-center">
          {/* Page content here */}
          <Outlet></Outlet>
          {/* <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label> */}

        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}

            {isAdmin ? (
              <>
                <div className="w-12 ml-8 my-5 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img
                    src={profilePhoto}
                    alt="Profile"
                    className="w-12 h-12 rounded-full cursor-pointer"
                  />
                </div>
                <li className='mb-2'>
                  <NavLink to="/dashboard/AdminDashboardHome" isActive={isActive} activeClassName="activeLink">
                    <FaUsers /> Dashboard Home
                  </NavLink>
                </li>
                <li className='mb-2'>
                  <NavLink to="/dashboard/allusers" isActive={isActive} activeClassName="activeLink">
                    <FaUsers /> All Users
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/ManageClasses" isActive={isActive} activeClassName="activeLink">
                    <FaUsers /> Manage Classes
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                {isInstructor ? (
                  <>
                    <div className="w-12 ml-8 my-5 rounded-full ring ring-primary ring-offset-base-100 ring-offset-1">
                      <img
                        src={profilePhoto}
                        alt="Profile"
                        className="w-12 h-12 rounded-full cursor-pointer"
                      />
                    </div>
                    <li className='mb-2'>
                      <NavLink to='/dashboard/InstructorDashboardHome' isActive={isActive} activeClassName="activeLink">
                        <FaUsers /> Dashboard Home
                      </NavLink>
                    </li>
                    <li className='mb-2'>
                      <NavLink to='/dashboard/MyClasses' isActive={isActive} activeClassName="activeLink">
                        <FaUsers /> MyClass
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to='/dashboard/AddAClass' isActive={isActive} activeClassName="activeLink">
                        <FaUsers /> Add A Class
                      </NavLink>
                    </li>
                  </>
                ) : null}
                {isStudent ? (
                  <>
                    <div className="w-12 rounded-full ml-8 my-5 ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img
                        src={profilePhoto}
                        alt="Profile"
                        className="w-12 h-12 rounded-full cursor-pointer"
                      />
                    </div>
                    <li className="mb-2">
                      <NavLink to='/dashboard/StudentDashboardHome' isActive={isActive} activeClassName="activeLink" >
                        <FaUsers />Dashboard Home
                      </NavLink>
                    </li>
                    <li className="mb-2">
                      <NavLink to='/dashboard/MySelectedClass' isActive={isActive} activeClassName="activeLink" >
                        My Selected Classes
                        <div className="badge badge-secondary mr-20">+{selectedClass?.length || 0}</div>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to='/dashboard/PaymentHistory' isActive={isActive} activeClassName="activeLink" >
                        <FaUsers /> Payment History
                      </NavLink>
                    </li>
                  </>
                ) : null}
              </>
            )}

            <div className="divider"></div>

            <li><NavLink to='/'> <FaHome></FaHome> Home</NavLink></li>
          </ul>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;