// RoomsCard.jsx
import React, { useEffect, useState } from "react";
import {
  FiMapPin,
  FiCalendar,
  FiCheck,
  FiStar,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { Link } from "react-router-dom";

/*
  ⚠️  এই কম্পোনেন্ট এখন আর roomsPromise নেয় না!
      কারণ রুম আমরা নিজেরাই API থেকে ফেচ করছি।
*/

const RoomsCard = () => {
  // সব রুম
  const [rooms, setRooms] = useState([]);
  // প্রাইস রেঞ্জ অবজেক্ট
  const [priceRange, setPriceRange] = useState({ min: 0, max: Infinity });
  // লোডার
  const [loading, setLoading] = useState(true);
  // ইমেজ কারোসেল ইনডেক্স
  const [currentImageIndices, setCurrentImageIndices] = useState({});

  /* ----------------- রুম ফেচ ----------------- */

  console.log(rooms.map(r => r.
    price_per_night));
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true);

        // query param বানাচ্ছি
        const params = new URLSearchParams();
        if (!(priceRange.min === 0 && priceRange.max === Infinity)) {
          params.append("minPrice", priceRange.min);
          params.append("maxPrice", priceRange.max);
        }

        const res = await fetch(
          `http://localhost:3000/rooms?${params.toString()}`
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
  /* ------------------------------------------- */

  /* ---------- কারোসেল হ্যান্ডলার ---------- */
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

  ;

  /* ----------------------------------------- */

  return (
    <>
      {/* ---------- ড্রপডাউন ফিল্টার ---------- */}
      <div className="flex flex-col mr-10 mb-6 items-end">
        <label className="block text-sm font-medium text-gray-700 text-center mb-2">
          Filter by Price Range
        </label>

        <select
          onChange={(e) => {
            const value = e.target.value;
            if (value === "all") setPriceRange({ min: 0, max: Infinity });
            else if (value === "1k-5k") setPriceRange({ min: 1000, max: 5000 });
            else if (value === "5k-10k") setPriceRange({ min: 5001, max: 10000 });
            else if (value === "10k-20k") setPriceRange({ min: 10001, max: 20000 });
            else if (value === "20k-30k") setPriceRange({ min: 20001, max: 30000 });
            else if (value === "30k+") setPriceRange({ min: 30001, max: Infinity });
          }}
          className="px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
        >
          <option value="all">All Prices</option>
          <option value="1k-5k">1000 – 5000</option>
          <option value="5k-10k">5001 – 10000</option>
          <option value="10k-20k">10001 – 20000</option>
          <option value="20k-30k">20001 – 30000</option>
          <option value="30k+">30001+</option>
        </select>


      </div>

      {/* ---------- রুম কার্ড সেকশন ---------- */}
      {loading ? (
        <p className="text-center my-10">Loading rooms...</p>
      ) : rooms.length === 0 ? (
        <p className="text-center my-10 text-gray-500">No rooms found.</p>
      ) : (
        <div className="mx-auto justify-items-center my-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-4">
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
                  className="rounded-2xl overflow-hidden border border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300 bg-white transform hover:-translate-y-1"
                >
                  {/* ---------- ইমেজ কারোসেল ---------- */}
                  <div className="relative h-56 bg-gray-200 overflow-hidden">
                    <img
                      src={images[currentIndex]}
                      alt={room.hotel_name}
                      className="w-full h-full object-cover transition-opacity duration-300"
                      onError={(e) => {
                        e.target.src =
                          "https://i.ibb.co/60GZcjQ7/manuel-moreno-DGa0-LQ0y-DPc-unsplash.jpg";
                      }}
                    />

                    {/* কারোসেল কন্ট্রোল */}
                    <button
                      onClick={(e) =>
                        handlePrevImage(room._id, totalImages, e)
                      }
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-md transition-all duration-200"
                    >
                      <FiChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                      onClick={(e) =>
                        handleNextImage(room._id, totalImages, e)
                      }
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-md transition-all duration-200"
                    >
                      <FiChevronRight className="h-4 w-4" />
                    </button>

                    {/* ইন্ডিকেটর ডট */}
                    <div className="absolute bottom-3 left-0 right-0 flex justify-center space-x-2">
                      {images.map((_, index) => (
                        <button
                          key={index}
                          onClick={(e) =>
                            handleIndicatorClick(room._id, index, e)
                          }
                          className={`h-2 rounded-full transition-all duration-200 ${currentIndex === index
                            ? "bg-white w-4"
                            : "bg-white/50 w-2"
                            }`}
                        />
                      ))}
                    </div>

                    {/* ডিসকাউন্ট ট্যাগ */}
                    <div className="absolute top-3 right-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center">
                      <FiStar className="mr-1" /> {room.discount_info}
                    </div>
                  </div>

                  {/* ---------- টেক্সট কন্টেন্ট ---------- */}
                  <div className="p-5">
                    {/* হোটেল নাম ও রেটিং */}
                    <div className="flex justify-between items-start mb-2">
                      <h1 className="text-xl font-bold text-gray-800 truncate pr-2">
                        {room.hotel_name}
                      </h1>
                      <div className="flex items-center bg-blue-600/10 px-2 py-1 rounded-full">
                        <span className="text-blue-600 font-bold text-sm">
                          {room.rating}
                        </span>
                        <FiStar className="h-3 w-3 text-blue-600 ml-1 fill-current" />
                      </div>
                    </div>

                    {/* লোকেশন */}
                    <div className="flex items-center text-gray-500 text-sm mb-3">
                      <FiMapPin className="mr-1 text-gray-400" />
                      <span>{room.location}</span>
                    </div>

                    {/* ফ্যাসিলিটি ট্যাগ */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {["Free WiFi", "Pool", "Spa", "Restaurant", "AC"].map(
                        (facility) => (
                          <span
                            key={facility}
                            className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full transition-colors duration-300"
                          >
                            {facility}
                          </span>
                        )
                      )}
                    </div>

                    {/* রিভিউ কাউন্ট */}
                    <div className="flex items-center text-sm text-gray-600 mb-4">
                      <div className="flex items-center mr-3">
                        {[...Array(5)].map((_, i) => (
                          <FiStar
                            key={i}
                            className={`h-4 w-4 ${i < Math.floor(room.rating)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                              }`}
                          />
                        ))}
                      </div>
                      <span>
                        ({room.review_count?.toLocaleString() || 0} reviews)
                      </span>
                    </div>

                    {/* দাম সেকশন */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 mb-3 border border-blue-100">
                      <div className="flex justify-between items-end">
                        <div>
                          <p className="text-gray-500 text-xs mb-1">
                            Price per night
                          </p>
                          <span className="text-2xl font-bold text-gray-800">
                            {room.currency}{" "}
                            {room.price_per_night?.toLocaleString()}
                          </span>
                        </div>
                        <div className="text-right">
                          <p className="text-gray-500 text-xs">via</p>
                          <p className="font-medium text-blue-600">
                            {room.booking_site}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* ক্যানসেলেশন এবং স্টে ডেট */}
                    <div className="flex justify-between items-center text-sm mb-5">
                      <span className="text-green-600 font-medium flex items-center">
                        <FiCheck className="mr-1" />{" "}
                        {room.cancellation_policy}
                      </span>
                      <span className="text-gray-500 flex items-center">
                        <FiCalendar className="mr-1" /> {room.stay_dates}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default RoomsCard;
