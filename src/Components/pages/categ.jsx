import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../config";
import axios from "axios";

const CategoryPage = () => {
  const { id } = useParams();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.post(`${BASE_URL}/blog-category/get-all-blog-list/${id}`);
        const categories = res.data?.data[0]?.categories || []; // Correctly accessing categories
        setBlogs(categories);
      } catch (err) {
        console.error("❌ Error fetching blogs:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [id]);

  return (
    <div className="text-white">
      {/* Render the title only if blogs are found */}
      {blogs.length > 0 && (
        <h2 className="text-2xl font-semibold mb-4">Blogs in This Category</h2>
      )}

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-400">Error: {error}</p>
      ) : blogs.length === 0 ? (
        <div className="flex justify-center items-center">
          <h2 className="text-2xl font-semibold mb-4"> No Blogs in this Category</h2>

          <img
            src="\public\assets\img\Animation - 1745935297689.gif" // Add your GIF URL here
            alt="No blogs found"
            className="w-40 h-40" // You can adjust the size as needed
          />
        </div>
      ) : (
        <ul className="space-y-6">
          {blogs.map((blog) => (
            <div key={blog._id}>
              <h3 className="text-xl font-bold mb-4">{blog.name}</h3>
              <ul className="space-y-6">
                <li
                  key={blog._id} // Unique key for each blog
                  className="flex gap-6 items-start border p-4 rounded-md bg-[#111827]"
                >
                  {/* Left: Image */}
                  <div className="w-40 h-40 flex-shrink-0">
                    {blog.attachement?.[0] ? (
                      <img
                        src={blog.attachement[0]}
                        alt={blog.name}
                        className="w-full h-full object-cover rounded"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-800 flex items-center justify-center text-sm text-gray-400 rounded">
                        No Image
                      </div>
                    )}
                  </div>

                  {/* Right: Blog Info */}
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-1">{blog.name}</h3>
                    <p className="text-sm text-gray-400 mb-2">{blog.description}</p>
                    <p className="text-sm text-gray-500">
                      <strong>Reading time:</strong> {blog.readingTime} min
                    </p>
                    <p className="text-xs text-gray-600">
                      <strong>Published:</strong>{" "}
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CategoryPage;
