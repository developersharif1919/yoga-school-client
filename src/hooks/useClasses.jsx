import { useEffect, useState } from "react";

const useClasses = () => {
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetch('http://localhost:5000/approvedClasses')
            .then(res => res.json())
            .then(data => {
                setClasses(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching classes:', error);
                setLoading(false);
            });
    }, []);

    return { classes, loading };
};

export default useClasses;