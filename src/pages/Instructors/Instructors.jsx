import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import AllInstructors from "./AllInstructors";


const Instructors = () => {
    const { data: instructors = [] } = useQuery({
        queryKey: ["instructors"],
        queryFn: async () => {
            const queryObj = { role: "instructor" };
            const queryString = JSON.stringify(queryObj);

            const res = await fetch(
                `http://localhost:5000/instructors?query=${queryString}`
            );
            return res.json();
        },
    });


    return (
        <div>
            <h2 className="text-center text-lg uppercase font-bold my-10">Toal Instructors: {instructors.length}</h2>
            <div className="grid grid-cols-2 gap-5 my-10">
                {instructors.map((instructor) => (

                    <motion.div
                        key={instructor._id}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        transition={{ duration: 0.5 }}
                    >
                        <AllInstructors key={instructor._id} instructor={instructor}></AllInstructors>
                    </motion.div>

                ))}
            </div>
        </div>
    );
};

export default Instructors;