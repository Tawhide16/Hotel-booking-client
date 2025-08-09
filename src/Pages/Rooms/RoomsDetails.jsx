import { NavLink, useLoaderData, useParams, useNavigate } from 'react-router-dom';
import {
  FiMapPin, FiCalendar, FiCheck, FiStar, FiChevronLeft,
  FiChevronRight, FiWifi, FiArrowLeft, FiDollarSign, FiX, FiHome
} from 'react-icons/fi';
import { FaSwimmingPool, FaSpa, FaUtensils, FaSnowflake } from 'react-icons/fa';
import React, { useContext, useEffect, useState, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { AuthContext } from '../../Provider/AuthProvider';
import axios from 'axios';
import { toast } from 'react-toastify';

const RoomsDetails = () => {
  const [bookings, setBookings] = useState([]);
  const [isAlreadyBooked, setIsAlreadyBooked] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isBookingDisabled, setIsBookingDisabled] = useState(false);
  const [bookingData, setBookingData] = useState({ date: '' });
  const [reviews, setReviews] = useState([]);

  const { user } = useContext(AuthContext);
  const detail = useLoaderData();
  const { id } = useParams();
  const modalRef = useRef(null);
  const navigate = useNavigate();

  const nextImage = () => {
    setCurrentImageIndex(prev => (prev + 1) % detail.image_urls.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(prev => (prev - 1 + detail.image_urls.length) % detail.image_urls.length);
  };

  const handleDateChange = (e) => {
    setBookingData({ ...bookingData, date: e.target.value });
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!bookingData.date) return toast.error('Please select a date');
    if (isAlreadyBooked) return toast.error('Oops! This room is already booked 😬');

    const finalBookingData = {
      hotelName: detail.hotel_name,
      location: detail.location,
      price: detail.price_per_night,
      stayDate: bookingData.date,
      userEmail: user?.email,
      userName: user?.displayName || "Guest User",
      roomId: detail._id,
      image: detail.image_urls[0],
      booked: true
    };

    try {
      const token = await user.getIdToken();
      const res = await fetch("https://b11a11-server-side-tawhide16.vercel.app/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(finalBookingData),
      });

      if (res.ok) {
        setIsBookingDisabled(true);
        setIsAlreadyBooked(true);
        modalRef.current?.close();
        toast.success('Booking confirmed successfully!');
        const bookingsRes = await axios.get("https://b11a11-server-side-tawhide16.vercel.app/bookings", {
          params: { email: user.email },
          headers: { Authorization: `Bearer ${token}` }
        });
        setBookings(bookingsRes.data);
      } else throw new Error('Booking failed');
    } catch (err) {
      console.error("Booking failed:", err);
      toast.error('Booking failed. Please try again.');
    }
  };

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = await user?.getIdToken();
        if (!token || !user) return;
        const res = await axios.get("https://b11a11-server-side-tawhide16.vercel.app/bookings", {
          params: { email: user.email },
          headers: { Authorization: `Bearer ${token}` }
        });
        setBookings(res.data);
      } catch (err) {
        console.error("Error fetching bookings:", err);
      }
    };
    fetchBookings();
  }, [user]);

  useEffect(() => {
    const checkBookingStatus = async () => {
      try {
        const roomStatusRes = await axios.get(`https://b11a11-server-side-tawhide16.vercel.app/bookings/room/${id}`);
        setIsAlreadyBooked(roomStatusRes.data.isBooked);
      } catch (err) {
        console.error("Error checking booking status:", err);
      }
    };
    checkBookingStatus();
  }, [id, user]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(`https://b11a11-server-side-tawhide16.vercel.app/review/${id}`);
        setReviews(res.data);
      } catch (err) {
        console.error("Error fetching reviews:", err);
      }
    };
    fetchReviews();
  }, [id]);

  const Facility = ({ icon, label }) => (
    <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
      {React.cloneElement(icon, { className: "text-blue-600 dark:text-blue-400 mr-2" })}
      <span className="dark:text-white">{label}</span>
    </div>
  );

  return (
    <>
      <Helmet>
        <title>Details</title>
      </Helmet>

      <div>
        <h1 className='text-2xl text-center mt-20 font-bold dark:text-white'>Room Details</h1>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

          {/* Image Section */}
          <div className="relative h-96 bg-gray-200 dark:bg-gray-700 rounded-t-2xl overflow-hidden">
            <img src={detail.image_urls[currentImageIndex]} alt={detail.hotel_name} className="w-full h-full object-cover" />
            <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 dark:bg-gray-800 dark:text-white p-2 rounded-full shadow-lg">
              <FiChevronLeft />
            </button>
            <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 dark:bg-gray-800 dark:text-white p-2 rounded-full shadow-lg">
              <FiChevronRight />
            </button>
            <div className="absolute top-4 right-4 bg-amber-500 text-white font-bold px-4 py-2 rounded-full shadow-lg flex items-center">
              <FiStar className="mr-2" /> {detail.discount_info}
            </div>
          </div>

          {/* Main Content */}
          <div className="bg-white dark:bg-gray-900 p-6 md:p-8 rounded-b-2xl shadow-xl">
            <div className="flex flex-col md:flex-row justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{detail.hotel_name}</h1>
                <div className="flex items-center mt-2 text-gray-600 dark:text-gray-300">
                  <div className="bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full flex items-center mr-3">
                    <span className="font-bold mr-1">{detail.rating}</span>
                    <FiStar />
                  </div>
                  <span>({reviews.length.toLocaleString()} reviews)</span>
                </div>
                <div className="flex items-center mt-2 text-gray-600 dark:text-gray-300">
                  <FiMapPin className="mr-1" />
                  <span>{detail.location}</span>
                </div>
              </div>

              {/* Price & Booking */}
              <div className="mt-4 md:mt-0 bg-blue-50 dark:bg-blue-900 border border-blue-100 dark:border-blue-800 rounded-xl p-4 w-full md:w-64">
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{detail.currency} {detail.price_per_night.toLocaleString()}</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm">per night</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">via {detail.booking_site}</p>

                <button
                  className={`btn w-full mt-4 text-white font-semibold py-3 px-4 rounded-lg shadow-md transition-all duration-300 ${
                    isAlreadyBooked
                      ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'
                  }`}
                  onClick={() => {
                    if (!user) {
                      toast.info('Please login first to book a room!');
                      navigate('/login');
                      return;
                    }
                    if (!isAlreadyBooked) modalRef.current.showModal();
                  }}
                  disabled={isAlreadyBooked}
                >
                  {isAlreadyBooked ? 'Already Booked' : 'Book Now'}
                </button>

                {/* Modal */}
                <dialog ref={modalRef} id="my_modal_1" className="modal">
                  <div className="modal-box relative dark:bg-gray-800 dark:text-white">
                    <form method="dialog">
                      <button className="btn btn-sm btn-circle absolute right-2 top-2 hover:bg-red-500 hover:text-white">
                        <FiX />
                      </button>
                    </form>
                    <h3 className="font-bold text-2xl flex items-center gap-2 text-blue-700 dark:text-blue-400 mb-4">
                      <FiHome className="text-indigo-600" /> {detail.hotel_name}
                    </h3>
                    <p className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-2">
                      <FiCalendar className="text-indigo-500" /> Date:
                      <input
                        name="date"
                        type="date"
                        required
                        value={bookingData.date}
                        onChange={handleDateChange}
                        className="ml-2 px-3 py-1 border dark:bg-gray-700 dark:border-gray-600 rounded-lg text-sm"
                      />
                    </p>
                    <p className="text-gray-600 dark:text-gray-300"><FiMapPin /> Location: {detail.location}</p>
                    <p className="text-gray-600 dark:text-gray-300 mt-2"><FiDollarSign /> Price: {detail.price_per_night}</p>

                    <form onSubmit={handleBookingSubmit}>
                      <button
                        type="submit"
                        className={`w-full mt-4 py-3 px-4 rounded-lg text-white font-semibold shadow-lg flex justify-center gap-2 items-center ${
                          isBookingDisabled ? 'bg-gray-400 cursor-not-allowed opacity-60' : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'
                        }`}
                        disabled={isBookingDisabled}
                      >
                        <FiCalendar /> Confirm Booking
                      </button>
                    </form>
                  </div>
                </dialog>

                <div className="flex items-center mt-3 text-green-600 dark:text-green-400 text-sm">
                  <FiCheck className="mr-1" />
                  <span>{detail.cancellation_policy}</span>
                </div>
              </div>
            </div>

            {/* Facilities */}
            <div className="mt-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Facilities</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                <Facility icon={<FiWifi />} label="Free WiFi" />
                <Facility icon={<FaSwimmingPool />} label="Swimming Pool" />
                <Facility icon={<FaSpa />} label="Spa" />
                <Facility icon={<FaUtensils />} label="Restaurant" />
                <Facility icon={<FaSnowflake />} label="Air Conditioning" />
              </div>
            </div>

            {/* About */}
            <div className="mt-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">About {detail.hotel_name}</h2>
              <p className="text-gray-600 dark:text-gray-300">Enjoy a luxurious stay at {detail.hotel_name}, right in the heart of {detail.location}.</p>
            </div>

            {/* Reviews */}
            <div className="mt-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Guest Reviews</h2>
              {reviews.length === 0 ? (
                <p className="text-gray-400 dark:text-gray-500 italic text-base font-light py-2 px-3 bg-gray-50 dark:bg-gray-800 rounded-lg inline-flex items-center">
                  No reviews found yet
                </p>
              ) : (
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  {reviews.map((review) => (
                    <div key={review._id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map(star => (
                          <FiStar key={star} className={`h-4 w-4 ${star <= review.rating ? 'text-yellow-400' : 'text-gray-300'}`} />
                        ))}
                        <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-200">
                          {review.rating >= 4.5 ? "Perfect" : review.rating >= 3 ? "Great" : "Okay"}
                        </span>
                      </div>
                      <p className="mt-2 text-gray-600 dark:text-gray-300">"{review.comment}"</p>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">- {review.user || "Anonymous"}, {new Date(review.timestamp).toLocaleDateString()}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="text-center mb-5">
          <NavLink to="/rooms">
            <button className="btn bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
              <FiArrowLeft /> See Another Rooms
            </button>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default RoomsDetails;
