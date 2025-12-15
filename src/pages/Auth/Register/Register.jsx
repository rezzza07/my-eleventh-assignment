import React from "react";
import { useForm } from "react-hook-form";
import { FaUser, FaEnvelope, FaLock, FaImage } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router";
import useAuth from "../../../hooks/useAuth";
import SocialLogin from "../SocialLogin/SocialLogin";

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { registerUser } = useAuth();
    const handleRegistration = (data) => {
        console.log(data);
        registerUser(data.email, data.password)
            .then(result => {
                console.log(result.user);
            })
            .catch(error => {
                console.log(error)
            });


    }


    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="w-[700px] max-w-md bg-base-100 rounded-2xl shadow-xl p-8 border border-primary/20">

                {/* Header */}
                <div className="text-center mb-6">
                    <h1 className="text-4xl font-bold text-primary">Create Account</h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Join <span className="text-secondary font-semibold">BookCourier</span> today
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(handleRegistration)}
                    className="space-y-4">

                    {/* Name */}
                    <div className="form-control">
                        <label className="label font-medium">Name</label>
                        <div className="relative">
                            <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" />
                            <input
                                type="text"
                                placeholder="Your name"
                                className="input input-bordered w-full pl-10 focus:border-primary"
                            />
                        </div>
                    </div>

                    {/* Photo */}
                    <div className="form-control">
                        <label className="label font-medium">Profile Photo</label>
                        <div className="relative">
                            <FaImage className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
                            <input
                                type="file"
                                className="file-input file-input-bordered w-full pl-10"
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div className="form-control">
                        <label className="label font-medium">Email</label>
                        <div className="relative">
                            <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" />
                            <input
                                type="email"{...register('email', { required: true })}
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
                                type="password" {...register('password', {
                                    required: true,
                                    minLength: 8,
                                    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
                                })}
                                placeholder="Strong password"
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

                    {/* Register Button */}
                    <button className="btn w-full bg-primary hover:bg-primary/90 text-black font-semibold rounded-xl mt-4">
                        Register
                    </button>
                </form>

                {/* Divider */}
                <div className="flex items-center gap-3 my-6">
                    <div className="flex-1 h-px bg-primary/20"></div>
                    <span className="text-sm text-gray-400">OR</span>
                    <div className="flex-1 h-px bg-secondary/20"></div>
                </div>

                {/* Social Login */}
                <SocialLogin></SocialLogin>

                {/* Footer */}
                <p className="text-center text-sm text-gray-600 mt-6">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="text-secondary font-semibold underline hover:text-secondary/80"
                    >
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
