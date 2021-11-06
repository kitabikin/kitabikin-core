const { Ok, ErrorNotFound, ErrorHandler } = require('@core/helpers/response');
const { Filter } = require('@core/helpers/filter');
const ApplicationModel = require('@core/models/sso/application.model');

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
      f.where('sso.application.name', 'ilike', '%' + query + '%');
    }
  };

  const fWhere = (f) => {
    if (!_.isNil(where)) {
      Filter(f, 'sso.application', where);
    }
  };

  const qTotal = await ApplicationModel.query()
    .first()
    .count({ count: 'sso.application.id_application' })
    .modify(fQuery)
    .modify(fWhere);

  return qTotal;
}

module.exports = {
  total,
  getTotal,
};
