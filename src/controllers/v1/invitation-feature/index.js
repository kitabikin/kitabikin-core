const express = require('express');

const { CheckToken } = require('@/helpers/middleware');

const { total } = require('./invitation-feature-total');
const { list } = require('./invitation-feature-list');
// const { create } = require('./invitation-feature-create');
// const { read } = require('./invitation-feature-read');
const { update } = require('./invitation-feature-update');

const router = express.Router();

router.get('/total', CheckToken, total);
router.get('/', CheckToken, list);
// router.post('/', CheckToken, create);
// router.get('/:uniq', CheckToken, read);
router.put('/:uniq', CheckToken, update);

module.exports = router;
