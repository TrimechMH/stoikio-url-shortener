import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StatsPage from "./pages/StatsPage";
import HomePage from "./pages/homePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/stats/:shortUrl" element={<StatsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
