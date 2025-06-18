import {
  addLevels,
  getAllLevels,
  updateLevel,
  deleteLevel,
} from "../../controllers/superadmin/level.js";
import express from "express";
import requireAuth from "../../middleware/auth.js";
const router = express.Router();
router.post("/add-levels", requireAuth, addLevels);
router.get("/get-all-level-list", requireAuth, getAllLevels);
router.delete("/delete-level", requireAuth, deleteLevel);
router.put("/update-level-master/:id", requireAuth, updateLevel);

export default router;
