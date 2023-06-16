import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

import { BiBadgeCheck, BiSelectMultiple } from "react-icons/bi";
import { useContext } from 'react';
import { AuthContext } from '../../../providers/AuthProvider';
import { Helmet } from 'react-helmet-async';

const StudentDashboardHome = () => {
  const [axiosSecure] = useAxiosSecure();
  const { user } = useContext(AuthContext)
  const { data: studentsStats = [], isLoading } = useQuery(
    ["studentsStats"],
    async () => {
      const res = await axiosSecure.get(`/student-stats/${user.email}`);
      return res.data;
    }
  );

  return (
    <div className="text-center">
      <Helmet>
        <title>Yoga School | Student Home</title>
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
                  <BiBadgeCheck className='text-5xl'></BiBadgeCheck>
                </div>
                <div>
                  <div className="stat-title">My Enrolled Classes</div>
                  <div className="stat-value">{studentsStats.paymentClassesCount || 0}</div>
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
                  <BiSelectMultiple className='text-5xl'></BiSelectMultiple>
                </div>
                <div>
                  <div className="stat-title">My Selected Classes</div>
                  <div className="stat-value">{studentsStats.selectedClassesCount || 0}</div>
                </div>
              </div>
            </motion.div>

          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboardHome;