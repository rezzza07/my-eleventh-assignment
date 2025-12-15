import React from "react";
import { useForm } from "react-hook-form";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import SocialLogin from "../SocialLogin/SocialLogin";


const Login = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signInUser } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();



    const handleLogin = (data) => {
        console.log(data);
        signInUser(data.email, data.password)
            .then(result => {
                console.log(result.user);
                navigate(location?.state || '/')
            })
            .catch(error => {
                console.error(error)
            })
    }
    return (
        <div className="min-h-screen flex items-center justify-center  px-4">
            <div className="w-full max-w-md bg-base-100 rounded-2xl shadow-xl p-8 border border-primary/20">

                {/* Header */}
                <div className="text-center mb-6">
                    <h1 className="text-4xl font-bold text-primary">Welcome Back</h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Login to <span className="text-secondary font-semibold">BookCourier</span>
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">

                    {/* Email */}
                    <div className="form-control">
                        <label className="label font-medium">Email</label>
                        <div className="relative">
                            <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" />
                            <input
                                type="email"
                                {...register("email", { required: true })}
                                placeholder="Email address"
                                className="input input-bordered w-full pl-10 focus:border-primary"
                            />
                            {errors.email && <p className="text-red-500">Email is required.</p>}
                        </div>
                    </div>

                    {/* Password */}
                    <div className="form-control">
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
                                className="input input-bordered w-full pl-10 focus:border-secondary"
                            />
                            {errors.password?.type === "required" && (
                                <p className="text-red-500">Password is required.</p>
                            )}
                            {errors.password?.type === "minLength" && (
                                <p className="text-red-500">Password must be at least 8 characters.</p>
                            )}
                            {errors.password?.type === "pattern" && (
                                <p className="text-red-500">Password must include at least one uppercase letter, one lowercase letter, and one number.</p>
                            )}
                        </div>
                    </div>

                    {/* Forgot password */}
                    <div className="text-right">
                        <span className="text-sm text-secondary cursor-pointer hover:underline">
                            Forgot password?
                        </span>
                    </div>

                    {/* Login Button */}
                    <button className="btn w-full bg-primary hover:bg-primary/90 text-black font-semibold rounded-xl mt-2">
                        Login
                    </button>
                </form>

                {/* Divider */}
                <div className="flex items-center gap-3 my-6">
                    <div className="flex-1 h-px bg-primary/20"></div>
                    <span className="text-sm text-gray-400">OR</span>
                    <div className="flex-1 h-px bg-secondary/20"></div>
                </div>

                {/* Google Login */}
                <SocialLogin></SocialLogin>

                {/* Footer */}
                <p className="text-center text-sm text-gray-600 mt-6">
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
