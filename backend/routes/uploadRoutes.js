import path from "path";
import express from "express";
import multer from "multer";
import fs from "fs";

const router = express.Router();

// Ensure 'uploads' directory exists
const uploadDir = "uploads/";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.posix.extname(file.originalname)}`
    );
  },
});

const filetypes = /jpg|jpeg|png/;
const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

function fileFilter(req, file, cb) {
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = mimetypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed (jpg, jpeg, png)!"));
  }
}

const upload = multer({
  storage,
  fileFilter,
});

router.post("/", upload.single("image"), (req, res) => {
  // Normalize the file path to use forward slashes
  const imagePath = `/${req.file.path.replace(/\\/g, "/")}`;
  res.send({
    message: "Image Uploaded",
    image: imagePath,
  });
});

export default router;
