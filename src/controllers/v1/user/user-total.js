const { Ok, ErrorNotFound, ErrorHandler } = require('@core/helpers/response');
const { Filter } = require('@core/helpers/filter');
const UserModel = require('@core/models/sso/user.model');

const _ = require('lodash');

const total = async (req, res) => {
  try {
    const qTotal = await getTotal(req);

    if (qTotal.count > 0) {
      return Ok(qTotal, 'Retrieve data successfully.', res);
    } else {
      return ErrorNotFound('Data not found.', res);
    }
  } catch (err) {
    return ErrorHandler(err, res);
  }
};

async function getTotal(req) {
  const query = req.query.search;
  const where = req.query.where;

  const fQuery = (f) => {
    if (_.isNil(query) === false) {
      f.where('profile.name', 'ilike', '%' + query + '%');
      f.groupBy('sso.user.id_user');
      f.groupBy('profile.id_profile');
      f.withGraphJoined('profile');
    }
  };

  const fWhere = (f) => {
    if (!_.isNil(where)) {
      Filter(f, 'sso.user', where);
    }
  };

  const qTotal = await UserModel.query()
    .first()
    .count({ count: 'sso.user.id_user' })
    .modify(fQuery)
    .modify(fWhere);

  return qTotal;
}

module.exports = {
  total,
  getTotal,
};
