const express = require('express');

const { CheckToken } = require('@/helpers/middleware');

// const { total } = require('./invitation-feature-data-total');
// const { list } = require('./invitation-feature-data-list');
// const { create } = require('./invitation-feature-data-create');
// const { read } = require('./invitation-feature-data-read');
const { update } = require('./invitation-feature-data-update');

const router = express.Router();

// router.get('/total', CheckToken, total);
// router.get('/', CheckToken, list);
// router.post('/', CheckToken, create);
// router.get('/:uniq', CheckToken, read);
router.put('/:uniq', CheckToken, update);

module.exports = router;
