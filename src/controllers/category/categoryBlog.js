import { successResponse, errorResponse } from "../../middleware/error.js";
import mongoose from "mongoose";
import { catchAsyncError } from "../../middleware/catchAsyncError.js";
import category from "../../models/category/category.js";
import blogCategory from "../../models/category/categoryBlog.js";
import upload from "../../middleware/multer.js";
import { readingTimeMiddleware } from "../../utils/helperfunctions.js"


export const createBlogEachCategory = catchAsyncError(async (req, res) => {
  let session;

  try {
    session = await mongoose.startSession();
    session.startTransaction();

    // Handle file upload using multer
    await new Promise((resolve, reject) => {
      upload.fields([{ name: "attachement", maxCount: 20 }])(req, res, (err) => {
        if (err) return reject(err);
        resolve();
      });
    });

    // Destructure form text data
    const { name, categoryMasterId, description, content } = req.body;

    // // Validate required fields
    // if (!name || !categoryMasterId || !description || !content) {
    //   throw new Error("All required fields must be provided.");
    // }

    // Get uploaded filenames from multer
    const attachements = req.files?.attachement?.map(f => f.filename) || [];

    // Calculate reading time
    const wordCount = content.trim().split(/\s+/).length;
    const estimatedReadingTime = Math.ceil(wordCount / 200);

    // Save blog to DB
    const newBlogCategory = await blogCategory.create([{
      name,
      categoryMasterId,
      description,
      content,
      readingTime: estimatedReadingTime,
      attachement: attachements, // Save all image filenames as an array
    }], { session });

    await session.commitTransaction();
    session.endSession();

    return successResponse(res, "Category created successfully", {
      category: newBlogCategory[0],
    }, 201);

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
      blog.attachement = blog.attachement?.map((file) => `${BASE_URL}${file}`) || [];
      return blog;
    });

    await session.commitTransaction();
    session.endSession();

    return successResponse(res, "Categories fetched successfully", { categories: formatted }, 200);
  } catch (err) {
    if (session) {
      await session.abortTransaction();
      session.endSession();
    }
    console.error("Error fetching categories:", err);
    return errorResponse(res, err.message || "Internal Server Error", 500);
  }
});
