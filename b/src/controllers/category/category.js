import { successResponse, errorResponse } from "../../middleware/error.js";
import mongoose from "mongoose";
import { catchAsyncError } from "../../middleware/catchAsyncError.js";
import category from "../../models/category/category.js";


export const createCategories = catchAsyncError(async (req, res) => {
    let session = null;

    try {
        session = await mongoose.startSession();
        session.startTransaction();
        const {
            categoryName,
            categoryDescription
        } = req.body;

        const saveAbout = await category.create([{
            categoryName,
            categoryDescription
        }], { session });

        await session.commitTransaction();
        session.endSession();

        return successResponse(res, "category created successfully", {
            saveAbout,
        }, 201);

    } catch (err) {
        if (session) {
            await session.abortTransaction();
            session.endSession();
        }
        console.error("Error in create category:", err);
        return errorResponse(res, err.message || "Internal Server Error", 500);
    }
});



export const getAllCategories = catchAsyncError(async (req, res) => {
    let session = null;

    try {
        session = await mongoose.startSession();
        session.startTransaction();

        const categories = await category.find().session(session);

        await session.commitTransaction();
        session.endSession();

        return successResponse(res, "Categories fetched successfully", {
            categories,
        }, 200);

    } catch (err) {
        if (session) {
            await session.abortTransaction();
            session.endSession();
        }
        console.error("Error fetching categories:", err);
        return errorResponse(res, err.message || "Internal Server Error", 500);
    }
});
