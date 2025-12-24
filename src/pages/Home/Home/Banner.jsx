import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const slides = [
  {
    id: 1,
    heading: "Books Open Minds",
    subheading: "Reading expands your imagination and knowledge.",
    description: "Dive into stories, learn new ideas, and experience worlds beyond your own.",
    bgImage: "https://i.pinimg.com/1200x/96/c3/3e/96c33e9b6cb1ea8a32f062a9b4cb0659.jpg"
  },
  {
    id: 2,
    heading: "Knowledge is Power",
    subheading: "Books give you the tools to grow.",
    description: "Every page you read adds a new perspective and strengthens your mind.",
    bgImage: "https://i.pinimg.com/1200x/63/3b/a1/633ba1c1e1971176ded82a61737c68a7.jpg"
  },
  {
    id: 3,
    heading: "A Journey Through Stories",
    subheading: "Travel without leaving your room.",
    description: "Books take you to new places, times, and experiences with just your imagination.",
    bgImage: "https://i.pinimg.com/1200x/b3/09/c0/b309c0c1ffa7be05931297e991b900d2.jpg"
  }
];

const Banner = () => {
  return (
    <div className="relative">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        interval={4000}
        swipeable
        emulateTouch
        renderArrowPrev={(onClickHandler, hasPrev, label) =>
          hasPrev && (
            <button
              onClick={onClickHandler}
              title={label}
              className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-secondary text-white w-12 h-12 rounded-full flex items-center justify-center z-10 shadow-lg hover:bg-secondary/70 transition"
            >
              &#10094;
            </button>
          )
        }
        renderArrowNext={(onClickHandler, hasNext, label) =>
          hasNext && (
            <button
              onClick={onClickHandler}
              title={label}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-secondary text-white w-12 h-12 rounded-full flex items-center justify-center z-10 shadow-lg hover:bg-secondary/70 transition"
            >
              &#10095;
            </button>
          )
        }
      >
        {slides.map(slide => (
          <div key={slide.id} className="relative h-[500px] flex items-center px-6 md:px-16">

            {/* Background image */}
            <img
              src={slide.bgImage}
              alt={slide.heading}
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Primary color shadow overlay */}
            <div className="absolute inset-0 bg-primary/40"></div>

            {/* Overlay content */}
            <div className="relative max-w-lg text-left text-white animate-fadeIn">
              <h2 className="text-3xl md:text-5xl font-extrabold mb-2 bg-clip-text text-transparent text-white drop-shadow-lg">
                {slide.heading}
              </h2>
              <p className="text-lg md:text-xl opacity-90 mb-4 drop-shadow">
                {slide.subheading}
              </p>
              <p className="opacity-90 mb-6 text-sm md:text-base drop-shadow">
                {slide.description}
              </p>
              <Link
                to="/all-books"
                className="inline-block px-6 py-3 bg-secondary text-primary font-semibold rounded-lg shadow-lg hover:opacity-90 transition"
              >
                Browse Books
              </Link>
            </div>

          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;
