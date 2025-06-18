import express from "express";
import { uploadDistricts,uploadDistrictAndSubDistricts } from "../../controllers/superadmin/district.js";
import upload from "../../middleware/multer.js";
import {
  getAllDistricts,
  addDistrictUser,
  updateDistrictUser,
  getAllDistrictUser,
  deleteDistrictUser,
  getAllsubDistricts,
} from "../../controllers/superadmin/districtUser.js";
import requireAuth from "../../middleware/auth.js";

const router = express.Router();

// Route to handle district upload (with Excel file)
router.post("/upload-districts", upload.single("excel"), uploadDistricts);
router.post("/upload-districts-subDistricts", upload.single("excel"), uploadDistrictAndSubDistricts);

router.post("/create-district-users", requireAuth, addDistrictUser);
router.post("/get-all-district-users", requireAuth, getAllDistrictUser);
router.put("/update-district-users/:id", requireAuth, updateDistrictUser);
router.get("/get-all-districts", requireAuth, getAllDistricts);
router.get("/get-all-districts-subdistricts", requireAuth, getAllsubDistricts);

router.delete("/delete-district-user", requireAuth, deleteDistrictUser);

export default router;
