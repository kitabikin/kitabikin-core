const express = require('express');

const { CheckAccess, CheckToken } = require('@/helpers/middleware');

const { total } = require('./invitation-total');
const { list } = require('./invitation-list');
const { create } = require('./invitation-create');
const { read } = require('./invitation-read');
const { update } = require('./invitation-update');

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

router.put('/:uniq', CheckToken, update);

module.exports = router;
