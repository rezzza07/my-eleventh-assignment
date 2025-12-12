import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

import bannerImg1 from '../../../assets/banner1.png';



const Banner = () => {

    const slides = [
        {
            id: 1,
            title: "The Midnight Library",
            description: "Unlock premium collections selected specially for readers like you.",
            image: bannerImg1
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
            image: "https://resizing.flixster.com/tha235fNG3tIX5HN037DhBvMXUU=/fit-in/352x330/v2/https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p2507_v_h6_aa.jpg"
        }
    ];

    return (
        <div className="relative">
            <Carousel
                autoPlay={true}
                infiniteLoop={true}
                showThumbs={false}
                showStatus={false}
                interval={2000}
                swipeable={true}
                emulateTouch={true}
            >
                {slides.map(slide => (
                    <div key={slide.id} className="relative">
                        <img src={slide.image} className="h-[500px] w-full object-cover" />

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-[#003C37]/50 flex items-center px-12">
                            <div className="max-w-xl text-left text-[#D8C8A5] animate-fadeIn">
                                <h2 className="text-4xl font-bold mb-4">{slide.title}</h2>
                                <p className="opacity-90 mb-6">
                                    {slide.description}
                                </p>
                                <a
                                    href="/books"
                                    className="px-5 py-3 bg-secondary text-primary font-semibold rounded-lg shadow-lg hover:opacity-90"
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

