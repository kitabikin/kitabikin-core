const { Ok, ErrorNotFound, ErrorHandler } = require('@/helpers/response');
const { Filter } = require('@/helpers/filter');
const UserModel = require('@/models/sso/user.model');

const _ = require('lodash');

const read = async (req, res) => {
  try {
    const qRead = await getRead(req);

    Promise.all([qRead]).then(async (responses) => {
      const data = responses[0];

      if (_.isEmpty(data) === false) {
        return Ok(data, 'Retrieve data successfully.', res);
      } else {
        return ErrorNotFound('Data not found.', res);
      }
    });
  } catch (err) {
    return ErrorHandler(err, res);
  }
};

async function getRead(req) {
  const pUniq = req.params.uniq;
  const where = req.query.where;

  const fWhere = (f) => {
    if (!_.isNil(where)) {
      Filter(f, 'sso.user', where);
    }
  };

  const qRead = await UserModel.query()
    .first()
    .returning('*')
    .withGraphJoined('profile')
    .withGraphJoined('role.[application]')
    .modify('defaultSelects')
    .findById(pUniq)
    .modify(fWhere);

  return qRead;
}

module.exports = {
  read,
  getRead,
};
