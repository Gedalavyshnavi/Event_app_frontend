import React, { useState, useEffect } from "react";

const BookingForm = ({ event, onBack }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    tickets: "1",
  });

  const [submitted, setSubmitted] = useState(false);
  const [bookings, setBookings] = useState([]);

  // 🔎 Log selected event for debugging
  console.log("🎯 Received Event Prop:", event);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const fetchBookings = async () => {
    try {
      const res = await fetch("https://event-app-backend-1-ld95.onrender.com/api/events");
      const data = await res.json();
      setBookings(data);
    } catch (err) {
      console.error("❌ Error fetching bookings:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.address ||
      !formData.tickets ||
      !event?._id
    ) {
      alert("All fields are required");
      return;
    }

    const bookingData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      tickets: Number(formData.tickets),
      eventId: event._id,
    };

    // 🔍 Debug logs
    console.log("🎯 Submitting booking for event:", event);
    console.log("📤 Booking data:", bookingData);

    try {
      const res = await fetch("https://event-app-backend-1-ld95.onrender.com/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      const data = await res.json();
      console.log("📦 Server response:", data); // 🔍 Check backend response

      if (!res.ok) {
        if (res.status === 409) {
          alert(data.error || "Not enough tickets left.");
        } else {
          throw new Error(data.error || "Booking failed");
        }
        return;
      }

      alert("✅ Booking successful!");
      setFormData({ name: "", email: "", phone: "", address: "", tickets: "1" });
      setSubmitted(true);
      fetchBookings();
    } catch (error) {
      console.error("❌ Error submitting booking:", error.message);
      alert("Booking failed: " + error.message);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
      tickets: "1",
    });
    if (onBack) onBack();
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  if (submitted) {
    return (
      <div className="event-detail-card" style={confirmationCardStyle}>
        <h2 style={{ color: "#10b981", marginBottom: "15px" }}>Successfully Booked</h2>
        <p style={{ fontSize: "1.1em", color: "#333", marginBottom: "20px" }}>
          Thank you, {formData.name}! Your booking is confirmed for{" "}
          {formData.tickets} ticket(s) for {event ? event.title : "the event"}.
        </p>
        <button onClick={onBack} style={backBtnStyle}>
          Back to Events
        </button>
      </div>
    );
  }

  return (
    <div className="event-detail-card" style={formCardStyle}>
      <h2 style={{ marginBottom: "20px", color: "#333", textAlign: "center" }}>
        Book Tickets for {event ? event.title : "Selected Event"}
      </h2>

      <form onSubmit={handleSubmit}>
        <label style={labelStyle}>Name:</label>
        <input type="text" name="name" required value={formData.name} onChange={handleChange} style={inputStyle} />

        <label style={labelStyle}>Email:</label>
        <input type="email" name="email" required value={formData.email} onChange={handleChange} style={inputStyle} />

        <label style={labelStyle}>Phone Number:</label>
        <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} style={inputStyle} />

        <label style={labelStyle}>Address:</label>
        <textarea name="address" required rows="3" value={formData.address} onChange={handleChange} style={textareaStyle}></textarea>

        <label style={labelStyle}>Number of Tickets:</label>
        <select name="tickets" required value={formData.tickets} onChange={handleChange} style={inputStyle}>
          {Array.from({ length: 50 }, (_, i) => (
            <option key={i + 1} value={i + 1}>{i + 1}</option>
          ))}
        </select>

        <button type="submit" style={submitBtnStyle}>Submit Booking</button>
      </form>

      <button type="button" onClick={handleCancel} style={cancelBtnStyle}>Cancel</button>

      <div style={{ marginTop: "40px" }}>
        <h3 style={{ color: "#333", marginBottom: "10px" }}>📋 All Bookings</h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {bookings.map((b) => (
            <li key={b._id} style={bookingItemStyle}>
              <strong style={{ color: "#000" }}>{b.name}</strong> ({b.email}) booked{" "}
              <strong style={{ color: "#000" }}>{b.tickets || b.numberOfTickets}</strong> ticket(s)
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// 🔧 Styling
const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "15px",
  border: "1px solid #ddd",
  borderRadius: "4px",
};

const textareaStyle = {
  ...inputStyle,
  resize: "vertical",
};

const labelStyle = {
  display: "block",
  marginBottom: "5px",
  fontWeight: "bold",
  color: "#000",
};

const submitBtnStyle = {
  backgroundColor: "#28a745",
  color: "white",
  border: "none",
  borderRadius: "4px",
  padding: "12px 20px",
  cursor: "pointer",
  fontSize: "1em",
  width: "100%",
  marginBottom: "10px",
};

const cancelBtnStyle = {
  backgroundColor: "#dc3545",
  color: "white",
  border: "none",
  borderRadius: "4px",
  padding: "12px 20px",
  cursor: "pointer",
  fontSize: "1em",
  width: "100%",
  marginTop: "10px",
};

const backBtnStyle = {
  backgroundColor: "#007bff",
  color: "white",
  border: "none",
  borderRadius: "4px",
  padding: "10px 20px",
  cursor: "pointer",
  fontSize: "1em",
};

const formCardStyle = {
  padding: "20px",
  maxWidth: "600px",
  margin: "20px auto",
  background: "#fff",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
};

const confirmationCardStyle = {
  ...formCardStyle,
  textAlign: "center",
};

const bookingItemStyle = {
  background: "#f9f9f9",
  padding: "10px",
  borderRadius: "5px",
  marginBottom: "8px",
  color: "#000",
};

export default BookingForm;
