import { successResponse, errorResponse } from "../../middleware/error.js";
import mongoose from "mongoose";
import { catchAsyncError } from "../../middleware/catchAsyncError.js";
import category from "../../models/category/category.js";
import blogCategory from "../../models/category/categoryBlog.js";
import upload from "../../middleware/multer.js";
import { readingTimeMiddleware } from "../../utils/helperfunctions.js"
import dotenv from "dotenv";
dotenv.config();

import BlogChunk from "../../models/category/chunkmodel.js";
// ...other imports...

export const createBlogEachCategory = catchAsyncError(async (req, res) => {
  let session;
  try {
    session = await mongoose.startSession();
    session.startTransaction();

    const {
      name,
      categoryMasterId,
      description,
      content,
      isChunked,
      uploadId,
      chunkIndex,
      totalChunks,
    } = req.body;

    // Get attachment file path from multer
    let attachmentPath = "";
    if (req.file) {
      attachmentPath = req.file.path; // multer saves the file and sets req.file
    }

    if (!name || !categoryMasterId || !description || !content) {
      throw new Error("All required fields must be provided.");
    }

    if (!isChunked) {
      const wordCount = content.trim().split(/\s+/).length;
      const estimatedReadingTime = Math.ceil(wordCount / 200);

      const newBlogCategory = await blogCategory.create([{
        name,
        categoryMasterId,
        description,
        content,
        readingTime: estimatedReadingTime,
        attachment: attachmentPath, // Save file path
      }], { session });

      await session.commitTransaction();
      session.endSession();

      return successResponse(res, "Category created successfully", {
        category: newBlogCategory[0],
      }, 201);
    } else {
      // For chunked, you may want to store attachmentPath in each chunk or just in the first
      await BlogChunk.create({
        uploadId,
        chunkIndex,
        totalChunks,
        name,
        categoryMasterId,
        description,
        content,
        attachment: attachmentPath,
      });

      // ...rest of your chunk assembly logic...
    }
  } catch (err) {
    if (session) {
      await session.abortTransaction();
      session.endSession();
    }
    console.error("Error creating blog category:", err);
    return errorResponse(res, err.message || "Internal Server Error", 500);
  }
});


export const getAllBlogEachcategory = catchAsyncError(async (req, res) => {
  let session = null;

  try {
    session = await mongoose.startSession();
    session.startTransaction();

    const BASE_URL = process.env.backend_photo_URL || "";
    const { categoryId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      return errorResponse(res, "Invalid category ID format", 400);
    }

    const objectId = new mongoose.Types.ObjectId(categoryId);
    const categories = await blogCategory.find({ categoryMasterId: objectId });

    const formatted = categories.map((item) => {
      const blog = item.toObject(); // Convert Mongoose doc to plain object
      // Fix: attachment is a string, not an array
      if (blog.attachment) {
        blog.attachment = `${BASE_URL}${blog.attachment}`;
      }
      return blog;
    });

    await session.commitTransaction();
    session.endSession();

    return successResponse(res, "Categories fetched successfully", { categories: formatted.reverse() }, 200);
  } catch (err) {
    if (session) {
      await session.abortTransaction();
      session.endSession();
    }
    console.error("Error fetching categories:", err);
    return errorResponse(res, err.message || "Internal Server Error", 500);
  }
});



export const viewBlogDetails = catchAsyncError(async (req, res) => {
  const { blogId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(blogId)) {
    return errorResponse(res, "Invalid blog ID format", 400);
  }

  try {
    const blog = await blogCategory.findById(blogId);

    if (!blog) {
      return errorResponse(res, "Blog not found", 404);
    }

    const BASE_URL = process.env.backend_photo_URL || "";
    if (blog.attachment) {
      blog.attachment = `${BASE_URL}${blog.attachment}`;
    }

    return successResponse(res, "Blog details fetched successfully", { blog }, 200);
  } catch (err) {
    console.error("Error fetching blog details:", err);
    return errorResponse(res, err.message || "Internal Server Error", 500);
  }
}
);