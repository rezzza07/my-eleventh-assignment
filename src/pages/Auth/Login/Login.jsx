import React from "react";
import { useForm } from "react-hook-form";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import SocialLogin from "../SocialLogin/SocialLogin";

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signInUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = (data) => {
    signInUser(data.email, data.password)
      .then(() => navigate(location?.state || "/"))
      .catch(console.error);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 bg-base-200">
      <div className="w-full max-w-md sm:max-w-lg bg-base-100 rounded-2xl shadow-2xl p-6 sm:p-8">

        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-primary">
            Welcome Back
          </h1>
          <p className="text-sm sm:text-base text-base-content/70 mt-1">
            Login to <span className="text-secondary font-semibold">BookCourier</span>
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(handleLogin)} className="space-y-5">

          {/* Email */}
          <div>
            <label className="label font-medium">Email</label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" />
              <input
                type="email"
                {...register("email", { required: true })}
                placeholder="Email address"
                className="input input-bordered w-full h-12 pl-10 focus:border-primary"
              />
            </div>
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">Email is required</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="label font-medium">Password</label>
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
              <input
                type="password"
                {...register("password", {
                  required: true,
                  minLength: 8,
                  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
                })}
                placeholder="Your password"
                className="input input-bordered w-full h-12 pl-10 focus:border-secondary"
              />
            </div>
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">
                Password must be 8+ chars with upper, lower & number
              </p>
            )}
          </div>

          {/* Forgot password */}
          <div className="text-right">
            <span className="text-sm text-secondary cursor-pointer hover:underline">
              Forgot password?
            </span>
          </div>

          {/* Login Button */}
          <button className="btn btn-primary w-full h-12 text-base font-semibold rounded-xl">
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-base-content/20"></div>
          <span className="text-sm text-base-content/60">OR</span>
          <div className="flex-1 h-px bg-base-content/20"></div>
        </div>

        {/* Social Login */}
        <SocialLogin />

        {/* Footer */}
        <p className="text-center text-sm text-base-content/70 mt-6">
          Don’t have an account?{" "}
          <Link
            state={location.state}
            to="/register"
            className="text-primary font-semibold underline hover:text-primary/80"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
