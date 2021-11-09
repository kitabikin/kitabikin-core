const { Ok, ErrorHandler } = require('@core/helpers/response');
const UserModel = require('@core/models/sso/user.model');

const _ = require('lodash');
const SHA256 = require('crypto-js/sha256');

const create = async (req, res) => {
  try {
    const qInsert = await getCreate(req);

    Promise.all([qInsert]).then(async (responses) => {
      const data = responses[0];
      return Ok(data, 'Successfully added data.', res);
    });
  } catch (err) {
    return ErrorHandler(err, res);
  }
};

async function getCreate(req) {
  const password = req.body.password;
  const createdId = req.decoded.id_user;

  const insert = req.body;

  _.assign(insert, {
    password: SHA256(password).toString(),
    created_id: createdId,
  });

  const qInsert = await UserModel.query()
    .first()
    .withGraphJoined('profile')
    .withGraphJoined('role.[application]')
    .modify('defaultSelects')
    .insertGraphAndFetch(insert, { relate: true });

  return qInsert;
}

module.exports = {
  create,
  getCreate,
};
