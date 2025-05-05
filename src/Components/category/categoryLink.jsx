import React from "react";
import { Link } from "react-router-dom";

// Gradient background class
const gradientBgClass = "bg-gradient-to-r from-[#020213] to-[#091C38]";

const CategoryLinks = ({ categories }) => {
  return (
    <div className="flex items-center space-x-6">
      {categories.map((cat) => (
        <Link to={`/category/${cat._id}`} key={cat._id}>
          <div className="flex items-center space-x-1 hover:underline cursor-pointer">
            <span className="text-sm text-white">{cat.categoryName?.trim()}</span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CategoryLinks;
