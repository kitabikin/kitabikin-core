const express = require('express');

const { CheckToken } = require('@/helpers/middleware');
const { singleImage } = require('@/helpers/multer');

const { single } = require('./upload-single');

const router = express.Router();

router.post('/single', [CheckToken, singleImage.single('image')], single);

module.exports = router;
