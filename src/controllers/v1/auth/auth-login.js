const { Ok, ErrorNotFound, ErrorHandler } = require('@/helpers/response');
const UserModel = require('@/models/sso/user.model');

const _ = require('lodash');
const jwt = require('jsonwebtoken');
const SHA256 = require('crypto-js/sha256');

const login = async (req, res) => {
  try {
    const qLogin = await getLogin(req);

    Promise.all([qLogin]).then(async (responses) => {
      const result = responses[0];
      const data = result[0];

      if (result.length > 0) {
        const token = await createToken(data);
        _.set(data, 'token', token);

        return Ok(data, 'Login was successful.', res);
      } else {
        return ErrorNotFound('Login failed.', res);
      }
    });
  } catch (err) {
    return ErrorHandler(err, res);
  }
};

async function getLogin(req) {
  const username = req.body.username;
  const password = req.body.password;
  const application = req.body.application;

  const qLogin = await UserModel.query()
    .modify('loginSelects')
    .withGraphFetched(
      `[
        profile(loginSelects),
        role(loginSelects)
      ]`
    )
    .where({
      'sso.user.is_delete': false,
      'sso.user.is_active': true,
      'sso.user.username': username,
      'sso.user.password': SHA256(password).toString(),
    })
    .modifyGraph('role', (builder) => {
      builder.withGraphJoined('application(loginSelects)').where({ 'application.code': application });
    });

  return qLogin;
}

async function createToken(data) {
  const bodyJWT = {
    id_application: data.role[0].application.id_application,
    id_role: data.role[0].id_role_alias,
    role: data.role[0].code,
    id_user: data.id_user,
    username: data.username,
  };

  const token = jwt.sign(bodyJWT, process.env.JWT_SECRET_KEY, {
    algorithm: process.env.JWT_ALGORITHM,
    expiresIn: 86400,
  });

  return token;
}

module.exports = {
  login,
  getLogin,
};
