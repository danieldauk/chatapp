const multer = require('multer');
const path = require('path');
const uniqid = require('uniqid');

const fileFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png/;
  const mimetype = fileTypes.test(file.mimetype);
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  if (mimetype && extname) {
    cb(null, true);
    return;
  }
  cb(new Error(`The file type is not supported. Supported file extensions are: ${fileTypes}`));
};

const filename = (req, file, cb) => {
  cb(null, `${uniqid()}${path.extname(file.originalname).toLowerCase()}`);
};

const storage = multer.diskStorage({
  destination: path.join(__dirname, '../uploads'),
  filename
});

module.exports = multer({
  storage,
  limits: {
    // maximum file size in bytes
    fileSize: 2097152
  },
  fileFilter
}).single('avatar');
