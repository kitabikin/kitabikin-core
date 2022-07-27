const { Ok, ErrorHandler } = require('@/helpers/response');
const ThemeFeatureModel = require('@/models/invitation/theme-feature.model');

const _ = require('lodash');

const create = async (req, res) => {
  try {
    const qInsert = await getCreate(req);

    Promise.all([qInsert]).then(async (responses) => {
      const data = responses[0];
      return Ok(data, 'Successfully added data.', res);
    });
  } catch (err) {
    return ErrorHandler(err, res);
  }
};

async function getCreate(req) {
  const createdId = req.decoded.id_user;

  const insert = req.body;

  _.assign(insert, {
    created_id: createdId,
  });

  const qInsert = await ThemeFeatureModel.query().first().insertGraphAndFetch(insert);

  return qInsert;
}

module.exports = {
  create,
  getCreate,
};
