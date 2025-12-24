import { useEffect, useRef } from "react";
import { DotLottie } from "@lottiefiles/dotlottie-web";

const Loading = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const size = 150; 
    const dpr = window.devicePixelRatio || 1;

   
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;

    const dotLottie = new DotLottie({
      autoplay: true,
      loop: true,
      canvas,
      src: "/loading.json",
    });

    return () => dotLottie.destroy();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen gap-3">
      <span className="text-7xl font-black text-primary">L</span>

      <canvas ref={canvasRef} />

      <span className="text-7xl font-black text-primary tracking-widest">
        A D I N G 
      </span>
    </div>
  );
};

export default Loading;
