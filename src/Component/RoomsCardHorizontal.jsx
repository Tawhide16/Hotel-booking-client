import axios from "axios";
import { Map, Marker } from "pigeon-maps";
import React, { useEffect, useState } from "react";
import { FaMapMarked } from "react-icons/fa";
import {
  FiMapPin,
  FiCalendar,
  FiCheck,
  FiStar,
  FiChevronLeft,
  FiChevronRight,
  FiFilter,
  FiX,
  FiMenu
} from "react-icons/fi";
import { LuMapPinned } from "react-icons/lu";
import { Link, useParams } from "react-router-dom";

const RoomsCardHorizontal = () => {
  const [rooms, setRooms] = useState([]);
  const [reviews, setReviews] = useState([]);
  const { id } = useParams();
  const [priceRange, setPriceRange] = useState({ min: 0, max: Infinity });
  const [loading, setLoading] = useState(true);
  const [currentImageIndices, setCurrentImageIndices] = useState({});
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  /* -----------------  review data ----------------- */
  useEffect(() => {
    axios.get(`https://b11a11-server-side-tawhide16.vercel.app/

review/${id}`)
      .then(res => setReviews(res.data))
      .catch(err => console.error(err));
  }, [id]);

  /* ----------------- fetch rooms ----------------- */
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        if (!(priceRange.min === 0 && priceRange.max === Infinity)) {
          params.append("minPrice", priceRange.min);
          params.append("maxPrice", priceRange.max);
        }

        const res = await fetch(
          `https://b11a11-server-side-tawhide16.vercel.app/

rooms?${params.toString()}`
        );
        const data = await res.json();
        setRooms(data);
      } catch (err) {
        console.error("Room fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, [priceRange]);

  /* ---------- carousel handlers ---------- */
  const handleNextImage = (roomId, total, e) => {
    e.stopPropagation();
    setCurrentImageIndices((prev) => ({
      ...prev,
      [roomId]: ((prev[roomId] || 0) + 1) % total,
    }));
  };

  const handlePrevImage = (roomId, total, e) => {
    e.stopPropagation();
    setCurrentImageIndices((prev) => ({
      ...prev,
      [roomId]: ((prev[roomId] || 0) - 1 + total) % total,
    }));
  };

  const handleIndicatorClick = (roomId, index, e) => {
    e.stopPropagation();
    setCurrentImageIndices((prev) => ({ ...prev, [roomId]: index }));
  };

  const priceRanges = [
    { label: "All Prices", value: "all", min: 0, max: Infinity },
    { label: "1000 – 5000", value: "1k-5k", min: 1000, max: 5000 },
    { label: "5001 – 10000", value: "5k-10k", min: 5001, max: 10000 },
    { label: "10001 – 20000", value: "10k-20k", min: 10001, max: 20000 },
    { label: "20001 – 30000", value: "20k-30k", min: 20001, max: 30000 },
    { label: "30001+", value: "30k+", min: 30001, max: Infinity },
  ];

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50 mx-4 lg:mx-10">
      {/* Mobile Nav Toggle Button */}
      <button
        onClick={() => setMobileNavOpen(!mobileNavOpen)}
        className="lg:hidden fixed bottom-4 right-4 z-50 bg-blue-600 text-white p-3 rounded-full shadow-lg"
      >
        {mobileNavOpen ? <FiX size={24} /> : <FiFilter size={24} />}
      </button>

      {/* Side Navigation - Now visible on md (768px) and larger screens */}
      <div
        className={`${mobileNavOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0 transform transition-transform duration-300 ease-in-out
          fixed lg:sticky top-0 left-0 w-95 h-screen bg-white shadow-lg lg:shadow-sm z-40
          overflow-y-auto border-r border-gray-200 rounded-2xl mt-3.5`}
      >
        {/* Map Section */}
        <div className='p-4 rounded-2xl'>
          <div className="flex items-center mb-2">
            <LuMapPinned size={20} />
            <h1 className="font-bold ml-2 text-xl">Map</h1>
          </div>
          
          <div className="rounded-xl overflow-hidden border border-gray-200">
            <Map 
              height={300} 
              defaultCenter={[23.7808875, 90.4169257]} 
              defaultZoom={15}
              touchEvents={false} // Disable touch events to prevent map interaction issues
            >
              <Marker width={50} anchor={[23.7808875, 90.4169257]} />
            </Map>
          </div>
        </div>

        <div className="p-4 border-b border-gray-200 sticky top-0 bg-white z-10">
          <h2 className="text-xl font-bold text-gray-800 flex items-center">
            <FiFilter className="mr-2" /> Filters
          </h2>
        </div>

        <div className="p-4">
          <h3 className="text-lg font-semibold mb-3">Price Range</h3>
          <div className="space-y-2">
            {priceRanges.map((range) => (
              <div key={range.value} className="flex items-center">
                <input
                  type="radio"
                  id={`price-${range.value}`}
                  name="price-range"
                  value={range.value}
                  checked={
                    priceRange.min === range.min && priceRange.max === range.max
                  }
                  onChange={() =>
                    setPriceRange({ min: range.min, max: range.max })
                  }
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                />
                <label
                  htmlFor={`price-${range.value}`}
                  className="ml-2 text-gray-700"
                >
                  {range.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Additional filters can be added here */}
        <div className="p-4 border-t border-gray-200">
          <h3 className="text-lg font-semibold mb-3">Amenities</h3>
          <div className="space-y-2">
            {["Free WiFi", "Pool", "Spa", "Restaurant", "AC"].map((amenity) => (
              <div key={amenity} className="flex items-center">
                <input
                  type="checkbox"
                  id={`amenity-${amenity}`}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                />
                <label
                  htmlFor={`amenity-${amenity}`}
                  className="ml-2 text-gray-700"
                >
                  {amenity}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-2 p-4"> {/* Adjusted margin for the sidebar width */}
        {/* Mobile filter header */}
        <div className="lg:hidden mb-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">Available Rooms</h1>
          <button
            onClick={() => setMobileNavOpen(true)}
            className="flex items-center text-blue-600"
          >
            <FiFilter className="mr-1" /> Filters
          </button>
        </div>

        {/* Rooms List */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-500">Loading rooms...</p>
          </div>
        ) : rooms.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-500">No rooms found matching your criteria.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {rooms.map((room) => {
              const images =
                Array.isArray(room.image_urls) && room.image_urls.length > 0
                  ? room.image_urls
                  : [
                      room.image_url,
                      "https://i.ibb.co/35X8S8H7/francesca-saraco-d-S27-XGg-Ry-Q-unsplash.jpg",
                      "https://source.unsplash.com/random/800x600/?luxury,hotel,room",
                    ].filter(Boolean);

              const currentIndex = currentImageIndices[room._id] || 0;
              const totalImages = images.length;

              return (
                <Link
                  to={`/rooms/${room._id}`}
                  key={room._id}
                  className="block w-full ml-0 mx-auto bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col md:flex-row"
                >
                  {/* Image Section - Left Side */}
                  <div className="md:w-2/5 h-64 md:h-auto relative">
                    <img
                      src={images[currentIndex]}
                      alt={room.hotel_name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src =
                          "https://i.ibb.co/60GZcjQ7/manuel-moreno-DGa0-LQ0y-DPc-unsplash.jpg";
                      }}
                    />

                    {/* Carousel Controls */}
                    {totalImages > 1 && (
                      <>
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

                        <div className="absolute bottom-3 left-0 right-0 flex justify-center space-x-2">
                          {images.map((_, index) => (
                            <button
                              key={index}
                              onClick={(e) =>
                                handleIndicatorClick(room._id, index, e)
                              }
                              className={`h-2 rounded-full transition-all duration-200 ${
                                currentIndex === index
                                  ? "bg-white w-4"
                                  : "bg-white/50 w-2"
                              }`}
                            />
                          ))}
                        </div>
                      </>
                    )}

                    {/* Discount Badge */}
                    <div className="absolute top-4 right-4 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                      {room.discount_info || "Special Offer"}
                    </div>
                  </div>

                  {/* Content Section - Right Side */}
                  <div className="p-6 md:w-3/5">
                    {/* Hotel Header */}
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="text-xl font-bold text-gray-800">
                          {room.hotel_name}
                        </h2>
                        <p className="text-gray-500 text-sm mt-1">
                          {room.location}
                        </p>
                      </div>
                      <div className="flex items-center bg-blue-100 px-3 py-1 rounded-full">
                        <span className="text-blue-800 font-bold">
                          {room.rating}
                        </span>
                        <FiStar className="ml-1 text-blue-800" size={14} />
                      </div>
                    </div>

                    {/* Rating and Reviews */}
                    <div className="flex items-center mt-3 flex-wrap">
                      <div className="flex text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <FiStar
                            key={i}
                            fill={i < Math.floor(room.rating) ? "currentColor" : "none"}
                            size={16}
                          />
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-gray-600">
                        {reviews.length?.toLocaleString() || 0} reviews
                      </span>
                    </div>

                    {/* Location */}
                    <div className="flex items-start mt-3 text-gray-600">
                      <FiMapPin className="mr-1 mt-0.5 flex-shrink-0" size={14} />
                      <span className="text-sm">
                        {room.location}
                        <Link to="/map" className="text-blue-500 ml-1">
                          Show on Map
                        </Link>
                      </span>
                    </div>

                    <div className="border-t border-gray-200 my-4"></div>

                    {/* Room Type */}
                    <div className="flex items-center">
                      <h3 className="font-semibold text-gray-800">
                        {room.room_type || "Deluxe Room"}
                      </h3>
                    </div>

                    {/* Cancellation Policy */}
                    <p className="text-green-600 text-sm mt-1">
                      <FiCheck className="inline mr-1" />
                      {room.cancellation_policy}
                    </p>
                    <p className="text-gray-500 text-xs mt-1">
                      <FiCalendar className="inline mr-1" />
                      {room.stay_dates}
                    </p>

                    <div className="border-t border-gray-200 my-4"></div>

                    {/* Price Section */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                      <div className="mb-3 sm:mb-0">
                        <p className="text-gray-500 text-sm">Price per night</p>
                        <div className="flex items-center">
                          <span className="text-xl font-bold text-gray-800">
                            {room.currency} {room.price_per_night?.toLocaleString()}
                          </span>
                        </div>
                        <p className="text-gray-500 text-xs">
                          via {room.booking_site}
                        </p>
                      </div>

                      <div className="flex items-center bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300">
                        View Details <FiChevronRight className="ml-1" />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomsCardHorizontal;