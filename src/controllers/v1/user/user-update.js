const { Ok, ErrorHandler } = require('@core/helpers/response');
const UserModel = require('@core/models/sso/user.model');

const moment = require('moment');
const _ = require('lodash');
const SHA256 = require('crypto-js/sha256');

const update = async (req, res) => {
  try {
    const qUpdate = await getUpdate(req);

    Promise.all([qUpdate]).then(async (responses) => {
      const data = responses[0];
      return Ok(data, 'Successfully changed data.', res);
    });
  } catch (err) {
    return ErrorHandler(err, res);
  }
};

async function getUpdate(req) {
  const pUniq = req.params.uniq;
  const password = req.body.password;
  const modifiedId = req.decoded.id_user;
  const modifiedAt = moment().format('YYYY-MM-DD HH:mm:ss.SSS');

  const update = req.body;

  _.assign(update, {
    id_user: pUniq,
    password: SHA256(password).toString(),
    modified_id: modifiedId,
    modified_at: modifiedAt,
  });

  const qUpdate = await UserModel.query()
    .first()
    .withGraphJoined('profile')
    .withGraphJoined('role.[application]')
    .modify('defaultSelects')
    .upsertGraphAndFetch(update, { relate: true, unrelate: true });

  return qUpdate;
}

module.exports = {
  update,
  getUpdate,
};
