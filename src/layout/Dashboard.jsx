import { useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { FaHome, FaBars, FaUsers, FaTimes } from "react-icons/fa";
import useAdmin from "../hooks/useAdmin";
import useInstructor from "../hooks/useInstructor";
import useSelectedClasses from "../hooks/useSelectedClasses";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import "./Dashboard.css";
import useStudent from "../hooks/useStudent";

const Dashboard = () => {
  const [selectedClass] = useSelectedClasses();
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const [isAdmin, isAdminLoading] = useAdmin();
  const [isInstructor, isInstructorLoading] = useInstructor();
  const [isStudent, isStudentLoading] = useStudent();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (isAdminLoading || isInstructorLoading || isStudentLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <progress className="progress w-56"></progress>
      </div>
    );
  }

  const profilePhoto = user?.photoURL;
  const userName = user?.displayName;

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="">
      <nav className="navbar flex-col bg-base-200 lg:hidden">
        <div className="flex w-full justify-between p-5">
          <NavLink to="/" className="text-lg flex flex-col items-center font-bold">
            <div className="w-12  my-5 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img
                src={profilePhoto}
                alt="Profile"
                className="w-12 h-12 rounded-full cursor-pointer"
              />
            </div>
            <div>
              <h2>{userName}</h2>
            </div>
          </NavLink>
          <div>
            <button
              className="navbar-toggle"
              onClick={handleMenuToggle}
              aria-label="Toggle Navigation"
            >
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
        <div>
          {isMenuOpen && (
            <ul className="menu mt-2">
              {isAdmin ? (
                <>
                  <li className="mb-2">
                    <NavLink
                      to="/dashboard/AdminDashboardHome"
                      isActive={isActive}
                      activeClassName="activeLink"
                    >
                      <FaUsers /> Dashboard Home
                    </NavLink>
                  </li>
                  <li className="mb-2">
                    <NavLink
                      to="/dashboard/allusers"
                      isActive={isActive}
                      activeClassName="activeLink"
                    >
                      <FaUsers /> All Users
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/ManageClasses"
                      isActive={isActive}
                      activeClassName="activeLink"
                    >
                      <FaUsers /> Manage Classes
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  {isInstructor ? (
                    <>
                      <li className="mb-2">
                        <NavLink
                          to="/dashboard/InstructorDashboardHome"
                          isActive={isActive}
                          activeClassName="activeLink"
                        >
                          <FaUsers /> Dashboard Home
                        </NavLink>
                      </li>
                      <li className="mb-2">
                        <NavLink
                          to="/dashboard/MyClasses"
                          isActive={isActive}
                          activeClassName="activeLink"
                        >
                          <FaUsers /> MyClass
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/dashboard/AddAClass"
                          isActive={isActive}
                          activeClassName="activeLink"
                        >
                          <FaUsers /> Add A Class
                        </NavLink>
                      </li>
                    </>
                  ) : null}
                  {isStudent ? (
                    <>
                      <li className="mb-2">
                        <NavLink
                          to="/dashboard/StudentDashboardHome"
                          isActive={isActive}
                          activeClassName="activeLink"
                        >
                          <FaUsers /> Dashboard Home
                        </NavLink>
                      </li>
                      <li className="mb-2">
                        <NavLink
                          to="/dashboard/MySelectedClass"
                          isActive={isActive}
                          activeClassName="activeLink"
                        >
                          My Selected Classes
                          <div className="badge badge-secondary mr-20">
                            +{selectedClass?.length || 0}
                          </div>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/dashboard/PaymentHistory"
                          isActive={isActive}
                          activeClassName="activeLink"
                        >
                          <FaUsers /> Payment History
                        </NavLink>
                      </li>
                    </>
                  ) : null}
                </>
              )}
              <li>
                <NavLink to="/">
                  <FaHome /> Home
                </NavLink>
              </li>
            </ul>
          )}
        </div>
      </nav>
      <div className="lg:drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex p-6  flex-col items-center justify-center">
          {/* Page content here */}
          <Outlet></Outlet>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 h-auto lg:h-full bg-base-200 text-base-content">
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
                <li className="mb-2">
                  <NavLink
                    to="/dashboard/AdminDashboardHome"
                    isActive={isActive}
                    activeClassName="activeLink"
                  >
                    <FaUsers /> Dashboard Home
                  </NavLink>
                </li>
                <li className="mb-2">
                  <NavLink
                    to="/dashboard/allusers"
                    isActive={isActive}
                    activeClassName="activeLink"
                  >
                    <FaUsers /> All Users
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/ManageClasses"
                    isActive={isActive}
                    activeClassName="activeLink"
                  >
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
                    <li className="mb-2">
                      <NavLink
                        to="/dashboard/InstructorDashboardHome"
                        isActive={isActive}
                        activeClassName="activeLink"
                      >
                        <FaUsers /> Dashboard Home
                      </NavLink>
                    </li>
                    <li className="mb-2">
                      <NavLink
                        to="/dashboard/MyClasses"
                        isActive={isActive}
                        activeClassName="activeLink"
                      >
                        <FaUsers /> MyClass
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/dashboard/AddAClass"
                        isActive={isActive}
                        activeClassName="activeLink"
                      >
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
                      <NavLink
                        to="/dashboard/StudentDashboardHome"
                        isActive={isActive}
                        activeClassName="activeLink"
                      >
                        <FaUsers /> Dashboard Home
                      </NavLink>
                    </li>
                    <li className="mb-2">
                      <NavLink
                        to="/dashboard/MySelectedClass"
                        isActive={isActive}
                        activeClassName="activeLink"
                      >
                        My Selected Classes
                        <div className="badge badge-secondary mr-20">
                          +{selectedClass?.length || 0}
                        </div>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/dashboard/PaymentHistory"
                        isActive={isActive}
                        activeClassName="activeLink"
                      >
                        <FaUsers /> Payment History
                      </NavLink>
                    </li>
                  </>
                ) : null}
              </>
            )}
            <div className="divider"></div>
            <li>
              <NavLink to="/">
                <FaHome /> Home
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
