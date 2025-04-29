// Components/CategoryPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../config";

const CategoryPage = () => {
  const { id } = useParams();
  const [category, setCategory] = useState(null);

  useEffect(() => {
    fetch(`${BASE_URL}/category/${id}`)
      .then((res) => res.json())
      .then((data) => setCategory(data))
      .catch((err) => console.error("Error fetching category details:", err));
  }, [id]);

  if (!category) return <div className="text-white">Loading category...</div>;

  return (
    <div className="text-white">
      <h2 className="text-2xl font-semibold">{category.categoryName}</h2>
      <p>{category.categoryDescription}</p>
    </div>
  );
};

export default CategoryPage;
