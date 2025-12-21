import React from 'react';
import { FaBookOpen, FaShippingFast, FaSmile, FaTags } from 'react-icons/fa';

const WhyChooseBookCourier = () => {
  const features = [
    {
      icon: <FaShippingFast />,
      title: "Super Fast Delivery",
      text: "Get your books delivered quickly and reliably right to your doorstep.",
      color: "bg-primary/20 text-primary"
    },
    {
      icon: <FaBookOpen />,
      title: "Massive Book Collection",
      text: "Explore thousands of books across genres, authors, and trending titles.",
      color: "bg-secondary/20 text-secondary"
    },
    {
      icon: <FaTags />,
      title: "Best Prices & Deals",
      text: "Enjoy affordable prices with continuous discounts and exclusive offers.",
      color: "bg-primary/20 text-primary"
    },
    {
      icon: <FaSmile />,
      title: "Comfortable Ordering Experience",
      text: "A smooth, easy, and enjoyable experience from browsing to checkout.",
      color: "bg-secondary/20 text-secondary"
    },
  ];

  return (
    <section className="max-w-6xl mx-auto my-20 px-6 md:px-10">
      {/* Header */}
      <h2 className="text-4xl md:text-5xl font-extrabold text-center text-primary mb-16">
        Why Choose <span className="text-secondary">BookCourier?</span>
      </h2>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center p-6 bg-base-100 rounded-3xl shadow-md hover:shadow-xl transition"
            >
              <div className={`text-5xl w-20 h-20 flex items-center justify-center rounded-full mb-4 ${feature.color}`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-base-content/70 text-sm">{feature.text}</p>
            </div>
          ))}
        </div>

        {/* Image */}
        <div className="flex justify-center">
          <div className="w-80 h-80 md:w-96 md:h-96 rounded-full overflow-hidden shadow-2xl border-8 border-primary transform hover:scale-105 transition duration-300">
            <img
              src="https://images.unsplash.com/photo-1512820790803-83ca734da794?w=1200"
              alt="Books and reading setup"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseBookCourier;
