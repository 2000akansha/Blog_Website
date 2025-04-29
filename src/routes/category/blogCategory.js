import { createBlogEachCategory,getAllBlogEachcategory } from "../../controllers/category/categoryBlog.js";
import express from "express";
import requireAuth from "../../middleware/auth.js";
const  router = express.Router();


router.post("/add-blog",  createBlogEachCategory);
router.post('/get-all-blog-list/:categoryId',getAllBlogEachcategory)
export default router;
