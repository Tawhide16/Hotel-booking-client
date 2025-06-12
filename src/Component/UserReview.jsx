import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaStar, FaRegStar, FaUser, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';

const UserReview = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`http://localhost:3000/review`)
            .then(res => {
                // Sort reviews by timestamp (newest first)
                const sortedReviews = res.data.sort((a, b) => 
                    new Date(b.timestamp) - new Date(a.timestamp)
                );
                setReviews(sortedReviews);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const renderStars = (rating) => {
        const numericRating = typeof rating === 'object' 
            ? parseInt(rating.$numberInt || '0', 10) 
            : parseInt(rating || '0', 10);
        
        return (
            <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                    i < numericRating 
                        ? <FaStar key={i} className="text-yellow-400" /> 
                        : <FaRegStar key={i} className="text-yellow-400" />
                ))}
            </div>
        );
    };

    if (loading) return (
        <div className="bg-gradient-to-b from-blue-50 to-gray-50 py-16">
            <div className="text-center py-8 text-blue-600">Loading reviews...</div>
        </div>
    );

    return (
        <div className="bg-gray-50 py-16 mx-2 lg:mx-10 rounded-2xl my-15">
            <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
                    Customer Reviews (Newest First)
                </h2>
                
                {reviews.length > 0 ? (
                    <div className="relative pb-12">
                        <Splide
                            hasTrack={false}
                            options={{
                                type: 'slide',
                                rewind: true,
                                perPage: 3,
                                perMove: 1,
                                gap: '2rem',
                                arrows: false,
                                pagination: false,
                                speed: 600,
                                breakpoints: {
                                    1280: {
                                        perPage: 2,
                                    },
                                    768: {
                                        perPage: 1,
                                    }
                                }
                            }}
                        >
                            <div className="splide__arrows">
                                <button className="splide__arrow splide__arrow--prev absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-3 rounded-full shadow-lg hover:bg-blue-100 transition border border-blue-800">
                                    <FaChevronLeft className="text-blue-600" />
                                </button>
                                <button className="splide__arrow splide__arrow--next absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-3 rounded-full shadow-lg hover:bg-blue-100 transition border border-blue-200">
                                    <FaChevronRight className="text-blue-600" />
                                </button>
                            </div>

                            <SplideTrack>
                                {reviews.map((review, index) => (
                                    <SplideSlide key={index}>
                                        <div className="bg-white rounded-xl shadow-lg p-6 h-full mx-2 border border-blue-100">
                                            <div className="flex items-center mb-4">
                                                <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mr-4">
                                                    {review.user ? (
                                                        review.user.charAt(0).toUpperCase()
                                                    ) : (
                                                        <FaUser className="text-xl" />
                                                    )}
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-lg text-gray-800">
                                                        {review.user || 'Anonymous'}
                                                    </h3>
                                                    {renderStars(review.rating)}
                                                </div>
                                            </div>
                                            <p className="text-gray-600 italic mb-4 text-base">"{review.comment || 'No comment provided'}"</p>
                                            <p className="text-sm text-blue-600 font-medium">
                                                {new Date(review.timestamp).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </p>
                                        </div>
                                    </SplideSlide>
                                ))}
                            </SplideTrack>
                        </Splide>
                    </div>
                ) : (
                    <div className="bg-white rounded-xl shadow-md p-8 max-w-md mx-auto">
                        <p className="text-center text-gray-600 text-lg">No reviews yet. Be the first to review!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserReview;