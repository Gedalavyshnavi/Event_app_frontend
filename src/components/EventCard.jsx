// src/components/EventCard.jsx
import React from "react";

const EventCard = ({ event, onClick, onDelete, currentUser }) => {
  const {
    _id,
    title,
    date,
    time,
    category,
    location,
    state,
    price,
    contactNumber,
    email,
    description,
    image,
    createdBy,
  } = event;

  const handleDelete = async () => {
    const confirmDelete = window.confirm(`Are you sure you want to delete "${title}"?`);
    if (!confirmDelete) return;

    try {
      const res = await fetch(`https://event-app-backend-1-ld95.onrender.com`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete event");

      onDelete(_id); // Notify parent to remove from UI
    } catch (error) {
      console.error("Delete error:", error.message);
      alert("Error deleting event");
    }
  };

  const parsedPrice = parseFloat(price);

  return (
    <div
      className="card"
      onClick={() => onClick(event)}
      style={{
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <div style={{ flexGrow: 1 }}>
        {/* ✅ Event Image */}
        {image && (
          <img
            src={image}
            alt={title}
            className="event-image"
            style={{
              width: "100%",
              height: "180px",
              objectFit: "cover",
              borderTopLeftRadius: "8px",
              borderTopRightRadius: "8px",
            }}
          />
        )}

        {/* ✅ Title */}
        <h2 className="event-title" style={{ fontSize: "1.2rem", fontWeight: "bold", padding: "10px" }}>{title}</h2>

        {/* ✅ Event Info */}
        <div style={{ padding: "0 10px" }}>
          <p><strong>Date:</strong> {new Date(date).toLocaleDateString()}</p>
          <p><strong>Time:</strong> {time}</p>
          <p><strong>Category:</strong> {category}</p>
          <p><strong>Location:</strong> {location}</p>
          <p><strong>State:</strong> {state}</p>
          <p><strong>Amount:</strong> ₹{!isNaN(parsedPrice) && parsedPrice > 0 ? parsedPrice : "Free"}</p>
          {contactNumber && <p><strong>Contact:</strong> {contactNumber}</p>}
          {email && <p><strong>Email:</strong> {email}</p>}
          <p><strong>Description:</strong> {description}</p>
          <p style={{ fontSize: "0.85rem", color: "#777" }}>
            Created by: {createdBy}
          </p>
        </div>
      </div>

      {/* ✅ Buttons at bottom */}
      <div
        style={{
          marginTop: "auto",
          display: "flex",
          justifyContent: "space-between",
          padding: "10px",
        }}
      >
        {/* ✅ Only show Delete if current user created the event */}
        {currentUser === createdBy && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDelete();
            }}
            style={{
              backgroundColor: "#dc3545",
              color: "white",
              border: "none",
              padding: "10px 15px",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: "500",
            }}
          >
            🗑️ Delete
          </button>
        )}

        <button
          onClick={(e) => {
            e.stopPropagation();
            onClick(event);
          }}
          style={{
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            padding: "10px 15px",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "500",
            marginLeft: "10px",
          }}
        >
          📅 Book Now
        </button>
      </div>
    </div>
  );
};

export default EventCard;
