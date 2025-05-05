// import React, { useEffect, useState, useRef } from "react";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import axios from "axios";
// import { BASE_URL } from "../../config";

// const PostThoughtsPage = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     categoryMasterId: "",
//     description: "",
//     content: "",
//     attachment: [],
//   });

//   const [imagePreviews, setImagePreviews] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const quillRef = useRef(null);

//   useEffect(() => {
//     fetch(`${BASE_URL}/category/category-list`)
//       .then((res) => {
//         if (!res.ok) throw new Error(`Failed to fetch categories: ${res.status}`);
//         return res.json();
//       })
//       .then((data) => {
//         const fetchedCategories = data.data[0]?.categories || [];
//         setCategories(fetchedCategories);
//       })
//       .catch((err) => console.error("Error fetching categories:", err));
//   }, []);


//   const handleChange = (e) => {
//     const { name, value, files } = e.target;

//     if (files) {
//       const selectedFiles = Array.from(files);
//       const imageFiles = selectedFiles.filter((file) => file.type.startsWith("image/"));
//       setImagePreviews(imageFiles.map((file) => URL.createObjectURL(file)));

//       setFormData((prev) => ({
//         ...prev,
//         attachment: imageFiles,
//       }));
//     } else {
//       setFormData((prev) => ({
//         ...prev,
//         [name]: value,
//       }));
//     }
//   };

//   const handleEditorChange = (value) => {
//     setFormData((prev) => ({
//       ...prev,
//       content: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.name || !formData.categoryMasterId || !formData.description || !formData.content) {
//       alert("Please fill out all fields before submitting.");
//       return;
//     }

//     const submitData = new FormData();
//     submitData.append("name", formData.name);
//     submitData.append("categoryMasterId", formData.categoryMasterId);
//     submitData.append("description", formData.description);
//     submitData.append("content", formData.content);

//     formData.attachment.forEach((file) => {
//       submitData.append("attachment", file);
//     });

//     try {
//       const response = await axios.post(`${BASE_URL}/thoughts/post`, submitData);
//       console.log("✅ Post successful:", response.data);
//       alert("Your thought has been posted successfully!");

//       // Optional: Reset the form
//       setFormData({
//         name: "",
//         categoryMasterId: "",
//         description: "",
//         content: "",
//         attachment: [],
//       });
//       setImagePreviews([]);
//     } catch (error) {
//       console.error("❌ Error posting thought:", error);
//       alert("Failed to post your thought. Try again.");
//     }
//   };

//   const modules = {
//     toolbar: [
//       [{ header: "1" }, { header: "2" }, { font: [] }],
//       [{ list: "ordered" }, { list: "bullet" }],
//       ["bold", "italic", "underline", "strike"],
//       [{ align: [] }],
//       ["link", "image"],
//       [{ indent: "-1" }, { indent: "+1" }],
//       ["blockquote", "code-block"],
//       ["clean"],
//     ],
//   };

//   return (
//     <div >
//       <h1 className="text-4xl font-bold text-white mb-10 text-center">Post Your Thoughts</h1>

//       <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-8">
//         {/* Title */}
//         <div>
//           <label className="block text-sm font-medium text-white mb-2">Title</label>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             placeholder="Enter the title"
//             className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700"
//           />
//         </div>

//         {/* Category */}
//         <div>
//           <label className="block text-sm font-medium text-white mb-2">Category</label>
//           <select
//             name="categoryMasterId"
//             value={formData.categoryMasterId}
//             onChange={handleChange}
//             className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700"
//           >
//             <option value="">Select a category</option>
//             {categories.map((category) => (
//               <option key={category._id} value={category._id}>
//                 {category.categoryName}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Description */}
//         <div>
//           <label className="block text-sm font-medium text-white mb-2">Description</label>
//           <textarea
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             placeholder="Short description about the post"
//             className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700"
//           />
//         </div>

//         {/* Content */}
//         <div>
//           <label className="block text-sm font-medium text-white mb-2">Content</label>
//           <ReactQuill
//             ref={quillRef}
//             value={formData.content}
//             onChange={handleEditorChange}
//             modules={modules}
//             theme="snow"
//             placeholder="Write your detailed content here..."
//           />
//         </div>

//         {/* Image Upload */}
//         <div>
//           <label className="block text-sm font-medium text-white mb-2">Upload Images</label>
//           <input
//             type="file"
//             name="attachment"
//             accept="image/*"
//             multiple
//             onChange={handleChange}
//             className="text-white"
//           />
//           <div className="flex gap-4 mt-3 flex-wrap">
//             {imagePreviews.map((src, idx) => (
//               <img
//                 key={idx}
//                 src={src}
//                 alt={`preview-${idx}`}
//                 className="h-24 w-24 object-cover rounded border border-gray-600"
//               />
//             ))}
//           </div>
//         </div>

//         {/* Submit */}
//         <div>
//           <button
//             type="submit"
//             className="w-full py-3 px-4 bg-indigo-600 text-white rounded-md shadow-lg hover:bg-indigo-700"
//           >
//             Post
//           </button>
//         </div>
//       </form>
//     </div>
//   );

// };

// export default PostThoughtsPage;







