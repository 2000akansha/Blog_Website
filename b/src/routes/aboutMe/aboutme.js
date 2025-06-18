import { getABoutMe, SaveaboutMe } from "../../controllers/aboutMe/aboutMe.js";
import express from "express";
import requireAuth from "../../middleware/auth.js";
const  router = express.Router();


router.post("/submit-about-form",  SaveaboutMe);
router.get('/about-list',getABoutMe)
export default router;
