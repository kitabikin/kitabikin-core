const { Ok, ErrorHandler } = require('@core/helpers/response');
const ApplicationModel = require('@core/models/sso/application.model');

const moment = require('moment');

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
  const code = req.body.code;
  const name = req.body.name;
  const description = req.body.description;
  const isActive = req.body.is_active;
  const isDelete = req.body.is_delete;
  const modifiedId = req.decoded.id_user;
  const modifiedAt = moment().format('YYYY-MM-DD HH:mm:ss.SSS');

  const update = {
    id_application: pUniq,
    code,
    name,
    description,
    is_active: isActive,
    is_delete: isDelete,
    modified_id: modifiedId,
    modified_at: modifiedAt,
  };

  const qUpdate = await ApplicationModel.query().first().returning('*').upsertGraph(update);

  return qUpdate;
}

module.exports = {
  update,
  getUpdate,
};
