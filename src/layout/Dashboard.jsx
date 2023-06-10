import { Link, Outlet } from "react-router-dom";
import { FaHome, FaShoppingCart, FaUsers } from "react-icons/fa";
import useAdmin from "../hooks/useAdmin";
import useInstructor from "../hooks/useInstructor";
import useSelectedClasses from "../hooks/useSelectedClasses";


const Dashboard = () => {
    const [selectedClass] = useSelectedClasses();

    // TODO: Load data from dynamic
    // const isAdmin = true;
    // const isInstructors = false;

    const [isAdmin] = useAdmin();
    const [isInstructor] = useInstructor();


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
                            <li><Link to="/dashboard/ManageClasses"><FaUsers /> Manage Classes</Link></li>
                        </>
                    ) : (
                        <>
                            {isInstructor ? (
                                <>
                                    <li><Link to='/dashboard/MyClasses'><FaUsers /> MyClass</Link></li>
                                    <li><Link to='/dashboard/AddAClass'><FaUsers /> Add A Class</Link></li>
                                </>
                            ) : (
                                <>
                                    <li><Link to='/dashboard/StudentHome' ><FaUsers /> Student Home</Link></li>
                                    <li>
                                        <Link to='/dashboard/MySelectedClass' >
                                            My Selected Classes
                                            <div className="badge badge-secondary mr-20">+{selectedClass?.length || 0}</div>
                                        </Link>
                                    </li>
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