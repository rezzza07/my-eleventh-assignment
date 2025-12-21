import Lottie from "lottie-react";


import { MdBlock, MdLockOutline } from "react-icons/md";
import { Link } from "react-router";

const ForbiddenRoute = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-base-100 to-secondary/10 px-4">

      <div className="max-w-md w-full bg-base-100 rounded-3xl shadow-2xl p-10 text-center border border-primary/20">

        {/* Icon */}
        <div className="relative inline-flex mb-6">
          <MdBlock className="text-7xl text-error animate-pulse" />
          <MdLockOutline className="absolute -bottom-2 -right-2 text-3xl text-secondary" />
        </div>

        {/* Title */}
        <h1 className="text-5xl font-extrabold text-error mb-2">403</h1>
        <h2 className="text-xl font-semibold text-base-content mb-3">
          Access Forbidden
        </h2>

        {/* Description */}
        <p className="text-base-content/70 mb-6">
          You don’t have permission to access this page.
          Please contact an administrator if you believe this is a mistake.
        </p>

        {/* Actions */}
        <div className="flex gap-4 justify-center">
          <Link
            to="/"
            className="btn btn-primary rounded-xl px-6"
          >
            Go Home
          </Link>

          <Link
            to="/login"
            className="btn btn-outline btn-secondary rounded-xl px-6"
          >
            Login
          </Link>
        </div>
      </div>

    </div>
  );
};


export default ForbiddenRoute;
