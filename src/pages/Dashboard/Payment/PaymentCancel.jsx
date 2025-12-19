import React, {  } from 'react';
import { FaTimesCircle } from 'react-icons/fa';
import { Link, } from 'react-router';



const PaymentCancel = () => {
 

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-secondary/10 via-base-100 to-error/10 px-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl rounded-2xl relative overflow-hidden">

        {/* Decorative blur */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-error/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-secondary/20 rounded-full blur-3xl" />

        <div className="card-body text-center space-y-4">
          <FaTimesCircle className="text-6xl text-error mx-auto animate-pulse" />

          <h2 className="text-2xl font-bold text-base-content">
            Payment Cancelled
          </h2>

          <p className="text-base-content/70">
            Your payment was cancelled.
            Don’t worry — you can try again anytime.
          </p>

          <div className="divider" />

          <div className="flex flex-col gap-3">
            <Link to="/dashboard/my-orders">
              <button className="btn btn-primary w-full">
                Try Again
              </button>
            </Link>

            <Link to="/dashboard">
              <button className="btn btn-outline btn-secondary w-full">
                Back to Dashboard
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancel;
