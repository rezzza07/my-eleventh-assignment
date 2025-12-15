import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import useAuth from '../../../hooks/useAuth';
import { useLocation, useNavigate } from 'react-router';

const SocialLogin = () => {
    const { signInGoogle } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const handleGoogleSignIn = () => {
        signInGoogle()
            .then(result => {
                console.log(result.user);
                navigate(location?.state || '/')
            })
            .catch(error => {
                console.log(error)
            });
    }
    return (
        <div>
            <button
                onClick={handleGoogleSignIn}
                className="btn w-full bg-base-200 hover:bg-base-300 rounded-xl flex items-center justify-center gap-3">
                <FcGoogle className="text-2xl" />
                Continue with Google
            </button>
        </div>
    );
};

export default SocialLogin;