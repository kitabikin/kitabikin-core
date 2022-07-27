const express = require('express');

const { CheckToken } = require('@/helpers/middleware');

const { total } = require('./application-total');
const { list } = require('./application-list');
const { create } = require('./application-create');
const { read } = require('./application-read');
const { update } = require('./application-update');

const router = express.Router();

router.get('/total', CheckToken, total);
router.get('/', CheckToken, list);
router.post('/', CheckToken, create);
router.get('/:uniq', CheckToken, read);
router.put('/:uniq', CheckToken, update);

module.exports = router;
