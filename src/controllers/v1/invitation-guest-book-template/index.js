const express = require('express');

const { CheckAccess, CheckToken } = require('@/helpers/middleware');

const { read } = require('./invitation-guest-book-template-read');
const { update } = require('./invitation-guest-book-template-update');

const router = express.Router();

// Read
router.get('/:uniq', [CheckAccess, CheckToken], read);
router.get('/:uniq', read);

// Update
router.put('/:uniq', [CheckAccess, CheckToken], update);
router.put('/:uniq', update);

module.exports = router;
