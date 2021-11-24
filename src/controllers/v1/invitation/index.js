const express = require('express');
const _ = require('lodash');

const { CheckToken } = require('@core/helpers/middleware');

const { total } = require('./invitation-total');
const { list } = require('./invitation-list');
const { create } = require('./invitation-create');
const { read } = require('./invitation-read');
const { update } = require('./invitation-update');

const { list: listPublic } = require('./public/invitation-list');
const { read: readPublic } = require('./public/invitation-read');

const router = express.Router();

// Total
router.get('/total', CheckToken, total);

// List
router.get(
  '/',
  (req, res, next) => {
    if (_.isNil(req.headers.authorization)) {
      next('route');
    } else {
      next();
    }
  },
  list
);
router.get('/', listPublic);

// Create
router.post('/', CheckToken, create);

// Read
router.get(
  '/:uniq',
  (req, res, next) => {
    if (_.isNil(req.headers.authorization)) {
      next('route');
    } else {
      next();
    }
  },
  read
);
router.get('/:uniq', readPublic);

router.put('/:uniq', CheckToken, update);

module.exports = router;
