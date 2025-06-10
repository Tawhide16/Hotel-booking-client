import { useEffect, useState } from "react";
import { FaStar, FaTimes, FaUser } from "react-icons/fa";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaMoneyBill,
  FaCheckCircle,
  FaTimesCircle,
  FaSpinner,
  FaExclamationCircle,
} from "react-icons/fa";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const MyBookings = () => {
  const [newDate, setNewDate] = useState(""); // for new date input
  const [editingBookingId, setEditingBookingId] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("")

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user?.email) return;

      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:3000/bookings?email=${user.email}`);
        setBookings(res.data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch bookings:", err);
        setError("Failed to load bookings. Please try again later.");
        toast.error("Failed to load bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user]);

const handleCancel = async (id) => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  });

  if (!result.isConfirmed) return;

  try {
    const res = await axios.delete(`http://localhost:3000/bookings/${id}`);
    if (res.data.deletedCount > 0) {
      await Swal.fire("Deleted!", "Your booking has been cancelled.", "success");
      toast.success("Booking cancelled successfully!");
      setBookings((prev) => prev.filter((b) => b._id !== id));
    }
  } catch (err) {
    console.error("Cancel error:", err);
    toast.error("Failed to cancel booking");
  }
};


  const getStatusStyle = (status) => {
    if (!status) return "text-gray-500";
    switch (status.toLowerCase()) {
      case "confirmed":
        return "text-green-600";
      case "pending":
        return "text-yellow-500";
      case "cancelled":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  const handleUpdate = async (id) => {
    if (!newDate) {
      toast.error("Please enter a new date");
      return;
    }

    try {
      const res = await axios.put(`http://localhost:3000/bookings/${id}`, {
        newDate,
      });

      toast.success("Booking updated!");
      // update local state
      setBookings((prev) =>
        prev.map((booking) =>
          booking._id === id ? { ...booking, stayDate: newDate } : booking
        )
      );

      setEditingBookingId(null);
      setNewDate("");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update booking date");
    }
  };


  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "confirmed":
        return <FaCheckCircle className="text-green-500" />;
      case "pending":
        return <FaSpinner className="text-yellow-500 animate-spin" />;
      case "cancelled":
        return <FaTimesCircle className="text-red-500" />;
      default:
        return <FaExclamationCircle className="text-gray-500" />;
    }
  };

  const handleReviewSubmit = () => {
    const reviewData = {
      roomId: selectedBooking?.roomId || selectedBooking?._id,
      user: user?.displayName,
      email: user?.email,
      rating: parseInt(rating),
      comment,
      timestamp: new Date().toISOString(),
    };

    if (rating < 1 || rating > 5) {
      toast.error("Rating must be between 1 and 5!");
      return;
    }

    axios.post("http://localhost:3000/review", reviewData)
      .then((res) => {
        toast.success("Submit succfully");
        setShowModal(false);
        setComment("");
        setRating(0);
      })
      .catch((err) => {
        console.error(err);
      });

  };


  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-center mb-6 mt-10">My Bookings</h2>

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <FaSpinner className="animate-spin text-4xl text-blue-500" />
        </div>
      ) : error ? (
        <div className="text-center py-8 text-red-500">
          <FaExclamationCircle className="inline-block text-2xl mb-2" />
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Try Again
          </button>
        </div>
      ) : bookings.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">You haven't booked any rooms yet.</p>
          <a
            href="/rooms"
            className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Browse Rooms
          </a>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="py-3 px-4 text-left">Room</th>
                <th className="py-3  text-left"></th>
                <th className="py-3 px-4 text-left">Location</th>
                <th className="py-3 px-4 text-left">Date</th>
                <th className="py-3 px-4 text-left">Price</th>
                <th className="py-3 px-4 text-left">Actions</th>

              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr
                  key={booking._id}
                  className="border-b hover:bg-gray-50 transition duration-200"
                >
                  {/* Room with image */}
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={booking.image}
                        alt={booking.hotelName}
                        className="w-20 h-20 rounded object-cover shadow"
                      />
                      <div>
                        <div className="font-semibold text-base">{booking.hotelName}</div>
                        <div className="text-xs text-gray-500">{booking.roomId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 font-medium">
                    <div className="font-semibold">{booking.roomTitle}</div>
                    {booking.roomType && (
                      <div className="text-xs text-gray-500 mt-1">{booking.roomType}</div>
                    )}
                  </td>

                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <FaMapMarkerAlt className="text-blue-500 flex-shrink-0" />
                      <span className="text-sm">{booking.location}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <FaCalendarAlt className="text-green-500 flex-shrink-0" />
                      <span className="text-sm">{booking.stayDate}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <FaMoneyBill className="text-yellow-500 flex-shrink-0" />
                      <span className="text-sm">${booking.price.toLocaleString()}</span>
                    </div>
                  </td>

                  <td className="py-4 px-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setSelectedBooking(booking);
                          setShowModal(true);
                        }}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm transition"
                        disabled={booking.status?.toLowerCase() === "cancelled"}
                      >
                        Leave Review
                      </button>


                      {showModal && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center
                  bg-gray-200/40 backdrop-blur-sm">   {/* ← new tint + blur */}
                          <div className="relative w-[90%] max-w-md rounded-xl bg-white p-6 shadow-2xl">

                            {/* Close button */}
                            <button
                              onClick={() => setShowModal(false)}
                              className="absolute top-3 right-3 text-2xl text-gray-400 transition hover:text-red-500"
                            >
                              <FaTimes />
                            </button>

                            {/* Title */}
                            <h3 className="mb-4 text-center text-2xl font-bold text-gray-800">📝 Leave a Review</h3>

                            {/* Read‑only user name */}
                            <div className="my-3">
                              <label className="mb-1 flex items-center gap-1 text-sm text-gray-600">
                                <FaUser className="text-blue-500" /> User Name
                              </label>
                              <input
                                type="text"
                                value={user?.displayName || "Anonymous"}
                                readOnly
                                className="w-full cursor-not-allowed rounded-md border border-gray-300 bg-gray-100 px-3 py-2"
                              />
                            </div>

                            {/* Rating */}
                            <div className="my-3">
                              <label className="mb-1 block text-sm text-gray-600">⭐ Rating (1–5)</label>
                              <input
                                type="number"
                                min="1"
                                max="5"
                                value={rating}
                                onChange={(e) => setRating(e.target.value)}
                                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Ex: 4"
                              />
                            </div>

                            {/* Comment */}
                            <div className="my-3">
                              <label className="mb-1 block text-sm text-gray-600">✍️ Your Comment</label>
                              <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                className="h-24 w-full resize-none rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Write your feedback here..."
                              />
                            </div>

                            {/* Submit */}
                            <button
                              onClick={handleReviewSubmit}
                              className="mt-4 w-full rounded-lg bg-green-600 px-4 py-2 font-semibold text-white transition hover:bg-green-700"
                            >
                              Submit Review
                            </button>
                          </div>
                        </div>
                      )}


                      {/* //cancel */}
                      <button
                        onClick={() => handleCancel(booking._id)}
                        disabled={booking.status?.toLowerCase() === "cancelled"}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm flex items-center gap-1 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
                      >
                        <FaTimesCircle /> Cancel
                      </button>

                      {/* //update */}
                      {editingBookingId === booking._id ? (
                        <div className="flex flex-col gap-1">
                          <input
                            type="date"
                            value={newDate}
                            onChange={(e) => setNewDate(e.target.value)}
                            className="border px-2 py-1 rounded"
                          />
                          <button
                            onClick={() => handleUpdate(booking._id)}
                            className="bg-green-600 text-white px-2 py-1 rounded text-sm"
                          >
                            Save Date
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setEditingBookingId(booking._id)}
                          disabled={booking.status?.toLowerCase() === "cancelled"}
                          className="bg-green-500 text-white px-3 py-1 rounded text-sm"
                        >
                          Update
                        </button>
                      )}

                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyBookings;