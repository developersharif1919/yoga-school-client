import { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { useQuery } from '@tanstack/react-query';

const useSelectedClasses = () => {
    const {user} = useContext(AuthContext);
    const { refetch, data: selectedClass = [] } = useQuery({
        queryKey: ['selectedClass', user?.email],
        queryFn: async () => {
            const res = await fetch(`https://summer-camp-server-developersharif1919.vercel.app/selectedClass?email=${user?.email}`)
            return res.json();
        },
    })
    return [selectedClass, refetch]
};

export default useSelectedClasses;