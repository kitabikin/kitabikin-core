const express = require('express');

const { CheckAccess, CheckToken } = require('@/helpers/middleware');

const { list } = require('./appearance-list');

const router = express.Router();

// List
router.get('/', [CheckAccess, CheckToken], list);
router.get('/', list);

module.exports = router;
