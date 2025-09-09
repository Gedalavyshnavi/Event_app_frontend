// App.jsx
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddEventForm from "./components/AddEventForm";
import EventCard from "./components/EventCard";
import SearchFilters from "./components/SearchFilters";
import BookingForm from "./components/BookingForm";
import Login from "./pages/Login";
import CategoryPage from "./pages/CategoryPage";
import "./index.css";

function Home() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showEvents, setShowEvents] = useState(true);
  const [backendData, setBackendData] = useState(null);

  const currentUser =
    JSON.parse(localStorage.getItem("user"))?.email || "guest@eventnest.com";

  useEffect(() => {
    fetchEvents();
    fetchTestData();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await fetch("https://event-app-backend-1-ld95.onrender.com");
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      setEvents(data);
      setFilteredEvents(data);
    } catch (error) {
      console.error("Failed to fetch events:", error);
    }
  };

  const fetchTestData = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/data");
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      setBackendData(data);
    } catch (err) {
      console.error("Error fetching test data:", err);
    }
  };

  const handleEventAdded = (newEvent) => {
    const updated = [...events, newEvent];
    setEvents(updated);
    setFilteredEvents(updated);
    setShowAddForm(false);
  };

  const handleDeleteEvent = (eventId) => {
    const updated = events.filter((e) => e._id !== eventId);
    setEvents(updated);
    setFilteredEvents(updated);
  };

  const handleSearch = async () => {
    try {
      const query = new URLSearchParams();
      if (category) query.append("category", category);
      if (date) query.append("date", date);

      const res = await fetch(
        `http://localhost:4000/api/events?${query.toString()}`
      );
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      setFilteredEvents(data);
    } catch (error) {
      console.error("Search failed:", error);
      alert("Failed to fetch search results.");
    }
  };

  const handleBookEventClick = (event) => {
    setSelectedEvent(event);
    setShowBookingForm(true);
  };

  const handleBackToEvents = () => {
    setShowBookingForm(false);
    setSelectedEvent(null);
    fetchEvents();
  };

  return (
    <div
      className="container"
      style={{
        fontFamily: "Inter, sans-serif",
        padding: "20px",
        backgroundColor: "#f0f2f5",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      {/* Logout */}
      <div
        style={{
          position: "fixed",
          top: "15px",
          right: "20px",
          zIndex: 1000,
        }}
      >
        <button
          onClick={() => {
            localStorage.removeItem("user");
            window.location.reload();
          }}
          style={{
            backgroundColor: "#ff3b3b",
            color: "#fff",
            padding: "10px 18px",
            border: "none",
            borderRadius: "30px",
            cursor: "pointer",
            fontWeight: "600",
            fontSize: "0.95rem",
            boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
            transition: "all 0.3s ease-in-out",
          }}
        >
          🚪 Logout
        </button>
      </div>

      {/* User Info */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          right: "160px",
          color: "#333",
          fontWeight: "600",
        }}
      >
        {`Welcome, ${currentUser}`}
      </div>

      {/* Hero */}
      <div
        style={{
          textAlign: "center",
          padding: "40px 20px",
          borderRadius: "16px",
          marginBottom: "30px",
          background: "linear-gradient(135deg, #f7c3ea, #f7d9f3)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        }}
      >
        <div style={{ fontSize: "3.2rem", marginBottom: "10px" }}>🎉</div>
        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: "800",
            background: "linear-gradient(90deg, #f000ac, #df0016)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          🎊EVENT-NEST🎊
        </h1>
        <p
          style={{
            marginTop: "10px",
            fontSize: "1.2rem",
            color: "#444",
            fontStyle: "italic",
          }}
        >
          "Find. Book. Celebrate — Your events made easy!"
        </p>
      </div>

      {/* Backend Test */}
      {backendData && (
        <div
          style={{
            backgroundColor: "#fff3cd",
            padding: "10px 20px",
            borderRadius: "8px",
            marginBottom: "20px",
            color: "#856404",
            fontSize: "0.95rem",
          }}
        >
          <strong>Test API Response:</strong> {JSON.stringify(backendData)}
        </div>
      )}

      {showBookingForm && selectedEvent ? (
        <BookingForm event={selectedEvent} onBack={handleBackToEvents} />
      ) : (
        <>
          <SearchFilters
            category={category}
            setCategory={setCategory}
            date={date}
            setDate={setDate}
            onSearch={handleSearch}
          />

          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <button
              onClick={() => setShowEvents((prev) => !prev)}
              style={{
                backgroundColor: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                padding: "10px 20px",
                cursor: "pointer",
                fontSize: "1em",
              }}
            >
              {showEvents ? "Hide All Events" : "Show All Events"}
            </button>
          </div>

          {showEvents && filteredEvents.length > 0 && (
            <div
              className="events-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "20px",
                maxWidth: "1200px",
                margin: "20px auto",
              }}
            >
              {filteredEvents.map((event) => (
                <div
                  key={event._id}
                  className="card"
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: "100%",
                  }}
                >
                  <EventCard
                    event={event}
                    onClick={handleBookEventClick}
                    onDelete={handleDeleteEvent}
                    currentUser={currentUser}
                  />
                </div>
              ))}
            </div>
          )}

          {!showEvents && (
            <p
              style={{
                textAlign: "center",
                marginTop: "20px",
                fontSize: "1.1em",
                color: "#777",
                fontStyle: "italic",
              }}
            >
              👀 Events are hidden. Click "Show All Events" to view them again.
            </p>
          )}

          <div style={{ textAlign: "center", marginTop: "30px" }}>
            <button
              onClick={() => setShowAddForm((prev) => !prev)}
              style={{
                backgroundColor: "#6c757d",
                color: "white",
                border: "none",
                borderRadius: "4px",
                padding: "12px 25px",
                cursor: "pointer",
                fontSize: "1em",
              }}
            >
              {showAddForm ? "Cancel Add Event" : "➕ Add New Event"}
            </button>
          </div>

          {showAddForm && <AddEventForm onEventAdded={handleEventAdded} />}
        </>
      )}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Dynamic category route */}
        <Route path="/:category" element={<CategoryPage />} />
        {/* Other routes */}
        <Route path="/add-event" element={<AddEventForm />} />
        <Route path="/book" element={<BookingForm />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}
