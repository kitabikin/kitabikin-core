const express = require('express');

const { CheckToken } = require('@core/helpers/middleware');

const { total } = require('./theme-category-total');
const { list } = require('./theme-category-list');
const { create } = require('./theme-category-create');
const { read } = require('./theme-category-read');
const { update } = require('./theme-category-update');

const router = express.Router();

router.get('/total', CheckToken, total);
router.get('/', CheckToken, list);
router.post('/', CheckToken, create);
router.get('/:uniq', CheckToken, read);
router.put('/:uniq', CheckToken, update);

module.exports = router;
