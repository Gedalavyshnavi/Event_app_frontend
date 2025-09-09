// src/components/EventModal.jsx
import React from "react";
import "./Modal.css";

const EventModal = ({ event, isOpen, onClose, bookingId, fetchBookings }) => {
  if (!isOpen || !event) return null;

  // ✅ Cancel Booking Logic
  const handleCancelBooking = async (bookingId) => {
    try {
      const res = await fetch(`https://event-app-backend-1-ld95.onrender.com`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("Your booking is cancelled ✅");
        if (fetchBookings) fetchBookings(); 
        onClose(); // Close the modal
      } else {
        alert("Failed to cancel booking ❌");
      }
    } catch (err) {
      console.error("Cancel Error:", err);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* ❌ Close icon */}
        <button className="close-button" onClick={onClose}>×</button>

        {/* ✅ Title */}
        <h2 className="modal-title">Book Now - {event.title}</h2>

        {/* ✅ Event Info */}
        <p><strong>Date:</strong> {event.date}</p>
        <p><strong>Time:</strong> {event.time}</p>
        <p><strong>Location:</strong> {event.location}</p>
        <p><strong>State:</strong> {event.state}</p>
        <p><strong>Price:</strong> ₹{event.price}</p>
        <p><strong>Contact:</strong> {event.contactNumber}</p>
        <p><strong>Email:</strong> {event.email}</p>

        {/* ✅ Buttons */}
        <div className="modal-buttons">
          <button className="submit-button">Confirm Booking</button>
          <button className="cancel-button" onClick={onClose}>Cancel</button>

          {/* ✅ Cancel Booking Button (only shown if bookingId is provided) */}
          {bookingId && (
            <button
              className="cancel-button"
              onClick={() => handleCancelBooking(bookingId)}
            >
              Cancel Booking
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventModal;
