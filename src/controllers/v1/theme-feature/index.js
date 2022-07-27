const express = require('express');

const { CheckToken } = require('@/helpers/middleware');

const { total } = require('./theme-feature-total');
const { list } = require('./theme-feature-list');
const { create } = require('./theme-feature-create');
const { read } = require('./theme-feature-read');
const { update } = require('./theme-feature-update');

const router = express.Router();

router.get('/total', CheckToken, total);
router.get('/', CheckToken, list);
router.post('/', CheckToken, create);
router.get('/:uniq', CheckToken, read);
router.put('/:uniq', CheckToken, update);

module.exports = router;
