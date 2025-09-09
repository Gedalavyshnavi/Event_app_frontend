// src/pages/CategoryPage.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // ✅ to get category from URL
import EventCard from "../components/EventCard";

const CategoryPage = () => {
  const { category } = useParams(); // e.g., "Technology", "Music", etc.
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryEvents = async () => {
      try {
        setLoading(true);
        const url = `/api/events?category=${encodeURIComponent(category)}`;
        console.log("🔍 Fetching:", url);

        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(`Failed to fetch ${category} events`);
        }

        const data = await res.json();
        setEvents(data);
      } catch (err) {
        console.error(`❌ Error fetching ${category} events:`, err);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    if (category) {
      fetchCategoryEvents();
    }
  }, [category]);

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        🎯 {category} Events
      </h1>

      {loading ? (
        <p style={{ textAlign: "center" }}>⏳ Loading events...</p>
      ) : events.length > 0 ? (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "20px",
          }}
        >
          {events.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      ) : (
        <p style={{ textAlign: "center" }}>No {category} events found.</p>
      )}
    </div>
  );
};

export default CategoryPage;
