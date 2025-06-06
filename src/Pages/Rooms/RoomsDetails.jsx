
import { NavLink, useLoaderData } from 'react-router';
import { FiMapPin, FiCalendar, FiCheck, FiStar, FiChevronLeft, FiChevronRight, FiWifi, FiArrowRight, FiArrowLeft, FiDollarSign } from 'react-icons/fi';
import { FaSwimmingPool, FaSpa, FaUtensils, FaSnowflake } from 'react-icons/fa';
import { FiX, FiHome } from 'react-icons/fi';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';




const RoomsDetails = () => {
    const detail = useLoaderData(); // Now gets an object, not an array
    const [isBookingDisabled, setIsBookingDisabled] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
    const [newDate, setFormData] = useState({
        name: '',
        hobbyCategory: '',
        description: '',
        meetingLocation: '',
        maxMembers: '',
        startDate: '',
        imageUrl: '',
        userName: '',
        userEmail: '',
    });
    const nextImage = () => {
        setCurrentImageIndex(prev => (prev + 1) % detail.image_urls.length);
    };

    const prevImage = () => {
        setCurrentImageIndex(prev => (prev - 1 + detail.image_urls.length) % detail.image_urls.length);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    //update data
    const handleUpdate = (e) => {
        e.preventDefault()
        const form = e.target;
        const fromDate = new FormData(form);
        const newDate = Object.fromEntries(fromDate.entries())
        console.log(newDate);


        fetch(`http://localhost:3000/rooms/${detail._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newDate)
        })
            .then(res => res.json())
            .then(data => {
                if (data.matchedCount) {
                    setIsBookingDisabled(true);
                    console.log(data);
                }

            })
    }


    return (
        <>
            <Helmet>
                <title>Details</title>
                <meta name="description" content="Helmet application" />
            </Helmet>
            <div>
                <h1 className='text-2xl text-center mt-20  font-bold'>Room Details</h1>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                    {/* Image Gallery */}
                    <div className="relative h-96 bg-gray-200 rounded-t-2xl overflow-hidden">
                        <img
                            src={detail.image_urls[currentImageIndex]}
                            alt={detail.hotel_name}
                            className="w-full h-full object-cover"
                        />



                        {/* Navigation Arrows */}
                        <button
                            onClick={prevImage}
                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all duration-200"
                        >
                            <FiChevronLeft className="h-6 w-6" />
                        </button>
                        <button
                            onClick={nextImage}
                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all duration-200"
                        >
                            <FiChevronRight className="h-6 w-6" />
                        </button>
                        {/* Image Indicators */}
                        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                            {detail.image_urls.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentImageIndex(index)}
                                    className={`h-2 w-2 rounded-full transition-all duration-200 ${currentImageIndex === index ? 'bg-white w-6' : 'bg-white/50 w-2'}`}
                                />
                            ))}
                        </div>
                        {/* Discount Badge */}
                        <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold px-4 py-2 rounded-full shadow-lg flex items-center">
                            <FiStar className="mr-2" /> {detail.discount_info}
                        </div>
                    </div>

                    {/* Hotel Info Section */}
                    <div className="bg-white p-6 md:p-8 rounded-b-2xl shadow-xl">
                        <div className="flex flex-col md:flex-row justify-between">
                            {/* Hotel Name and Rating */}
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">{detail.hotel_name}</h1>
                                <div className="flex items-center mt-2">
                                    <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center">
                                        <span className="font-bold mr-1">{detail.rating}</span>
                                        <FiStar className="fill-current" />
                                    </div>
                                    <span className="ml-3 text-gray-600">
                                        ({detail.review_count.toLocaleString()} reviews)
                                    </span>
                                </div>
                                <div className="flex items-center mt-2 text-gray-600">
                                    <FiMapPin className="mr-1" />
                                    <span>{detail.location}</span>
                                </div>
                            </div>

                            {/* Price Box date update from */}
                            <form action="" onSubmit={handleUpdate}>
                                <div className="mt-4 md:mt-0 bg-blue-50 border border-blue-100 rounded-xl p-4 w-full md:w-64">

                                    <div className="space-y-3">

                                    </div>
                                    <p className="text-3xl font-bold text-gray-900 mt-1">
                                        {detail.currency} {detail.price_per_night.toLocaleString()}
                                    </p>
                                    <p className="text-gray-500 text-sm">per night</p>
                                    <p className="text-xs text-gray-500 mt-1">via {detail.booking_site}</p>




                                    {/* Open the modal using document.getElementById('ID').showModal() method */}
                                    <button

                                        className={`btn w-full mt-4 text-white font-semibold py-3 px-4 rounded-lg shadow-md transition-all duration-300 ${isBookingDisabled
                                            ? 'bg-gray-400 cursor-not-allowed'
                                            : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'
                                            }`}
                                        onClick={() => document.getElementById('my_modal_1').showModal()}
                                    >
                                        Book Now
                                    </button>

                                    <dialog id="my_modal_1" className="modal">
                                        <div className="modal-box relative">
                                            {/* Close Button (X) */}
                                            <form method="dialog">
                                                <button className="btn btn-sm btn-circle absolute right-2 top-2 hover:bg-red-500 hover:text-white transition">
                                                    <FiX />
                                                </button>
                                            </form>

                                            {/* Modal Content */}
                                            <h3 className="font-bold text-2xl flex items-center gap-2 text-blue-700 mb-4">
                                                <FiHome className="text-indigo-600" /> {detail.hotel_name}
                                            </h3>
                                            <p className="flex items-center gap-2 text-gray-600">
                                                <FiCalendar className="text-indigo-500" /> Date:
                                                <input
                                                    onChange={handleChange}
                                                    name='date'
                                                    type="date"
                                                    className="ml-2 px-3 py-1 border rounded-lg text-sm"
                                                    defaultValue={detail.stay_dates}
                                                    value={newDate.stay_dates}
                                                />
                                            </p>

                                            <div className="space-y-3">
                                                <p className="flex items-center gap-2 text-gray-600">
                                                    <FiCalendar className="text-indigo-500" /> Stay Date:{detail.stay_dates}
                                                </p>

                                                <p className="flex items-center gap-2 text-gray-600">
                                                    <FiMapPin className="text-red-500" /> Location: {detail.location}
                                                </p>

                                                <p className="flex items-center gap-2 text-gray-600">
                                                    <FiDollarSign className="text-green-600" /> Price per Night: <span className="font-semibold">{detail.price_per_night}</span>
                                                </p>
                                            </div>

                                            {/* Modal Action Button */}
                                            <div className="modal-action">
                                                <form method="dialog" className="w-full">
                                                    <button
                                                        disabled={isBookingDisabled}
                                                        type="submit"
                                                        className={`w-full mt-4 text-white font-semibold py-3 px-4 rounded-lg shadow-lg transition-all duration-300 flex items-center justify-center gap-2
                                                 ${isBookingDisabled
                                                                ? 'bg-gray-400 cursor-not-allowed opacity-60'
                                                                : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 cursor-pointer'
                                                            }`}
                                                    >
                                                        <FiCalendar className="text-white" />
                                                        Confirm Booking
                                                    </button>
                                                </form>
                                            </div>
                                        </div>
                                    </dialog>



                                    <div className="flex items-center mt-3 text-green-600 text-sm">
                                        <FiCheck className="mr-1" />
                                        <span>{detail.cancellation_policy}</span>
                                    </div>
                                </div>
                            </form>
                        </div>

                        {/* Facilities Section */}
                        <div className="mt-8">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Facilities</h2>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                                    <FiWifi className="text-blue-600 mr-2" />
                                    <span>Free WiFi</span>
                                </div>
                                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                                    <FaSwimmingPool className="text-blue-600 mr-2" />
                                    <span>Swimming Pool</span>
                                </div>
                                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                                    <FaSpa className="text-blue-600 mr-2" />
                                    <span>Spa</span>
                                </div>
                                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                                    <FaUtensils className="text-blue-600 mr-2" />
                                    <span>Restaurant</span>
                                </div>
                                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                                    <FaSnowflake className="text-blue-600 mr-2" />
                                    <span>Air Conditioning</span>
                                </div>
                            </div>
                        </div>

                        {/* Description Section */}
                        <div className="mt-8">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">About {detail.hotel_name}</h2>
                            <div className="prose max-w-none text-gray-600">
                                <p>
                                    Enjoy a luxurious experience at {detail.hotel_name}, located in the heart of {detail.location}.
                                    This exceptional hotel offers world-class facilities, breathtaking views, and unparalleled service.
                                </p>
                                <p className="mt-4">
                                    Our rooms are aesthetically designed with modern amenities and traditional touches,
                                    providing the perfect blend of contemporary luxury and cultural heritage.
                                </p>
                            </div>
                        </div>

                        {/* Reviews Section */}
                        <div className="mt-8">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Guest Reviews</h2>
                            <div className="bg-gray-50 rounded-xl p-6">
                                <div className="flex items-center mb-4">
                                    <div className="text-4xl font-bold mr-4">{detail.rating}/10</div>
                                    <div>
                                        <div className="flex items-center">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <FiStar
                                                    key={star}
                                                    className={`h-5 w-5 ${star <= Math.floor(detail.rating / 2) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                                                />
                                            ))}
                                        </div>
                                        <p className="text-gray-600 mt-1">Based on {detail.review_count.toLocaleString()} reviews</p>
                                    </div>
                                </div>

                                {/* Sample Reviews */}
                                <div className="grid md:grid-cols-2 gap-4 mt-6">
                                    <div className="bg-white p-4 rounded-lg shadow-sm">
                                        <div className="flex items-center">
                                            <div className="flex items-center">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <FiStar
                                                        key={star}
                                                        className={`h-4 w-4 ${star <= 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                                                    />
                                                ))}
                                            </div>
                                            <span className="ml-2 text-sm font-medium">Excellent</span>
                                        </div>
                                        <p className="mt-2 text-gray-600">"The hotel was truly excellent, the service was wonderful. The pool area was very beautiful!"</p>
                                        <p className="mt-2 text-sm text-gray-500">- Rajesh K., July 2023</p>
                                    </div>

                                    <div className="bg-white p-4 rounded-lg shadow-sm">
                                        <div className="flex items-center">
                                            <div className="flex items-center">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <FiStar
                                                        key={star}
                                                        className={`h-4 w-4 ${star <= 5 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                                                    />
                                                ))}
                                            </div>
                                            <span className="ml-2 text-sm font-medium">Perfect</span>
                                        </div>
                                        <p className="mt-2 text-gray-600">"The best hotel experience of my life! The staff did everything to make it memorable for us."</p>
                                        <p className="mt-2 text-sm text-gray-500">- Priya M., June 2023</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='text-center mb-5'>
                    <NavLink className="text-center " to="/rooms">

                        <button className='btn bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white'>
                            <FiArrowLeft className="ml-2 group-hover:translate-x-1 transition-transform duration-300 " />
                            See Another Rooms</button>
                    </NavLink>
                </div>
            </div>
        </>
    );
};

export default RoomsDetails;