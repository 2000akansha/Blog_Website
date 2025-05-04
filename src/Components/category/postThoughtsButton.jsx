import React from "react";

const PostThoughtButton = () => {
  return (
    <button
      className="text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-300"
      onClick={() => window.open("/post-thoughts", "_blank")}
    >
      Post Your Thoughts 💭
    </button>
  );
};

export default PostThoughtButton;
