const express = require('express');

const { CheckAccess, CheckToken } = require('@core/helpers/middleware');

const { total } = require('./theme-total');
const { list } = require('./theme-list');
const { create } = require('./theme-create');
const { read } = require('./theme-read');
const { update } = require('./theme-update');

const router = express.Router();

// Total
router.get('/total', CheckToken, total);

// List
router.get('/', [CheckAccess, CheckToken], list);
router.get('/', list);

// Create
router.post('/', CheckToken, create);

// Read
router.get('/:uniq', [CheckAccess, CheckToken], read);
router.get('/:uniq', read);

// Update
router.put('/:uniq', CheckToken, update);

module.exports = router;
