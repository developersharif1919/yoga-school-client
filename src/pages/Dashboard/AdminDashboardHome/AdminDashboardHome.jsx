

import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaUsers } from "react-icons/fa";
import { MdAddTask, MdHotelClass, MdModelTraining } from "react-icons/md";
import { Helmet } from 'react-helmet-async';

const AdminDashboardHome = () => {

  const [axiosSecure] = useAxiosSecure();
  const { data: adminStats = [], isLoading } = useQuery(
    ["adminStats"],
    async () => {
      const res = await axiosSecure.get('/admin-stats'); // Update the API endpoint
      return res.data;
    }
  );

  console.log('Admin Stas: ', adminStats)

  return (
    <div className="text-center">
      <Helmet>
        <title>Yoga School | Admin Home</title>
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
                  <FaUsers className='text-5xl'></FaUsers>
                </div>
                <div>
                  <div className="stat-title">Total Users</div>
                  <div className="stat-value">{adminStats.usersCount || 0}</div>
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
                  <MdHotelClass className='text-5xl'></MdHotelClass>
                </div>
                <div>
                  <div className="stat-title">Total Classes</div>
                  <div className="stat-value">{adminStats.addClassesCount || 0}</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="stat card w-[300px] shadow-lg  bg-white px-5 py-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className='flex justify-evenly'>
                <div className="stat-figure text-secondary">
                  <MdHotelClass className='text-5xl'></MdHotelClass>
                </div>
                <div>
                  <div className="stat-title text-lg">Total Selected Classes</div>
                  <div className="stat-value">{adminStats.selectedClassesCount || 0}</div>
                </div>
              </div>

            </motion.div>

            <motion.div
              className="stat card w-[300px] shadow-lg  bg-white px-5 py-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >

              <div className='flex justify-evenly'>
                <div className="stat-figure text-secondary">
                  <MdAddTask className='text-5xl'></MdAddTask>
                </div>
                <div>
                  <div className="stat-title">Total Enrolled Classes</div>
                  <div className="stat-value">{adminStats.paymentCount || 0}</div>
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
                  <MdModelTraining className='text-5xl'></MdModelTraining>
                </div>
                <div>
                  <div className="stat-title">Total Instructors</div>
                  <div className="stat-value">{adminStats.instructorsCount || 0}</div>
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
                  <MdHotelClass className='text-5xl'></MdHotelClass>
                </div>
                <div>
                  <div className="stat-title">Total Approved Classes</div>
                  <div className="stat-value">{adminStats.approvedClassesCount || 0}</div>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboardHome;
