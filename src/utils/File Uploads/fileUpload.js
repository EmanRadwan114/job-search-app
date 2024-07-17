import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import AppError from "../Handle Errrors/AppError.js";

function fileUpload() {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
      cb(null, uuidv4() + "" + file.originalname);
    },
  });

  function fileFilter(req, file, cb) {
    console.log(file);
    const type = file.mimetype.split("/");
    if (type[1] === "pdf") {
      cb(null, true);
    } else {
      cb(new AppError("pdf files only", 409), false);
    }
  }

  const upload = multer({ storage, fileFilter });

  return upload;
}

export function uploadSingleFile(fieldName) {
  return fileUpload().single(fieldName);
}
