// src/components/EventDetail.jsx
import React, { useState } from "react";
import BookingForm from "./BookingForm";
import "./Modal.css"; // ✅ Import modal CSS

const EventDetail = ({ event, onBack }) => {
  const [showBooking, setShowBooking] = useState(false);

  if (!event) return null;

  return (
    <div className="event-detail-wrapper">
      <div className="event-detail-card side-by-side">
        {/* ✅ Event Info Section */}
        <div className="event-info-section">
          <button onClick={onBack} className="back-button">← Back</button>

          <h2>{event.title}</h2>

          {event.image && (
            <img src={event.image} alt={event.title} className="event-image" />
          )}

          <p><strong>Description:</strong> {event.description}</p>
          <p><strong>Date:</strong> {event.date}</p>
          <p><strong>Time:</strong> {event.time}</p>
          <p><strong>Location:</strong> {event.location}, {event.state}</p>
          <p><strong>Category:</strong> {event.category}</p>
          <p><strong>Fee:</strong> ₹{event.amount || "Free"}</p>

          <button
            className="book-button"
            onClick={() => setShowBooking(true)}
          >
            Book Now
          </button>
        </div>
      </div>

      {/* ✅ Modal Popup Booking Form */}
      {showBooking && (
        <div className="modal-overlay" onClick={() => setShowBooking(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="close-button"
              onClick={() => setShowBooking(false)}
            >
              &times;
            </button>
            <BookingForm event={event} onBack={() => setShowBooking(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDetail;