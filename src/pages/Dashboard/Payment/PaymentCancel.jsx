import React from 'react';
import { Link } from 'react-router';

const PaymentCancel = () => {
    return (
        <div>
            <h1>Try Again </h1>
            <Link to="/dashboard/my-orders">
            <button>Try Again</button></Link>
        </div>
    );
};

export default PaymentCancel;