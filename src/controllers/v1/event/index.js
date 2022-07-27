const express = require('express');

const { CheckAccess, CheckToken } = require('@/helpers/middleware');

const { total } = require('./event-total');
const { list } = require('./event-list');
const { create } = require('./event-create');
const { read } = require('./event-read');
const { update } = require('./event-update');

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
