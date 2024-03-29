const multer = require("multer");
const nanoid = require("nanoid").nanoid;
const utf8 = require("utf8")
exports.imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, nanoid() + "-" + file.originalname);
  },
});

exports.imageFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(new Error("unsupported file"), false);
  }
};
exports.fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png"
    ) {
      cb(null, "images");
    } else {
      cb(null, "files");
    }
  },
  filename: (req, file, cb) => {
    cb(null,  utf8.decode(file.originalname) + "-" +  nanoid() +"." + file.mimetype.split('/')[1]);
  },
});

exports.fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "application/pdf" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(new Error("unsupported file"), false);
  }
};
