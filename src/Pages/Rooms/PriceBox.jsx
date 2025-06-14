import React, { useContext, useRef, useState } from 'react';
import { useLoaderData } from 'react-router';
import { toast } from 'react-toastify';
import { AuthContext } from '../../Provider/AuthProvider';

const PriceBox = () => {
    const { user } = useContext(AuthContext);
    const detail = useLoaderData();
    const [isAlreadyBooked, setIsAlreadyBooked] = useState(false);
    const [isBookingDisabled, setIsBookingDisabled] = useState(false);
    const [bookingData, setBookingData] = useState({ date: '' });
    const modalRef = useRef(null);

    const handleDateChange = (e) => {
        setBookingData({ ...bookingData, date: e.target.value });
    };
    const handleBookingSubmit = async (e) => {
        e.preventDefault();
        if (!bookingData.date) {
            toast.error('Add the date')
            return;
        }

        if (isAlreadyBooked) {
            toast.error('Oops! This room is already booked 😬');
            return;
        }

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
            const res = await fetch("https://b11a11-server-side-tawhide16.vercel.app/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(finalBookingData),
            });

            const result = await res.json();
            console.log("Booking saved:", result);

            setIsBookingDisabled(true);
            setIsAlreadyBooked(true);
            if (modalRef.current) modalRef.current.close();
            toast.success('Booking confirmed successfully!')

        } catch (err) {
            console.error("Booking failed:", err);
            toast.error('Booking failed. Please try again.')

        }
    };
    return (
        <div>
            {/* PRICE BOX */}
            <div className="mt-4 md:mt-0 bg-blue-50 border border-blue-100 rounded-xl p-4 w-full md:w-64">
                <p className="text-3xl font-bold text-gray-900">
                    {detail.currency} {detail.price_per_night.toLocaleString()}
                </p>
                <p className="text-gray-500 text-sm">per night</p>
                <p className="text-xs text-gray-500 mt-1">via {detail.booking_site}</p>

                <button
                    className={`btn w-full mt-4 text-white font-semibold py-3 px-4 rounded-lg shadow-md transition-all duration-300 ${isBookingDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'}`}
                    onClick={() => {
                        if (!isAlreadyBooked) modalRef.current.showModal();
                    }}
                    disabled={isBookingDisabled || isBookingDisabled}
                >
                    {isAlreadyBooked ? 'Already Booked' : isBookingDisabled ? 'Booked!' : 'Book Now'}
                </button>

                {/* MODAL */}
                <dialog ref={modalRef} id="my_modal_1" className="modal">
                    <div className="modal-box relative">
                        <form method="dialog">
                            <button className="btn btn-sm btn-circle absolute right-2 top-2 hover:bg-red-500 hover:text-white"><FiX /></button>
                        </form>
                        <h3 className="font-bold text-2xl flex items-center gap-2 text-blue-700 mb-4"><FiHome className="text-indigo-600" /> {detail.hotel_name}</h3>
                        <p className="flex items-center gap-2 text-gray-600 mb-2">
                            <FiCalendar className="text-indigo-500" /> Date:
                            <input
                                name="date"
                                type="date"
                                required
                                value={bookingData.date}
                                onChange={handleDateChange}
                                className="ml-2 px-3 py-1 border rounded-lg text-sm"
                            />
                        </p>
                        <p className="text-gray-600"><FiMapPin /> Location: {detail.location}</p>
                        <p className="text-gray-600 mt-2"><FiDollarSign /> Price: {detail.price_per_night}</p>
                        <form onSubmit={handleBookingSubmit}>
                            <button
                                type="submit"
                                className={`w-full mt-4 py-3 px-4 rounded-lg text-white font-semibold shadow-lg flex justify-center gap-2 items-center ${isBookingDisabled ? 'bg-gray-400 cursor-not-allowed opacity-60' : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'}`}
                                disabled={isBookingDisabled}
                            >
                                <FiCalendar /> Confirm Booking
                            </button>
                        </form>
                    </div>
                </dialog>

                <div className="flex items-center mt-3 text-green-600 text-sm">
                    <FiCheck className="mr-1" />
                    <span>{detail.cancellation_policy}</span>
                </div>
            </div>
        </div>
    );
};

export default PriceBox;