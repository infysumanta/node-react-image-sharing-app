const multer = require("multer");
const uuidv4 = require("uuid/v4");

/* Creating a storage object that will be used by multer to store the file. */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "/public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, uuidv4());
  },
});

/* Creating a multer object that will be used to upload the file. */
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/png"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
  limits: {
    fileSizeLimit: 1 * 1024 * 1024,
  },
});

module.exports = { upload };
