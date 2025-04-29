import multer from "multer";
import path from "path";
import crypto from "crypto";
import fs from "fs";

// Ensure 'uploads' directory exists
const uploadDir = "uploads/";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Set file size limit to 5MB (in bytes)
const fileSizeLimit = 15* 1024 * 1024; // 15MB in bytes

// Set up multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Save files in 'uploads/' directory
  },
  filename: (req, file, cb) => {
    try {
      console.log("Uploading file:", file.originalname);

      const randomNumber = crypto.randomBytes(4).toString("hex"); // Unique ID
      const timestamp = Date.now(); // Timestamp
      const ext = path.extname(file.originalname).toLowerCase(); // File extension
      const userId = req.user?.id || "unknown"; // Get user ID

      const documentType = file.fieldname; // Fieldname used as type
      const filename = `${documentType}_${randomNumber}_${timestamp}_${userId}${ext}`; // Final filename

      // Save filename for DB use (Multer adds it to req.file.filename automatically)
      file.filename = filename;

      // Optional metadata if you want extra info
      file.metadata = {
        filename,
        fieldname: documentType,
        originalname: file.originalname,
        mimetype: file.mimetype,
        size: file.size || 0,
        path: filename,
      };

      cb(null, filename); // Save file to disk with this name
    } catch (err) {
      console.error("File upload error:", err);
      cb(new Error("Error processing file upload"), null);
    }
  },
});

// File filter to restrict uploads to images & PDFs & Excel files
const fileFilter = (req, file, cb) => {
  const allowedTypes =
    /jpeg|jpg|png|pdf|xls|xlsx|vnd.ms-excel|vnd.openxmlformats-officedocument.spreadsheetml.sheet/;

  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true); // Valid file
  } else {
    cb(
      new Error(
        "Invalid file type. Only JPEG, PNG, PDF, and Excel files are allowed."
      ),
      false
    );
  }
};

// Initialize multer instance
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: fileSizeLimit,
  },
});

export default upload;
