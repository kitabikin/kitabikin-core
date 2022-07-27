const express = require('express');

const { CheckToken } = require('@/helpers/middleware');

const { total } = require('./user-total');
const { list } = require('./user-list');
const { create } = require('./user-create');
const { read } = require('./user-read');
const { update } = require('./user-update');

const router = express.Router();

router.get('/total', CheckToken, total);
router.get('/', CheckToken, list);
router.post('/', CheckToken, create);
router.get('/:uniq', CheckToken, read);
router.put('/:uniq', CheckToken, update);

module.exports = router;
