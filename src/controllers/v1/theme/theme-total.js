const { Ok, ErrorNotFound, ErrorHandler } = require('@core/helpers/response');
const ThemeModel = require('@core/models/invitation/theme.model');

const { Relation } = require('./theme-populate');
const { Filter } = require('./theme-filter');

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
      f.where('invitation.theme.name', 'ilike', '%' + query + '%');
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

  const qTotal = await ThemeModel.query()
    .first()
    .count({ count: 'invitation.theme.id_theme' })
    .modify(fQuery)
    .modify(fWhere)
    .modify(fWith);

  return qTotal;
}

module.exports = {
  total,
  getTotal,
};
