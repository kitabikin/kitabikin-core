const express = require('express');

const { CheckAccess, CheckToken } = require('@core/helpers/middleware');

const { total } = require('./theme-guest-book-total');
const { list } = require('./theme-guest-book-list');
const { create } = require('./theme-guest-book-create');
const { read } = require('./theme-guest-book-read');
const { update } = require('./theme-guest-book-update');

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
router.put('/:uniq', CheckToken, update);

module.exports = router;
