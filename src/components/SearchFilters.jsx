import React from "react";

const SearchFilters = ({ category, setCategory, date, setDate, onSearch }) => {
  return (
    <div
      className="filters"
      style={{
        marginBottom: "20px",
        textAlign: "center",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "10px",
      }}
    >
      {/* 🔽 Category Dropdown */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        style={{
          padding: "10px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          fontSize: "1em",
          minWidth: "200px",
          backgroundColor: "#1e1e2f",
          color: "#fff",
        }}
      >
        <option value="">🔍 Select Category</option>
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

      {/* 📅 Date Picker */}
      <input
        type="date"
        value={date || ""}
        onChange={(e) => setDate(e.target.value)}
        style={{
          padding: "10px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          fontSize: "1em",
          minWidth: "200px",
          backgroundColor: "#1e1e2f",
          color: "#fff",
        }}
      />

      {/* 🔘 Search Button */}
      <button
        onClick={onSearch}
        style={{
          padding: "10px 20px",
          borderRadius: "6px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          cursor: "pointer",
          fontSize: "1em",
        }}
      >
        Search
      </button>
    </div>
  );
};

export default SearchFilters;
