// AppRoutes.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AboutMe from "../Components/about";
import CategoryPage from "../Components/pages/categ"; // Correct import of CategoryPage

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/about" />} />
      <Route path="/about" element={<AboutMe />} />
      <Route path="/category/:id" element={<CategoryPage />} /> {/* Dynamic route for category */}
    </Routes>
  );
};

export default AppRoutes;
