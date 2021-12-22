const { Ok, ErrorHandler } = require('@core/helpers/response');
const InvitationFeatureDataModel = require('@core/models/invitation/invitation-feature-data.model');

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

  const update = req.body;

  _.assign(update, {
    id_invitation_feature_data: pUniq,
  });

  const qUpdate = await InvitationFeatureDataModel.query().first().upsertGraph(update);

  return qUpdate;
}

module.exports = {
  update,
  getUpdate,
};
