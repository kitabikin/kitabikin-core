const express = require('express');

const { CheckToken } = require('@core/helpers/middleware');

const { total } = require('./theme-total');
const { list } = require('./theme-list');
const { create } = require('./theme-create');
const { read } = require('./theme-read');
const { update } = require('./theme-update');

const router = express.Router();

router.get('/total', CheckToken, total);
router.get('/', CheckToken, list);
router.post('/', CheckToken, create);
router.get('/:uniq', CheckToken, read);
router.put('/:uniq', CheckToken, update);

module.exports = router;
