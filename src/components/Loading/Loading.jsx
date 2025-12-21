import { MdLocalLibrary } from "react-icons/md";

const Loading = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary/10 via-base-100 to-secondary/10">

      {/* Spinner */}
      <div className="relative">
        <span className="loading loading-ring loading-lg text-primary"></span>

        {/* Center Icon */}
        <MdLocalLibrary className="absolute inset-0 m-auto text-secondary text-3xl animate-pulse" />
      </div>

      {/* Text */}
      <p className="mt-4 text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary tracking-wide">
        Loading...
      </p>
    </div>
  );
};

export default Loading;
