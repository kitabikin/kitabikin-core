const express = require('express');

const auth = require('./auth');
const application = require('./application');
const role = require('./role');
const user = require('./user');
const event = require('./event');
const eventPackage = require('./event-package');
const themeCategory = require('./theme-category');

const router = express.Router();

router.use('/auth', auth);
router.use('/application', application);
router.use('/role', role);
router.use('/user', user);
router.use('/event', event);
router.use('/event-package', eventPackage);
router.use('/theme-category', themeCategory);

module.exports = router;
