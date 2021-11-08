const express = require('express');

const { CheckToken } = require('@core/helpers/middleware');

const { total } = require('./role-total');
const { list } = require('./role-list');
const { create } = require('./role-create');
const { read } = require('./role-read');
// const { update } = require('./role-update');

const router = express.Router();

router.get('/total', CheckToken, total);
router.get('/', CheckToken, list);
router.post('/', CheckToken, create);
router.get('/:uniq', CheckToken, read);
// router.put('/:uniq', CheckToken, update);

module.exports = router;
