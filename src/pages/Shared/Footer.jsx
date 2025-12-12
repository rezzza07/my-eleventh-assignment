import React from "react";
import { FaFacebookF, FaLinkedinIn, FaPinterestP } from "react-icons/fa";
import { FaLocationDot, FaXTwitter } from "react-icons/fa6";
import { IoCall } from "react-icons/io5";
import { MdEmail } from "react-icons/md";


const Footer = () => {
  return (
    <footer
      className="text-secondary"
      style={{ backgroundColor: "#003C37" }}
    >
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-sm">

        {/* Brand Section */}
        <div>
          <h2 className="text-3xl font-bold flex items-center gap-2 text-secondary">
            
            BookVerse
          </h2>

          <p className="mt-4 leading-6 text-secondary/80">
            We specialize in selling items related to writing, 
            office supplies, and other paper-based products. 
            Common items found in a stationery shop include.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-6">
            <span className="w-10 h-10 bg-secondary/20 flex items-center justify-center rounded-lg hover:bg-secondary/30 cursor-pointer">
              <FaFacebookF />
            </span>
            <span className="w-10 h-10 bg-secondary/20 flex items-center justify-center rounded-lg hover:bg-secondary/30 cursor-pointer">
              <FaXTwitter />
            </span>
            <span className="w-10 h-10 bg-secondary/20 flex items-center justify-center rounded-lg hover:bg-secondary/30 cursor-pointer">
              <FaLinkedinIn />
            </span>
            <span className="w-10 h-10 bg-secondary/20 flex items-center justify-center rounded-lg hover:bg-secondary/30 cursor-pointer">
              <FaPinterestP />
            </span>
          </div>
        </div>

        {/* Site Links */}
        <div>
          <h3 className="text-lg font-semibold border-b-2 pb-1" style={{ borderColor: "#D8C8A5" }}>
            Site Links
          </h3>
          <ul className="mt-4 space-y-3 text-secondary/85">
            <li>Home</li>
            <li>Contact</li>
            <li>Cart</li>
            <li>Wishlist</li>
          </ul>
        </div>

        {/* Account */}
        <div>
          <h3 className="text-lg font-semibold border-b-2 pb-1" style={{ borderColor: "#D8C8A5" }}>
            Account
          </h3>
          <ul className="mt-4 space-y-3 text-secondary/85">
            <li>Sign in</li>
            <li>Sign up</li>
            <li>Orders</li>
            <li>Track order</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold border-b-2 pb-1" style={{ borderColor: "#D8C8A5" }}>
            Contact Us
          </h3>

          <ul className="mt-4 space-y-4 text-secondary/85">
            <li className="flex items-start gap-3">
              {/* <IoLocationSharp className="text-xl" /> */}
              <FaLocationDot className="text-xl"  />
               15205 North Kierland Blvd. 100 Old City House
            </li>
            <li className="flex items-start gap-3">
              {/* <MdEmail className="text-xl" /> */}
              <MdEmail className="text-xl"  />
              georgia.young@example.com
            </li>
            <li className="flex items-start gap-3">
              {/* <MdCall className="text-xl" /> */}
              <IoCall className="text-xl"  />
              (406) 555-0120
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        className="py-4 text-center text-sm"
        style={{ backgroundColor: "#002A28" }}
      >
        © 2025 <span className="text-secondary font-semibold">BookCom</span> All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
