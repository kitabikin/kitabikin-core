const express = require('express');

const auth = require('./auth');
const application = require('./application');
const role = require('./role');
const user = require('./user');

const router = express.Router();

router.use('/auth', auth);
router.use('/application', application);
router.use('/role', role);
router.use('/user', user);

module.exports = router;
