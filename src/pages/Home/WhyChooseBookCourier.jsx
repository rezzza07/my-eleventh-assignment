import React from 'react';
import { FaBookOpen, FaShippingFast, FaSmile, FaTags } from 'react-icons/fa';
import { Link } from 'react-router';

const WhyChooseBookCourier = () => {
    return (
        
    <section className="max-w-6xl mx-auto my-16 p-10 bg-base-200 border-8 border-primary rounded-3xl shadow-lg">
      <h1 className="text-4xl font-bold text-center text-primary mb-12">
        Why Choose <span className="text-secondary">BookCourier?</span>
      </h1>

      <div className="grid md:grid-cols-2 gap-10 items-center">
        {/* Left Text Features */}
        <div className="flex flex-col gap-6">
          <div className="flex items-start gap-4 p-6 bg-base-100 rounded-2xl shadow-md">
            <div className="text-primary text-4xl"><FaShippingFast /></div>
            <div>
              <h2 className="text-xl font-semibold">Super Fast Delivery</h2>
              <p className="text-base-content/70">
                Get your books delivered quickly and reliably right to your doorstep.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-6 bg-base-100 rounded-2xl shadow-md">
            <div className="text-secondary text-4xl"><FaBookOpen /></div>
            <div>
              <h2 className="text-xl font-semibold">Massive Book Collection</h2>
              <p className="text-base-content/70">
                Explore thousands of books across genres, authors, and trending titles.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-6 bg-base-100 rounded-2xl shadow-md">
            <div className="text-primary text-4xl"><FaTags /></div>
            <div>
              <h2 className="text-xl font-semibold">Best Prices & Deals</h2>
              <p className="text-base-content/70">
                Enjoy affordable prices with continuous discounts and exclusive offers.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-6 bg-base-100 rounded-2xl shadow-md">
            <div className="text-secondary text-4xl"><FaSmile /></div>
            <div>
              <h2 className="text-xl font-semibold">Comfortable Ordering Experience</h2>
              <p className="text-base-content/70">
                A smooth, easy, and enjoyable experience from browsing to checkout.
              </p>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div>
          <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-primary/20">
            <img
              src="https://images.unsplash.com/photo-1512820790803-83ca734da794?w=1200"
              alt="Books and reading setup"
              className="w-full object-cover"
            />
          </div>
        </div>
      </div>

      <div className="text-center mt-12">
        <Link to="/shop" className="btn btn-secondary text-lg px-10 rounded-xl ">
          Browse Books
        </Link>
      </div>
    </section>
  );
    
};

export default WhyChooseBookCourier;