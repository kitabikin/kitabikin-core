const { Ok, ErrorHandler } = require('@/helpers/response');
const ThemeCategoryModel = require('@/models/invitation/theme-category.model');

const moment = require('moment');
const _ = require('lodash');

const update = async (req, res) => {
  try {
    const qUpdate = await getUpdate(req);

    Promise.all([qUpdate]).then(async (responses) => {
      const data = responses[0];
      return Ok(data, 'Successfully changed data.', res);
    });
  } catch (err) {
    return ErrorHandler(err, res);
  }
};

async function getUpdate(req) {
  const pUniq = req.params.uniq;
  const modifiedId = req.decoded.id_user;
  const modifiedAt = moment().format('YYYY-MM-DD HH:mm:ss.SSS');

  const update = req.body;

  _.assign(update, {
    id_theme_category: pUniq,
    modified_id: modifiedId,
    modified_at: modifiedAt,
  });

  const qUpdate = await ThemeCategoryModel.query().first().upsertGraphAndFetch(update);

  return qUpdate;
}

module.exports = {
  update,
  getUpdate,
};
