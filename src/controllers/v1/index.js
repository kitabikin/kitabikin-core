const express = require('express');

const auth = require('./auth');
const upload = require('./upload');
const application = require('./application');
const role = require('./role');
const user = require('./user');
const event = require('./event');
const eventPackage = require('./event-package');
const themeCategory = require('./theme-category');
const theme = require('./theme');
const themeFeature = require('./theme-feature');
const themeGreeting = require('./theme-greeting');
const themeGuestBook = require('./theme-guest-book');
const invitation = require('./invitation');
const invitationFeature = require('./invitation-feature');
const invitationFeatureData = require('./invitation-feature-data');
const invitationGreeting = require('./invitation-greeting');
const invitationGuestBook = require('./invitation-guest-book');
const invitationGuestTemplateBook = require('./invitation-guest-book-template');
const Testimonial = require('./testimonial');

const router = express.Router();

router.use('/auth', auth);
router.use('/upload', upload);
router.use('/application', application);
router.use('/role', role);
router.use('/user', user);
router.use('/event', event);
router.use('/event-package', eventPackage);
router.use('/theme-category', themeCategory);
router.use('/theme', theme);
router.use('/theme-feature', themeFeature);
router.use('/theme-greeting', themeGreeting);
router.use('/theme-guest-book', themeGuestBook);
router.use('/invitation', invitation);
router.use('/invitation-feature', invitationFeature);
router.use('/invitation-feature-data', invitationFeatureData);
router.use('/invitation-greeting', invitationGreeting);
router.use('/invitation-guest-book', invitationGuestBook);
router.use('/invitation-guest-book-template', invitationGuestTemplateBook);
router.use('/testimonial', Testimonial);

module.exports = router;
