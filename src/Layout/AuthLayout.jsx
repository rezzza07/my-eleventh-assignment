import { useEffect, useRef } from "react";
import { Outlet } from "react-router";
import { DotLottie } from "@lottiefiles/dotlottie-web";
import Logo from "../components/Logo/Logo";

const AuthLayout = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const size = 420;
    const dpr = window.devicePixelRatio || 1;

    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;

    const animation = new DotLottie({
      autoplay: true,
      loop: true,
      canvas,
      src: "/auth-animation.json",
    });

    return () => animation.destroy();
  }, []);

  return (
    <div className="min-h-screen bg-base-200">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Logo */}
        <div className="mb-6">
          <Logo />
        </div>

        <div className="flex items-center justify-center lg:justify-between gap-10">
          {/* Form */}
          <div className="w-full max-w-lg mx-auto lg:mx-0">
            <Outlet />
          </div>

          {/* Animation */}
          <div className="hidden lg:flex flex-1 justify-center items-center">
            <div className="">
              <canvas
                ref={canvasRef}
                className="mx-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
