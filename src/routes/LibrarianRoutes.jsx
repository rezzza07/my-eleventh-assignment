import React from 'react';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';
import Loading from '../components/Loading/Loading';
import ForbiddenRoute from '../components/ForbiddenRoute/ForbiddenRoute';

const LibrarianRoutes = ({ children }) => {
    const {  loading } = useAuth();
    const {role,roleLoading} = useRole();

    if (loading|| roleLoading) {
        return <Loading></Loading>
    }
    if (role !== 'librarian') {
        return <ForbiddenRoute></ForbiddenRoute>
    }
    return children;
};

export default LibrarianRoutes;