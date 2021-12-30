const path = require('path');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

// Multer config
const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, new Date().getTime() + '_' + uuidv4() + ext);
  },
});

const singleImage = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png' && ext !== '.svg') {
      cb(new Error('File type is not supported'), false);
      return;
    }
    cb(null, true);
  },
});

const singleExcel = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== '.xls' && ext !== '.xlsx') {
      cb(new Error('File type is not supported'), false);
      return;
    }
    cb(null, true);
  },
});

module.exports = {
  singleImage,
  singleExcel,
};
