import { Link, Outlet } from "react-router-dom";
import { FaHome, FaUsers } from "react-icons/fa";
import useAdmin from "../hooks/useAdmin";


const Dashboard = () => {

    // TODO: Load data from dynamic
    // const isAdmin = true;
    // const isInstructors = false;

    const [isAdmin] = useAdmin();
    const [isInstructors] = useAdmin();


    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center">
                {/* Page content here */}
                <Outlet></Outlet>
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
                    {/* Sidebar content here */}

                    {isAdmin ? (
                        <>
                            <li><Link to="/dashboard/allusers"><FaUsers /> All Users</Link></li>
                        </>
                    ) : (
                        <>
                            {isInstructors ? (
                                <>
                                    <li><Link ><FaUsers /> Instructors</Link></li>
                                </>
                            ) : (
                                <>
                                    <li><Link ><FaUsers /> Student User</Link></li>
                                </>
                            )}
                        </>
                    )}

                    <div className="divider"></div>

                    <li><Link to='/'> <FaHome></FaHome> Home</Link></li>
                </ul>

            </div>
        </div>
    );
};

export default Dashboard;