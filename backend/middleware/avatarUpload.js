const multer = require('multer');
const path = require('path');
const uniqid = require('uniqid');
const AWS = require('aws-sdk');
const multerS3 = require('multer-s3');

const fileFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png/;
  const mimetype = fileTypes.test(file.mimetype);
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  if (mimetype && extname) {
    cb(null, true);
    return;
  }
  cb(
    new Error(
      `The file type is not supported. Supported file extensions are: ${fileTypes}`
    )
  );
};

const filename = (req, file, cb) => {
  cb(null, `${uniqid()}${path.extname(file.originalname).toLowerCase()}`);
};

let storage = multer.diskStorage({
  destination: path.join(__dirname, '../uploads'),
  filename
});

if (process.env.NODE_ENV === 'production') {
  AWS.config = new AWS.Config();
  AWS.config.accessKeyId = process.env.AWS_ID;
  AWS.config.secretAccessKey = process.env.AWS_KEY;
  const s3 = new AWS.S3();
  storage = multerS3({
    s3,
    bucket: process.env.AWS_BUCKET_NAME,
    key: filename
  });
}

module.exports = multer({
  storage,
  limits: {
    // maximum file size in bytes
    fileSize: 1048576
  },
  fileFilter
}).single('avatar');
