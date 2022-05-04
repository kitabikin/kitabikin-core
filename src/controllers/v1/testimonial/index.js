const express = require('express');

const { CheckAccess, CheckToken } = require('@core/helpers/middleware');

const { total } = require('./testimonial-total');
const { list } = require('./testimonial-list');
const { create } = require('./testimonial-create');
const { read } = require('./testimonial-read');
const { update } = require('./testimonial-update');

const router = express.Router();

// Total
router.get('/total', CheckToken, total);

// List
router.get('/', [CheckAccess, CheckToken], list);
router.get('/', list);

// Create
router.post('/', create);

// Read
router.get('/:uniq', CheckToken, read);

// Update
router.put('/:uniq', CheckToken, update);

module.exports = router;
