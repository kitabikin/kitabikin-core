const express = require('express');

const { CheckToken } = require('@/helpers/middleware');

const { total } = require('./event-package-total');
const { list } = require('./event-package-list');
const { create } = require('./event-package-create');
const { read } = require('./event-package-read');
const { update } = require('./event-package-update');

const router = express.Router();

router.get('/total', CheckToken, total);
router.get('/', CheckToken, list);
router.post('/', CheckToken, create);
router.get('/:uniq', CheckToken, read);
router.put('/:uniq', CheckToken, update);

module.exports = router;
