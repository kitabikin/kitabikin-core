const express = require('express');

const { CheckToken } = require('@core/helpers/middleware');

const { total } = require('./invitation-total');
const { list } = require('./invitation-list');
const { create } = require('./invitation-create');
const { read } = require('./invitation-read');
const { update } = require('./invitation-update');

const router = express.Router();

router.get('/total', CheckToken, total);
router.get('/', CheckToken, list);
router.post('/', CheckToken, create);
router.get('/:uniq', CheckToken, read);
router.put('/:uniq', CheckToken, update);

module.exports = router;
