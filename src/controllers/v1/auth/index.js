const express = require('express');

const { login } = require('./auth-login');

const router = express.Router();

router.post('/login', login);

module.exports = router;
