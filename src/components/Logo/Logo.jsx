import React from 'react';
import { Link } from 'react-router';

const Logo = () => {
    return (
        <Link to='/'>
            <div>
                <div className="font-bold text-xl flex items-center text-primary gap-2">
                    BookCourier
                </div>
            </div>
        </Link>


    );
};

export default Logo;