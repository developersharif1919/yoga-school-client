import { useQuery } from '@tanstack/react-query';
import { motion } from "framer-motion";
import DisplayPopularInstructors from './DisplayPopularInstructors';

const PopularInstructors = () => {
    const { isLoading, data: popularInstructors = [] } = useQuery(['popularInstructors'], async () => {
        const res = await fetch('https://summer-camp-server-developersharif1919.vercel.app/popularInstructors');
        return res.json();
      });
    
      if (isLoading) {
        return (
          <div className="flex justify-center items-center h-screen">
            <progress className="progress w-56"></progress>
          </div>
        );
      }
  return (
    <div>
    <h2 className="text-center text-lg uppercase font-bold my-16">Popular Instructors</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 my-10">
              {popularInstructors.map((instructor) => (

                  <motion.div
                      key={instructor._id}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -50 }}
                      transition={{ duration: 0.5 }}
                  >
                    <DisplayPopularInstructors instructor={instructor}></DisplayPopularInstructors>
                  </motion.div>

              ))}
          </div>
  </div>
  );
};

export default PopularInstructors;