import React, { useState, useEffect, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { BASE_URL } from "../../config";
import { FaBars } from "react-icons/fa";
import { ClipLoader } from "react-spinners"; // Optional loader

const PostThoughtsPage = () => {
    const [formData, setFormData] = useState({
        name: "",
        categoryMasterId: "",
        description: "",
        content: "",
        attachment: [],
    });
    const [imagePreviews, setImagePreviews] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const quillRef = useRef(null);
    const drawerRef = useRef(null); // Create ref for the drawer

    useEffect(() => {
        // Fetch categories
        fetch(`${BASE_URL}/category/category-list`)
            .then((res) => {
                if (!res.ok) throw new Error(`Failed to fetch categories: ${res.status}`);
                return res.json();
            })
            .then((data) => {
                const fetchedCategories = data.data[0]?.categories || [];
                setCategories(fetchedCategories);
            })
            .catch((err) => console.error("Error fetching categories:", err));

        // Close drawer if clicked outside
        const handleClickOutside = (event) => {
            if (drawerRef.current && !drawerRef.current.contains(event.target)) {
                setIsDrawerOpen(false);
            }
        };

        // Add event listener
        document.addEventListener("mousedown", handleClickOutside);

        // Cleanup event listener on component unmount
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (files) {
            const selectedFiles = Array.from(files);
            const imageFiles = selectedFiles.filter((file) => file.type.startsWith("image/"));
            setImagePreviews(imageFiles.map((file) => URL.createObjectURL(file)));

            setFormData((prev) => ({
                ...prev,
                attachment: imageFiles,
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleEditorChange = (value) => {
        setFormData((prev) => ({
            ...prev,
            content: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.categoryMasterId || !formData.description || !formData.content) {
            alert("Please fill out all fields before submitting.");
            return;
        }

        setLoading(true);
        const submitData = new FormData();
        submitData.append("name", formData.name);
        submitData.append("categoryMasterId", formData.categoryMasterId);
        submitData.append("description", formData.description);
        submitData.append("content", formData.content);

        formData.attachment.forEach((file) => {
            submitData.append("attachment", file);
        });

        try {
            const response = await axios.post(`${BASE_URL}/thoughts/post`, submitData);
            console.log("✅ Post successful:", response.data);
            alert("🎉 Your thought has been posted successfully!");

            setFormData({
                name: "",
                categoryMasterId: "",
                description: "",
                content: "",
                attachment: [],
            });
            setImagePreviews([]);
        } catch (error) {
            console.error("❌ Error posting thought:", error);
            alert("Something went wrong. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const modules = {
        toolbar: [
            [{ header: "1" }, { header: "2" }, { font: [] }],
            [{ list: "ordered" }, { list: "bullet" }],
            ["bold", "italic", "underline", "strike"],
            [{ align: [] }],
            ["link", "image"],
            [{ indent: "-1" }, { indent: "+1" }],
            ["blockquote", "code-block"],
            ["clean"],
        ],
    };

    return (
        <div >
            {/* Top Header */}
            <div className="fixed top-0 left-0 w-full text-white p-6 z-40 shadow-md flex justify-center">
                <h1 className="text-3xl font-bold tracking-wide">🧠 Post Your Thought</h1>
            </div>

            {/* Sidebar Toggle */}
            <button
                onClick={() => setIsDrawerOpen(true)}
                className="p-3 bg-indigo-600 hover:bg-indigo-700 text-white fixed top-4 left-4 z-50 rounded-full shadow"
            >
                <FaBars size={20} />
            </button>

            {/* Sidebar Drawer */}
            <div
                ref={drawerRef} // Attach ref to drawer
                className={`fixed top-0 left-0 w-72 h-full bg-gray-800 p-6 transition-transform transform ${isDrawerOpen ? "translate-x-0" : "-translate-x-full"} z-50`}
            >
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-white text-xl font-bold">Fill Details</h2>
                    <button
                        onClick={() => setIsDrawerOpen(false)}
                        className="text-white text-3xl"
                    >
                        &times;
                    </button>
                </div>

                <div className="space-y-6">
                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium text-white mb-1">Title</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter the title"
                            className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600"
                        />
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-sm font-medium text-white mb-1">Category</label>
                        <select
                            name="categoryMasterId"
                            value={formData.categoryMasterId}
                            onChange={handleChange}
                            className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600"
                        >
                            <option value="">Select a category</option>
                            {categories.map((category) => (
                                <option key={category._id} value={category._id}>
                                    {category.categoryName}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-white mb-1">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Brief about the post..."
                            className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600"
                        />
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className={`transition-all duration-300 ${isDrawerOpen ? "ml-72" : "ml-0"} mt-24 p-6`}>
                {/* Content Editor */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-white mb-2">Content</label>
                    <ReactQuill
                        ref={quillRef}
                        value={formData.content}
                        onChange={handleEditorChange}
                        modules={modules}
                        theme="snow"
                        placeholder="Write your detailed content here..."
                        className="bg-white text-black rounded"
                    />
                </div>

                {/* Image Upload */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-white mb-2">Upload Images</label>
                    <input
                        type="file"
                        name="attachment"
                        accept="image/*"
                        multiple
                        onChange={handleChange}
                        className="text-white"
                    />
                    <div className="flex gap-4 mt-4 flex-wrap">
                        {imagePreviews.map((src, idx) => (
                            <img
                                key={idx}
                                src={src}
                                alt={`preview-${idx}`}
                                className="h-24 w-24 object-cover rounded border border-gray-700"
                            />
                        ))}
                    </div>
                </div>

                {/* Submit Button */}
                <div className="mt-8 flex justify-center">
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className={`px-6 py-3 rounded-md text-white font-medium transition-all duration-200 shadow-md ${loading
                            ? "bg-gray-600 cursor-not-allowed"
                            : "bg-indigo-600 hover:bg-indigo-700"
                            }`}
                    >

                        
                        {loading ? <ClipLoader size={20} color="#fff" /> : " Post "}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PostThoughtsPage;
