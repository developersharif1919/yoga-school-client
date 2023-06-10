import { useEffect, useState } from "react";

const useClasses = () => {
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        // TODO changes addClasses
        fetch('http://localhost:5000/addClasses')
        .then(res=> res.json())
        .then(data => {
            setClasses(data);
            setLoading(false);
        })
        .catch(error => {
            console.error('Error fetching classes:', error);
            setLoading(false);
          });
    },[classes, loading])
    return (
        <div>
             
        </div>
    );
};

export default useClasses;