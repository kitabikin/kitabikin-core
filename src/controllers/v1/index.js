const express = require('express');

const auth = require('./auth');
const application = require('./application');

const router = express.Router();

router.use('/auth', auth);
router.use('/application', application);

module.exports = router;
