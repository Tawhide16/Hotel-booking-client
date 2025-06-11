import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  FiMapPin,
  FiCalendar,
  FiCheck,
  FiStar,
  FiChevronLeft,
  FiChevronRight
} from 'react-icons/fi';
import { Link, useParams } from 'react-router-dom';

const SixCard = () => {
  const [rooms, setRooms] = useState([]);
  const [reviews, setReviews] = useState([]);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndices, setCurrentImageIndices] = useState({});


  useEffect(() => {
    axios.get(`http://localhost:3000/review/${id}`)
      .then(res => setReviews(res.data))
      .catch(err => console.error(err));
  }, [id]);

  useEffect(() => {
    async function fetchRooms() {
      try {
        const res = await fetch('http://localhost:3000/new-rooms'); // your server endpoint
        if (!res.ok) throw new Error('Failed to fetch rooms');
        const data = await res.json();
        setRooms(data); // server already limited to 6 rooms!
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Unknown error');
        setLoading(false);
      }
    }
    fetchRooms();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading rooms...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  }

  if (rooms.length === 0) {
    return <div className="text-center py-8">No rooms found</div>;
  }

  const handleNextImage = (roomId, total, e) => {
    e.stopPropagation();
    setCurrentImageIndices(prev => ({
      ...prev,
      [roomId]: ((prev[roomId] || 0) + 1) % total
    }));
  };

  const handlePrevImage = (roomId, total, e) => {
    e.stopPropagation();
    setCurrentImageIndices(prev => ({
      ...prev,
      [roomId]: ((prev[roomId] || 0) - 1 + total) % total
    }));
  };

  const handleIndicatorClick = (roomId, index, e) => {
    e.stopPropagation();
    setCurrentImageIndices(prev => ({ ...prev, [roomId]: index }));
  };

  return (
    <div className="mx-auto justify-items-center my-10">
      <h1 className='text-center text-4xl font-bold my-8'>Featured Rooms</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-4">
        {rooms.map(room => {
          const images = Array.isArray(room.image_urls) && room.image_urls.length > 0
            ? room.image_urls
            : [
              room.image_url,
              'https://i.ibb.co/35X8S8H7/francesca-saraco-d-S27-XGg-Ry-Q-unsplash.jpg',
              'https://source.unsplash.com/random/800x600/?luxury,hotel,room'
            ].filter(Boolean);

          const currentIndex = currentImageIndices[room._id] || 0;
          const totalImages = images.length;

          return (
            <div

              className=" rounded-2xl overflow-hidden border border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300 bg-white transform hover:-translate-y-1"
            >
              {/* Image Carousel */}
              <div className="relative h-75 bg-gray-200 overflow-hidden">
                <img
                  src={images[currentIndex]}
                  alt={room.hotel_name}
                  className="w-full h-full object-cover transition-opacity duration-300"
                  onError={e => {
                    e.target.src = 'https://i.ibb.co/60GZcjQ7/manuel-moreno-DGa0-LQ0y-DPc-unsplash.jpg';
                  }}
                />

                {/* Carousel Controls */}
                <button
                  onClick={(e) => handlePrevImage(room._id, totalImages, e)}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-md transition-all duration-200"
                >
                  <FiChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={(e) => handleNextImage(room._id, totalImages, e)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-md transition-all duration-200"
                >
                  <FiChevronRight className="h-4 w-4" />
                </button>

                {/* Image Indicators */}
                <div className="absolute bottom-3 left-0 right-0 flex justify-center space-x-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={(e) => handleIndicatorClick(room._id, index, e)}
                      className={`h-2 rounded-full transition-all duration-200 ${currentIndex === index ? 'bg-white w-4' : 'bg-white/50 w-2'
                        }`}
                    />
                  ))}
                </div>

                {/* Discount Tag */}
                {room.discount_info && (
                  <div className="absolute top-3 right-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center">
                    <FiStar className="mr-1" /> {room.discount_info}
                  </div>
                )}
              </div>

              <div className="p-5">
                {/* Hotel Name & Rating */}
                <div className="flex justify-between items-start mb-2">
                  <h1 className="text-xl font-bold text-gray-800 truncate pr-2">
                    {room.hotel_name}
                  </h1>
                  <div className="flex items-center bg-blue-600/10 px-2 py-1 rounded-full">
                    <span className="text-blue-600 font-bold text-sm">{room.rating}</span>
                    <FiStar className="h-3 w-3 text-blue-600 ml-1 fill-current" />
                  </div>
                </div>

                {/* Rating and Location */}
                <div className="flex items-center text-gray-500 text-sm mb-3">
                  <FiMapPin className="mr-1 text-gray-400" />
                  <span>{room.location}</span>
                </div>

                {/* Facilities Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {['Free WiFi', 'Pool', 'Spa', 'Restaurant', 'AC'].map(facility => (
                    <span
                      key={facility}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full transition-colors duration-300"
                    >
                      {facility}
                    </span>
                  ))}
                </div>

                {/* Review Count */}
                <div className="flex items-center text-sm text-gray-600 mb-4">
                  <div className="flex items-center mr-3">
                    {[...Array(5)].map((_, i) => (
                      <FiStar
                        key={i}
                        className={`h-4 w-4 ${i < Math.floor(room.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                      />
                    ))}
                  </div>
                  <span>({reviews.length.toLocaleString()} reviews)</span>
                </div>

                {/* Price Section */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 mb-3 border border-blue-100">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-gray-500 text-xs mb-1">Price per night</p>
                      <div className="flex items-end">
                        <span className="text-2xl font-bold text-gray-800">
                          {room.currency} {room.price_per_night.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-500 text-xs">via</p>
                      <p className="font-medium text-blue-600">{room.booking_site}</p>
                    </div>
                  </div>
                </div>

                {/* Cancellation & Dates */}
                <div className="flex justify-between items-center text-sm mb-5">
                  <span className="text-green-600 font-medium flex items-center">
                    <FiCheck className="mr-1" /> {room.cancellation_policy}
                  </span>
                  <span className="text-gray-500 flex items-center">
                    <FiCalendar className="mr-1" /> {room.stay_dates}
                  </span>
                </div>
                <Link
                  to={`/rooms/${room._id}`}
                  key={room._id}>
                  <button className='btn w-full p-4 text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'>book now</button>
                </Link>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SixCard;
