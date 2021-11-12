const express = require('express');

const { CheckToken } = require('@core/helpers/middleware');

const { total } = require('./event-total');
const { list } = require('./event-list');
const { create } = require('./event-create');
const { read } = require('./event-read');
const { update } = require('./event-update');

const router = express.Router();

router.get('/total', CheckToken, total);
router.get('/', CheckToken, list);
router.post('/', CheckToken, create);
router.get('/:uniq', CheckToken, read);
router.put('/:uniq', CheckToken, update);

module.exports = router;
