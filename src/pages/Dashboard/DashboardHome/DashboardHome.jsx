import React from 'react';
import useRole from '../../../hooks/useRole';
import Loading from '../../../components/Loading/Loading';
import AdminDashboardHome from './AdminDashboardHome';
import LibrarianDashboardHome from './LibrarianDashboardHome';
import UserDashboardHome from './UserDashboardHome';

const DashboardHome = () => {
    const {role, roleLoading} = useRole();
    if (roleLoading) {
        return <Loading></Loading>
    }
    if (role === 'admin') {
        return <AdminDashboardHome></AdminDashboardHome>
    }
    else if (role === 'librarian') {
        return <LibrarianDashboardHome></LibrarianDashboardHome>
    }
    else {
        return <UserDashboardHome></UserDashboardHome>
    }
    
};

export default DashboardHome;