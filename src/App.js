import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import DOFORM from "./pages/DOFORM";
import CONCOR from "./pages/CONCOR";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doform" element={<DOFORM />} />
        <Route path="/concor" element={<CONCOR />} />
      </Routes>
    </Router>
  );
}
