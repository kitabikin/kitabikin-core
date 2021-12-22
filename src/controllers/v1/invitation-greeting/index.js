const express = require('express');

const { CheckAccess, CheckToken } = require('@core/helpers/middleware');

const { total } = require('./invitation-greeting-total');
const { list } = require('./invitation-greeting-list');
const { create } = require('./invitation-greeting-create');
const { read } = require('./invitation-greeting-read');
const { update } = require('./invitation-greeting-update');

const router = express.Router();

// Total
router.get('/total', CheckToken, total);

// List
router.get('/', [CheckAccess, CheckToken], list);
router.get('/', list);

// Create
router.post('/', [CheckAccess, CheckToken], create);
router.post('/', create);

// Read
router.get('/:uniq', CheckToken, read);

// Update
router.put('/:uniq', CheckToken, update);

module.exports = router;
