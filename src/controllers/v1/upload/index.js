const express = require('express');

const { CheckToken } = require('@core/helpers/middleware');
const upload = require('@core/helpers/multer');

const { single } = require('./upload-single');

const router = express.Router();

router.post('/single', [CheckToken, upload.single('image')], single);

module.exports = router;
