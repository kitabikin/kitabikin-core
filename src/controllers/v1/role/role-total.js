const { Ok, ErrorNotFound, ErrorHandler } = require('@core/helpers/response');
const { Filter } = require('@core/helpers/filter');
const RoleModel = require('@core/models/sso/role.model');

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
      f.where('sso.role.name', 'ilike', '%' + query + '%');
    }
  };

  const fWhere = (f) => {
    if (!_.isNil(where)) {
      Filter(f, 'sso.role', where);
    }
  };

  const qTotal = await RoleModel.query()
    .first()
    .count({ count: 'sso.role.id_role' })
    .modify(fQuery)
    .modify(fWhere);

  return qTotal;
}

module.exports = {
  total,
  getTotal,
};
