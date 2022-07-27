const { Ok, ErrorNotFound, ErrorHandler } = require('@/helpers/response');
const ThemeModel = require('@/models/invitation/theme.model');

const _ = require('lodash');
const { Populate } = require('./theme-populate');
const { Filter } = require('./theme-filter');

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
  const access = req.access;
  const pUniq = req.params.uniq;
  const where = req.query.where;
  const populate = req.query.with;

  const fWhere = (f) => {
    if (!_.isNil(where)) {
      Filter(f, where);
    }
  };

  const fWith = (f) => {
    if (!_.isNil(populate)) {
      Populate(f, populate, access);
    }
  };

  let qRead;
  if (access === 'private') {
    qRead = await ThemeModel.query().first().findById(pUniq).modify(fWhere).modify(fWith);
  } else {
    qRead = await ThemeModel.query()
      .first()
      .modify('publicSelects')
      .modify('filterCode', pUniq)
      .modify(fWhere)
      .modify(fWith);
  }

  return qRead;
}

module.exports = {
  read,
  getRead,
};
