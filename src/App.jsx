import React, { useEffect, useState } from "react"; // Import React and necessary hooks
import { BrowserRouter as Router, Link } from "react-router-dom"; // Import Router and Link from react-router
import { Divider } from "@mui/material"; // Import Divider from Material-UI
import AppRoutes from "./Routes/AppRoutes"; // Import AppRoutes
import { BASE_URL } from "./config"; // Import your API base URL config
import PostThoughtModal from "./Components/modal/modal"; // Import the PostThoughtModal component

function App() {
  const [categories, setCategories] = useState([]); // State to store categories
  const [modalOpen, setModalOpen] = useState(false); // State to control modal visibility

  // Function to handle opening the LinkedIn profile
  const handleGetInTouchClick = () => {
    window.open("https://www.linkedin.com/in/majamal/", "_blank"); // Open LinkedIn profile
  };

  // Function to open the modal
  const openModal = () => {
    setModalOpen(true); // Set modal to open
  };

  // Function to close the modal
  const closeModal = () => {
    setModalOpen(false); // Set modal to close
  };

  // Fetch categories when the component is mounted
  useEffect(() => {
    fetch(`${BASE_URL}/category/category-list`) // API call to fetch categories
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch category list"); // Error handling
        }
        return response.json(); // Return JSON data
      })
      .then((data) => {
        const categoryArray = data?.data?.[0]?.categories || []; // Extract categories from the response
        setCategories(categoryArray); // Update state with categories
      })
      .catch((error) => {
        console.error("Error fetching categories:", error); // Log any errors
        setCategories([]); // Set categories to an empty array in case of an error
      });
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#020213] to-[#091C38]"> {/* Full screen background gradient */}
      <Router>
        <header>
          <div className="container mx-auto text-center py-8"> {/* Header container */}
            <h1 className="text-3xl sm:text-4xl font-semibold text-white">Photon</h1> {/* Main title */}
            {/* Navigation */}
            <div className="flex justify-between items-center mt-6 text-white">
              <div className="flex items-center space-x-4">
                <Link to="/about">
                  <button className="text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-300">
                    About
                  </button>
                </Link>

                {/* Dynamic Categories */}
                {categories.map((cat) => (
                  <Link to={`/category/${cat._id}`} key={cat._id}>
                    <div className="flex items-center space-x-1 hover:underline cursor-pointer">
                      <span className="text-sm text-white">{cat.categoryName?.trim()}</span>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Post Your Thoughts Button */}
              <button
                className="text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-300"
                onClick={openModal} // Open the modal when clicked
              >
                Post Your Thoughts 💭
              </button>
            </div>
          </div>
        </header>

        <Divider sx={{ backgroundColor: "#fff", margin: "20px auto", width: "80%" }} /> {/* Divider for separating sections */}

        <main className="py-8">
          <div className="container mx-auto">
            <AppRoutes /> {/* Route handling */}
          </div>
        </main>

        <footer className="bg-gradient-to-r from-[#020213] to-[#091C38] text-white py-6">
          <div className="container mx-auto">
            <p className="text-center text-sm">
              © {new Date().getFullYear()}. All rights reserved.
            </p>
          </div>
        </footer>

        {/* Post Thought Modal */}
        <PostThoughtModal 
          open={modalOpen}  // Control modal visibility
          onClose={closeModal} // Function to close the modal
          categories={categories} // Passing categories to modal as a prop
        />
      </Router>
    </div>
  );
}

export default App;
