import React from "react";
import { useForm } from "react-hook-form";
import { FaUser, FaEnvelope, FaLock, FaImage } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import SocialLogin from "../SocialLogin/SocialLogin";
import axios from "axios";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { registerUser, updateUserProfile } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const handleRegistration = (data) => {

        const profileImg = data.photo[0];

        registerUser(data.email, data.password)
            .then(() => {


                const formData = new FormData();
                formData.append('image', profileImg);

                const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`

                axios.post(image_API_URL, formData)
                    .then(res => {
                        const photoURL = res.data.data.url;

                        const userInfo = {
                            email: data.email,
                            displayName: data.name,
                            photoURL: photoURL,
                        }
                        axiosSecure.post('/users',userInfo)
                        .then(res =>{
                            if(res.data.insertedId){
                                console.log('created user')
                            }

                        })


                        const userProfile = {
                            displayName: data.name,
                            photoURL: photoURL
                        }
                        updateUserProfile(userProfile)
                            .then(() => {
                                console.log('User profile updated')
                                navigate(location?.state || '/')
                            })
                            .catch(error => console.log(error))


                    })


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
                                type="text" {...register('name', { required: true })}
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
                                type="file" {...register('photo', { required: true })}
                                className="file-input file-input-bordered btn-secondary text-primary w-full pl-10"
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
                    <button className="btn w-full bg-primary hover:bg-primary/90 text-secondary font-semibold rounded-xl mt-4">
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
                        state={location.state}
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
