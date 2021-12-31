const jwt = require('jsonwebtoken');
const _ = require('lodash');

const CheckAccess = (req, res, next) => {
  if (_.isNil(req.headers.authorization)) {
    req.access = 'public';
    next('route');
  } else {
    req.access = 'private';
    next();
  }
};

const CheckToken = (req, res, next) => {
  if (_.isNil(req.headers.authorization)) {
    res.status(403).json({
      code: 403,
      error: 1,
      message: 'Token missing',
      data: {},
    });
  }

  let token = req.headers.authorization;
  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(403).json({
          code: 403,
          error: 1,
          message: 'Token invalid',
          data: {},
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.status(403).json({
      code: 403,
      error: 1,
      message: 'Auth token is not supplied',
      data: {},
    });
  }
};

module.exports = {
  CheckAccess,
  CheckToken,
};
