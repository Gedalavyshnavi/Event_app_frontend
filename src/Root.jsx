import React, { useState, useEffect } from "react";
import App from "./App";
import Login from "./Login";

const Root = () => {
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("user"));
    if (stored?.email) {
      setUserEmail(stored.email);
    }
  }, []);

  return userEmail ? <App /> : <Login onLogin={setUserEmail} />;
};

export default Root;
