import React from "react";
import { Link } from "react-router";

const Logo = () => {
  return (
    <Link
      to="/"
      className="flex items-center gap-2 group"
    >
      {/* Logo Image */}
      <img
        src="https://i.ibb.co/zTT8ztcb/unnamed-3.png"
        alt="BookCourier Logo"
        className="w-11 h-11 object-contain"
      />

      {/* Text */}
      <div className="leading-[1.7]">
        <h1 className="text-2xl font-extrabold tracking-wide text-primary">
          Book<span className="text-secondary">Courier</span>
        </h1>

     
      </div>
    </Link>
  );
};

export default Logo;
