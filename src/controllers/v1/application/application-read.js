const { Ok, ErrorNotFound, ErrorHandler } = require('@core/helpers/response');
const { Filter } = require('@core/helpers/filter');
const ApplicationModel = require('@core/models/sso/application.model');

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
      Filter(f, 'sso.application', where);
    }
  };

  const qRead = await ApplicationModel.query().first().returning('*').findById(pUniq).modify(fWhere);

  return qRead;
}

module.exports = {
  read,
  getRead,
};
