const express = require('express');

const { CheckAccess, CheckToken } = require('@/helpers/middleware');

const { total } = require('./theme-greeting-total');
const { list } = require('./theme-greeting-list');
const { create } = require('./theme-greeting-create');
const { read } = require('./theme-greeting-read');
const { update } = require('./theme-greeting-update');

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
