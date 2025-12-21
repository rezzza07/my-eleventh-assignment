import React from 'react';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';
import ForbiddenRoute from '../components/ForbiddenRoute/ForbiddenRoute';
import Loading from '../components/Loading/Loading';

const AdminRoute = ({ children }) => {
    const {  loading } = useAuth();
    const {role,roleLoading} = useRole();

    if (loading|| roleLoading) {
        return <Loading></Loading>
    }
    if (role !== 'admin') {
        return <ForbiddenRoute></ForbiddenRoute>
    }
    return children;
};

export default AdminRoute;