import express from "express";
import {
  loginUser,
  signupUser,
} from "../../controllers/applicant/customer.js";
const router = express.Router();

router.post("/login", loginUser);
router.post("/sign-up", signupUser);
// router.post("/change-password", requireAuth, changePassword);

export default router;
