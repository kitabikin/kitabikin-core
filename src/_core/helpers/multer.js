const path = require('path');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

// Multer config
module.exports = multer({
  storage: multer.diskStorage({
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      cb(null, new Date().getTime() + '_' + uuidv4() + ext);
    },
  }),
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png' && ext !== '.svg') {
      cb(new Error('File type is not supported'), false);
      return;
    }
    cb(null, true);
  },
});
