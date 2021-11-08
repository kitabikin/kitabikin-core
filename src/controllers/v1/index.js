const express = require('express');

const auth = require('./auth');
const application = require('./application');
const role = require('./role');

const router = express.Router();

router.use('/auth', auth);
router.use('/application', application);
router.use('/role', role);

module.exports = router;
