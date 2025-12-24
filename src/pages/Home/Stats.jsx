import Lottie from "lottie-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";

const AnimatedDeliverySection = () => {
  const [animationData, setAnimationData] = useState(null);

  // Fetch JSON from public folder
  useEffect(() => {
    fetch("/delivery-service.json")
      .then((res) => res.json())
      .then((data) => setAnimationData(data));
  }, []);

  return (
    <section className="relative py-24 overflow-hidden bg-gray-50">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-primary/20 blur-3xl" />

      <div className="relative max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center px-6">
        {/* Lottie Animation */}
        <div className="w-full max-w-md mx-auto">
          {animationData && (
            <Lottie
              animationData={animationData}
              loop
              className="drop-shadow-2xl"
            />
          )}
        </div>

        {/* Content Card */}
        <div className="backdrop-blur-xl bg-white/20 border border-white/30 p-10 rounded-3xl shadow-2xl">
          <h2 className="text-4xl font-extrabold mb-4 leading-tight">
            Fast & Reliable <span className="text-primary">Delivery</span>
          </h2>

          <p className="opacity-80 mb-6 text-lg">
            Get your books delivered right to your doorstep — quickly, safely,
            and with care. Enjoy your reading without waiting!
          </p>

          <Link to="/dashboard/my-orders">
            <button className="btn btn-primary btn-lg rounded-full px-10 hover:scale-105 transition-transform">
              Track Your Order
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AnimatedDeliverySection;
