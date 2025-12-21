import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";



const Banner = () => {
  const slides = [
    {
      id: 1,
      title: "The Midnight Library",
      description: "Unlock premium collections selected specially for readers like you.",
      image: "https://st4.depositphotos.com/2001403/20595/i/450/depositphotos_205955334-stock-photo-back-school-background-pencils-apple.jpg"
    },
    {
      id: 2,
      title: "Premium Korean Style Picks",
      description: "Beautiful design mixed with elegant storytelling.",
      image: 'https://i0.wp.com/chireviewofbooks.com/wp-content/uploads/2025/04/GreatBigBeautifulLie_1920x675.jpg?fit=1920%2C675&ssl=1'
    },
    {
      id: 3,
      title: "Find Your Next Favorite Story",
      description: "Every great journey begins with the right book.",
      image: "https://thumbs.dreamstime.com/b/open-book-stack-multicolored-hardback-books-cup-coffee-reading-education-literature-panoramic-good-copy-space-153967305.jpg"
    }
  ];

  return (
    <div className="relative">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        interval={3000}
        swipeable
        emulateTouch
        renderArrowPrev={(onClickHandler, hasPrev, label) =>
          hasPrev && (
            <button
              onClick={onClickHandler}
              title={label}
              className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-secondary text-primary w-12 h-12 rounded-full flex items-center justify-center z-10 shadow-lg hover:bg-secondary/60 transition"
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
              className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-secondary text-primary w-12 h-12 rounded-full flex items-center justify-center z-10 shadow-lg hover:bg-secondary/60 transition"
            >
              &#10095;
            </button>
          )
        }
      >
        {slides.map(slide => (
          <div key={slide.id} className="relative">
            <img
              src={slide.image}
              alt={slide.title}
              className="h-[500px] w-full object-cover brightness-90"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#003C37]/80 to-[#003C37]/30 flex items-center px-8 md:px-16">
              <div className="max-w-lg text-left text-[#D8C8A5] animate-fadeIn">
                <h2 className="text-3xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">
                  {slide.title}
                </h2>
                <p className="opacity-90 mb-6 text-sm md:text-base drop-shadow">
                  {slide.description}
                </p>
                <a
                  href="/books"
                  className="px-6 py-3 bg-secondary text-primary font-semibold rounded-lg shadow-lg hover:opacity-90 transition"
                >
                  Browse All Books
                </a>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;
