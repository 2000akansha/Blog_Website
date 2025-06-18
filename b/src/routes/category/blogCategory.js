import { createBlogEachCategory, getAllBlogEachcategory, viewBlogDetails } from "../../controllers/category/categoryBlog.js";
import express from "express";
import upload from "../../middleware/multer.js";
import requireAuth from "../../middleware/auth.js";
const router = express.Router();


router.post("/add-blog", upload.single("attachment"), createBlogEachCategory);
router.get("/view-blog-details/:blogId", viewBlogDetails);

router.post('/get-all-blog-list/:categoryId', getAllBlogEachcategory)
export default router;
