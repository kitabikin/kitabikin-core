const express = require('express');

const { CheckAccess, CheckToken } = require('@core/helpers/middleware');

const { total } = require('./invitation-guest-book-total');
const { list } = require('./invitation-guest-book-list');
const { create } = require('./invitation-guest-book-create');
const { read } = require('./invitation-guest-book-read');
const { update } = require('./invitation-guest-book-update');

const router = express.Router();

// Total
router.get('/total', CheckToken, total);

// List
router.get('/', CheckToken, list);

// Create
router.post('/', [CheckAccess, CheckToken], create);
router.post('/', create);

// Read
router.get('/:uniq', CheckToken, read);

// Update
router.put('/:uniq', [CheckAccess, CheckToken], create);
router.put('/:uniq', update);

module.exports = router;