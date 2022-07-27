const { Ok, ErrorNotFound, ErrorHandler } = require('@/helpers/response');
const UserModel = require('@/models/sso/user.model');

const { Relation } = require('./user-populate');
const { Filter } = require('./user-filter');

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
  const populate = req.query.with;

  const fQuery = (f) => {
    if (_.isNil(query) === false) {
      f.where('profile.name', 'ilike', '%' + query + '%');
    }
  };

  const fWhere = (f) => {
    if (!_.isNil(where)) {
      Filter(f, where);
    }
  };

  const fWith = (f) => {
    if (!_.isNil(populate)) {
      Relation(f, populate, true);
    }
  };

  const qTotal = await UserModel.query()
    .first()
    .count({ count: 'sso.user.id_user' })
    .modify(fQuery)
    .modify(fWhere)
    .modify(fWith);

  return qTotal;
}

module.exports = {
  total,
  getTotal,
};
