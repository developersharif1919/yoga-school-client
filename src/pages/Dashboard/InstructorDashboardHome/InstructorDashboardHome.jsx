import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { CiCircleRemove } from "react-icons/ci";
import { FcApproval } from "react-icons/fc";
import { MdHotelClass, MdPending } from "react-icons/md";
import { useContext } from 'react';
import { AuthContext } from '../../../providers/AuthProvider';
import { Helmet } from 'react-helmet-async';


const InstructorDashboardHome = () => {
  const [axiosSecure] = useAxiosSecure();
  const { user } = useContext(AuthContext)
  const { data: instructorStats = [], isLoading } = useQuery(
    ["instructorStats"],
    async () => {
      const res = await axiosSecure.get(`/instructor-stats/${user.email}`);
      return res.data;
    }
  );

  console.log('Admin Stas: ', instructorStats)

  return (
    <div className="text-center">
      <Helmet>
        <title>Yoga School | Instructor Home</title>
      </Helmet>
      <div className="stats shadow">
        {isLoading ? (
          <>
            <div className="flex justify-center items-center h-screen">
              <progress className="progress w-56"></progress>
            </div>
          </>
        ) : (
          <div className='grid grid-cols-3 gap-6 justify-center w-[1080px] bg-orange-400 px-8 py-16'>
            <motion.div
              className="card w-[300px] shadow-xl bg-white px-5 py-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className='flex justify-evenly'>
                <div className="stat-figure text-secondary">
                  <MdHotelClass className='text-5xl'></MdHotelClass>
                </div>
                <div>
                  <div className="stat-title">My Total Classes</div>
                  <div className="stat-value">{instructorStats.instructorAddedClassesCount || 0}</div>
                </div>
              </div>

            </motion.div>

            <motion.div
              className="stat card w-[300px] shadow-lg  bg-white px-5 py-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className='flex justify-evenly'>
                <div className="stat-figure text-secondary">
                  <FcApproval className='text-5xl'></FcApproval>
                </div>
                <div>
                  <div className="stat-title">My Total Approved Classes</div>
                  <div className="stat-value">{instructorStats.approvedClassesCount || 0}</div>
                </div>
              </div>
            </motion.div>


            <motion.div
              className="stat card w-[300px] shadow-lg  bg-white px-5 py-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <div className='flex justify-evenly'>
                <div className="stat-figure text-secondary">
                  <MdPending className='text-5xl'></MdPending>
                </div>
                <div>
                  <div className="stat-title">My Total Pending Classes</div>
                  <div className="stat-value">{instructorStats.pendingClassesCount || 0}</div>
                </div>
              </div>

            </motion.div>

            <motion.div
              className="stat card w-[300px] shadow-lg  bg-white px-5 py-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <div className='flex justify-evenly'>
                <div className="stat-figure text-secondary">
                  <CiCircleRemove className='text-5xl'></CiCircleRemove>
                </div>
                <div>
                  <div className="stat-title">My Total denied Classes</div>
                  <div className="stat-value">{instructorStats.deniedClassesCount || 0}</div>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};


export default InstructorDashboardHome;