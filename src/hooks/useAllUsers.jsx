import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useAllUsers = () => {
    const [axiosSecure] = useAxiosSecure();
    const { data: allUsers = [], refetch } = useQuery(['allUsers'], async () => {
        const res = await axiosSecure.get('/allUsers');
        return res.data;
    })
    return [allUsers]
};

export default useAllUsers;