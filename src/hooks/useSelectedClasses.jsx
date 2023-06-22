import { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { useQuery } from '@tanstack/react-query';

const useSelectedClasses = () => {
    const {user} = useContext(AuthContext);
    const { refetch, data: selectedClass = [] } = useQuery({
        queryKey: ['selectedClass', user?.email],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/selectedClass?email=${user?.email}`)
            return res.json();
        },
    })
    return [selectedClass, refetch]
};

export default useSelectedClasses;