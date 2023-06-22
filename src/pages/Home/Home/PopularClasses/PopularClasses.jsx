import { useQuery } from '@tanstack/react-query';
import DisplayPopularClass from './displayPopularClass';
import { motion } from "framer-motion";


const PopularClasses = () => {
  const { isLoading, data: popularClasses = [] } = useQuery(['popularClasses'], async () => {
    const res = await fetch('http://localhost:5000/popularClasses');
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
      <h2 className="text-center text-lg uppercase font-bold my-10">Our Top Classes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 my-10">
                {popularClasses.map((popularClass) => (

                    <motion.div
                        key={popularClass._id}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        transition={{ duration: 0.5 }}
                    >
                       <DisplayPopularClass popularClass={popularClass}></DisplayPopularClass>
                    </motion.div>

                ))}
            </div>
    </div>
  );
};

export default PopularClasses;
