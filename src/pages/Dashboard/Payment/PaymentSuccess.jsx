import React, { useEffect } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { useSearchParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const axiosSecure = useAxiosSecure();
  console.log(sessionId);

  useEffect(() => {
    if (sessionId) {
      axiosSecure.patch(`/payment-success?session_id=${sessionId}`)
        .then(res => {
          console.log(res.data)
        })
    }
  }, [sessionId, axiosSecure])


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-base-100 to-secondary/10 px-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl rounded-2xl relative overflow-hidden">

        {/* Decorative circles */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-secondary/20 rounded-full blur-3xl" />

        <div className="card-body text-center space-y-4">
          <FaCheckCircle className="text-6xl text-primary mx-auto animate-bounce" />

          <h2 className="text-2xl font-bold text-base-content">
            Payment Successful!
          </h2>

          <p className="text-base-content/70">
            Your payment has been processed successfully.

          </p>

          <div className="divider" />

          <div className="flex flex-col gap-3">
            <button className="btn btn-primary">
              View Order
            </button>
            <button className="btn btn-outline btn-secondary">
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
