const express = require('express');

const { CheckAccess, CheckToken } = require('@/helpers/middleware');
const { singleExcel } = require('@/helpers/multer');

const { total } = require('./invitation-guest-book-total');
const { list } = require('./invitation-guest-book-list');
const { create } = require('./invitation-guest-book-create');
const { read } = require('./invitation-guest-book-read');
const { update } = require('./invitation-guest-book-update');
const { upload } = require('./invitation-guest-book-upload');
const { download } = require('./invitation-guest-book-download');

const router = express.Router();

// Total
router.get('/total', CheckToken, total);

// List
router.get('/', CheckToken, list);

// Create
router.post('/', [CheckAccess, CheckToken], create);
router.post('/', create);

// Upload
router.post('/upload', [CheckToken, singleExcel.single('file')], upload);

// Download
router.get('/download', CheckToken, download);

// Read
router.get('/:uniq', read);

// Update
router.put('/:uniq', [CheckAccess, CheckToken], update);
router.put('/:uniq', update);

module.exports = router;
