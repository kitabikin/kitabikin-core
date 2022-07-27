const { Ok, ErrorNotFound, ErrorHandler } = require('@/helpers/response');
const { Filter } = require('@/helpers/filter');
const ThemeCategoryModel = require('@/models/invitation/theme-category.model');

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
      f.where('invitation.theme_category.name', 'ilike', '%' + query + '%');
    }
  };

  const fWhere = (f) => {
    if (!_.isNil(where)) {
      Filter(f, 'invitation.theme_category', where);
    }
  };

  const qTotal = await ThemeCategoryModel.query()
    .first()
    .count({ count: 'invitation.theme_category.id_theme_category' })
    .modify(fQuery)
    .modify(fWhere);

  return qTotal;
}

module.exports = {
  total,
  getTotal,
};
