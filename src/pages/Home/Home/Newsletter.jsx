import { FaPaperPlane } from "react-icons/fa";
import Swal from "sweetalert2";

const Newsletter = () => {
  const handleSubscribe = (e) => {
    e.preventDefault();
    Swal.fire({
      icon: "success",
      title: "Subscribed!",
      text: "You'll now receive our latest books & offers.",
      timer: 2000,
      showConfirmButton: false,
    });
    e.target.reset();
  };

  return (
    <section className="py-24 relative">
      {/* Glow background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-secondary/30 blur-3xl opacity-50" />

      <div className="relative max-w-4xl mx-auto px-6">
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-12 text-center">

          <h2 className="text-4xl font-extrabold mb-4">
            Join Our Newsletter
          </h2>

          <p className="opacity-80 mb-8">
            Get updates on new arrivals, exclusive deals & reading tips.
          </p>

          <form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto"
          >
            <input
              type="email"
              required
              placeholder="Enter your email"
              className="input input-bordered w-full rounded-full px-6 bg-base-100 focus:outline-none"
            />

            <button
              type="submit"
              className="btn btn-primary rounded-full px-8 flex items-center gap-2 hover:scale-105 transition"
            >
              Subscribe
              <FaPaperPlane />
            </button>
          </form>

          
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
