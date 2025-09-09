// src/components/AddEventForm.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddEventForm = ({ onEventAdded }) => {
  const navigate = useNavigate(); // ✅ Hook to navigate
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    category: "",
    description: "",
    location: "",
    state: "",
    image: "",
    price: "",
    contactNumber: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      title,
      date,
      time,
      category,
      description,
      location,
      state,
      image,
      price,
      contactNumber,
      email,
    } = formData;

    const currentUser = JSON.parse(localStorage.getItem("user"))?.email;

    if (
      !title ||
      !date ||
      !time ||
      !category ||
      !description ||
      !location ||
      !state ||
      !price ||
      !contactNumber ||
      !email
    ) {
      alert("Please fill all required fields.");
      return;
    }

    const newEvent = {
      title,
      date,
      time,
      category,
      description,
      location,
      state,
      image,
      price: Number(price),
      contactNumber,
      email,
      createdBy: currentUser,
    };

    try {
      const res = await fetch("http://localhost:4000/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEvent),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to add event");

      onEventAdded(data); // Notify parent
      alert("✅ Event added successfully!");

      setFormData({
        title: "",
        date: "",
        time: "",
        category: "",
        description: "",
        location: "",
        state: "",
        image: "",
        price: "",
        contactNumber: "",
        email: "",
      });

      navigate("/"); // ✅ Navigate to home after submit
    } catch (error) {
      console.error("❌ Error:", error.message);
      alert("Failed to add event: " + error.message);
    }
  };

  return (
    <div className="card" style={{ maxWidth: "600px", margin: "auto", marginTop: "30px" }}>
      <h3 style={{ textAlign: "center", marginBottom: "15px" }}>➕ Add New Event</h3>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <input name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
        <input type="date" name="date" value={formData.date} onChange={handleChange} required />
        <input type="time" name="time" value={formData.time} onChange={handleChange} required />

        {/* Dropdown for Category */}
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          style={{
            padding: "12px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            fontSize: "1em",
            backgroundColor: "#1e1e2f",
            color: "#fff",
          }}
        >
          <option value="">Select Category</option>
          <option value="Music">Music</option>
          <option value="Art">Art</option>
          <option value="Sports">Sports</option>
          <option value="Education">Education</option>
          <option value="Gaming">Gaming</option>
          <option value="Food">Food</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Technology">Technology</option>
          <option value="Dance">Dance</option>
        </select>

        <input name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
        <input name="location" placeholder="Location" value={formData.location} onChange={handleChange} required />
        <input name="state" placeholder="State" value={formData.state} onChange={handleChange} required />
        <input name="image" placeholder="Image URL (optional)" value={formData.image} onChange={handleChange} />
        <input
          type="number"
          name="price"
          placeholder="Ticket Fee / Amount ₹"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="contactNumber"
          placeholder="Organizer Contact Number"
          value={formData.contactNumber}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Organizer Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          style={{
            backgroundColor: "#28a745",
            color: "#fff",
            padding: "10px",
            border: "none",
            borderRadius: "6px",
            fontWeight: "bold",
            cursor: "pointer",
            marginTop: "10px",
          }}
        >
          🚀 Submit Event
        </button>
      </form>
    </div>
  );
};

export default AddEventForm;
