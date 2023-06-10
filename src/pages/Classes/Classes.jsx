import { useQuery } from "@tanstack/react-query";
import DisplayClasses from "./DisplayClasses";
import useAxiosSecure from "../../hooks/useAxiosSecure";


const Classes = () => {
    const { refetch, data: classes = [] } = useQuery({
        queryKey: ["classes"],
        queryFn: async () => {
            const res = await fetch('https://summer-camp-server-developersharif1919.vercel.app/approvedClasses');
            return res.json();
        },
    });

    return (
        <div>
            <div className="grid grid-cols-2 gap-5 my-10">
                {
                    classes.map((singleClass, index) => (
                        <DisplayClasses key={index} singleClass={singleClass}></DisplayClasses>
                    ))
                }
            </div>
        </div>
    );
};

export default Classes;