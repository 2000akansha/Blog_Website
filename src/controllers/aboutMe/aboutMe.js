import about from "../../models/aboutme/about.js";
import { successResponse, errorResponse } from "../../middleware/error.js";
import mongoose from "mongoose";
import { catchAsyncError } from "../../middleware/catchAsyncError.js";
import upload from "../../middleware/multer.js";



export const SaveaboutMe = catchAsyncError(async (req, res) => {
    let session = null;

    try {
        session = await mongoose.startSession();
        session.startTransaction();

        // Setup multer for file handling
        const multerUpload = () =>
            new Promise((resolve, reject) => {
                upload.fields([{ name: "photo", maxCount: 1 }])(req, res, (err) => {
                    if (err) return reject(err);
                    resolve();
                });
            });

        // Wait for file upload to finish
        await multerUpload();

        const getFilePath = (field) => req.files?.[field]?.[0]?.filename || "";

        const {
            name,
            email,
            phone,
            content,
            designation
        } = req.body;

        const saveAbout = await about.create([{
            name,
            email,
            phone,
            content,
            designation,
            photo: getFilePath("photo"),
        }], { session });

        await session.commitTransaction();
        session.endSession();

        return successResponse(res, "Application & documents submitted successfully", {
            saveAbout,
        }, 201);

    } catch (err) {
        if (session) {
            await session.abortTransaction();
            session.endSession();
        }
        console.error("Error in SaveaboutMe:", err);
        return errorResponse(res, err.message || "Internal Server Error", 500);
    }
});




export const getABoutMe = catchAsyncError(async (req, res, next) => {
    let session = null;
  
    try {
      session = await mongoose.startSession();
      session.startTransaction();
  
      const BASE_URL = process.env.backend_photo_URL || "";
  
      // Fetch all AboutMe documents
      const applications = await about.find().session(session);
  
      // Format response with full photo URL
      const formattedApplications = applications.map((app) => {
        const appObject = app.toObject();
  
        return {
          ...appObject,
          photo: appObject.photo ? `${BASE_URL}${appObject.photo}` : null,
        };
      });
  
      if (formattedApplications.length === 0) {
        await session.abortTransaction();
        session.endSession();
        return errorResponse(res, "No About Me entries found", 404);
      }
  
      await session.commitTransaction();
      session.endSession();
  
      return successResponse(
        res,
        "About Me entries fetched successfully",
        formattedApplications.reverse() // optional: newest first
      );
  
    } catch (err) {
      if (session) {
        await session.abortTransaction();
        session.endSession();
      }
  
      console.error("Error in getABoutMe:", err);
      return errorResponse(
        res,
        err.message || "An error occurred while fetching About Me data",
        500
      );
    }
  });
  