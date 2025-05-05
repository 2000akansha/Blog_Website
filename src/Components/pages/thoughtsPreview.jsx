// // src/pages/ThoughtPreview.js
// import React, { useEffect, useState } from "react";

// function ThoughtPreview() {
//   const [postData, setPostData] = useState(null);

//   useEffect(() => {
//     const storedData = JSON.parse(localStorage.getItem("thoughtPreviewData"));
//     if (storedData) {
//       setPostData(storedData);
//     }
//   }, []);

//   if (!postData) return <div className="text-center p-10">Loading preview...</div>;

//   return (
//     <div className="p-8 max-w-4xl mx-auto">
//       <h1 className="text-4xl font-bold mb-4">{postData.name}</h1>
//       <p className="text-lg mb-2 font-semibold">Category: {postData.categoryName}</p>
//       <p className="text-gray-700 mb-4">{postData.description}</p>
//       <div className="prose" dangerouslySetInnerHTML={{ __html: postData.content }} />

//       <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
//         {postData.imagePreviews?.map((img, index) => (
//           <img
//             key={index}
//             src={img}
//             alt={`Attachment ${index + 1}`}
//             className="w-full rounded-lg shadow-md"
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default ThoughtPreview;
