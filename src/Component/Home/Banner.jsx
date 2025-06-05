import React, { useState, useEffect, useRef } from 'react';
import { Link, useLoaderData } from 'react-router';

const Banner = () => {
    const rawData = useLoaderData();
    const data = Array.isArray(rawData) ? rawData : [];
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const totalSlides = data.length;
    const progressRef = useRef(null);
    const intervalRef = useRef(null);

    // Smooth transition effect
    useEffect(() => {
        if (totalSlides === 0) return;
        
        const startProgress = () => {
            if (progressRef.current) {
                progressRef.current.style.transition = 'none';
                progressRef.current.style.width = '0%';
                setTimeout(() => {
                    if (progressRef.current) {
                        progressRef.current.style.transition = 'width 5s linear';
                        progressRef.current.style.width = '100%';
                    }
                }, 10);
            }
        };

        const handleSlideChange = () => {
            setCurrentSlide(prev => (prev === totalSlides - 1 ? 0 : prev + 1));
            startProgress();
        };

        if (!isHovered) {
            startProgress();
            intervalRef.current = setInterval(handleSlideChange, 5000);
        }

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [totalSlides, currentSlide, isHovered]);

    const goToSlide = (index) => {
        setCurrentSlide(index);
        resetProgress();
    };

    const goToPrevSlide = () => {
        setCurrentSlide(prev => (prev === 0 ? totalSlides - 1 : prev - 1));
        resetProgress();
    };

    const goToNextSlide = () => {
        setCurrentSlide(prev => (prev === totalSlides - 1 ? 0 : prev + 1));
        resetProgress();
    };

    const resetProgress = () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        if (progressRef.current) {
            progressRef.current.style.transition = 'none';
            progressRef.current.style.width = '0%';
        }
    };

    if (data.length === 0) {
        return <div className="text-white text-center py-10">No event data found 😢</div>;
    }

 return (
        <div className='pt-18'>
  <div 
    className="relative w-full mx-auto px-4  pt-5 lg:pt-10 lg:px-10"
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
  >
    {/* Main Carousel - Optimized for 22-inch screens */}
    <div className="carousel w-full rounded-xl relative overflow-hidden shadow-2xl" style={{ height: '600px' }}>
      {data.map((event, index) => (
        <div 
          key={event.id}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${currentSlide === index ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          aria-hidden={currentSlide !== index}
        >
          {/* Optimized image for larger screens */}
          <img 
            src={event.thumbnail} 
            className="w-full h-full object-cover"
            alt={event.title || "Event Image"} 
            loading={index === 0 ? "eager" : "lazy"}
          />
          <div className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent`} />
          <div className={`absolute bottom-16 left-16 text-white p-8 max-w-3xl transition-all duration-700 ease-out ${currentSlide === index ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
            <h2 className="text-4xl font-bold mb-4">{event.title || "Event's"}</h2>
            <p className="text-xl mb-6">{event.description || "UpComing Event"}</p>
           <Link to="/rooms">
           <button className="bg-gradient-to-br from-[#0B2545] to-[#D4AF37] btn btn-primary px-8 py-3 text-lg rounded-full hover:scale-105 transition-transform border-none bg-[#0B2545] hover:bg-[#D4AF37]">
              Room's
            </button>
           </Link> 
          </div>
        </div>
      ))}

      {/* Navigation Arrows - Larger for big screens */}
      <button 
        onClick={goToPrevSlide}
        className="absolute left-8 top-1/2 -translate-y-1/2 btn btn-circle btn-ghost text-white bg-black/50 hover:bg-black/70 backdrop-blur-sm transition-all z-20 w-16 h-16 hover:scale-110"
        aria-label="Previous slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button 
        onClick={goToNextSlide}
        className="absolute right-8 top-1/2 -translate-y-1/2 btn btn-circle btn-ghost text-white bg-black/50 hover:bg-black/70 backdrop-blur-sm transition-all z-20 w-16 h-16 hover:scale-110"
        aria-label="Next slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>

    {/* Indicators - Slightly larger */}
    <div className="flex justify-center w-full py-6 gap-3">
      {data.map((_, index) => (
        <button
          key={index}
          onClick={() => goToSlide(index)}
          className={`w-4 h-4 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-[#D4AF37] w-8' : 'bg-gray-400 hover:bg-[#0B2545]'}`}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  </div>
</div>
    );
};

export default Banner;