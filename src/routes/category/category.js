import { createCategories,getAllCategories } from "../../controllers/category/category.js";
import express from "express";
import requireAuth from "../../middleware/auth.js";
const  router = express.Router();


router.post("/create-category",  createCategories);
router.get('/category-list',getAllCategories)
export default router;
