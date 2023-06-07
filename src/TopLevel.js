import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import App from "./App";
import ChatBot from "./ChatBot";

function TopLevel() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/chatbot" element={<ChatBot />} />
      </Routes>
    </Router>
  );
}

export default TopLevel;
