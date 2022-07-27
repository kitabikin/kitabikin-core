const { Ok, ErrorHandler } = require('@/helpers/response');
const RoleModel = require('@/models/sso/role.model');

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
  const idApplication = req.body.id_application;
  const code = req.body.code;
  const name = req.body.name;
  const description = req.body.description;
  const isActive = req.body.is_active;
  const isDelete = req.body.is_delete;
  const modifiedId = req.decoded.id_user;
  const modifiedAt = moment().format('YYYY-MM-DD HH:mm:ss.SSS');

  const update = {
    id_role: pUniq,
    id_application: idApplication,
    code,
    name,
    description,
    is_active: isActive,
    is_delete: isDelete,
    modified_id: modifiedId,
    modified_at: modifiedAt,
  };

  const qUpdate = await RoleModel.query()
    .first()
    .returning('*')
    .withGraphFetched('application')
    .upsertGraph(update);

  return qUpdate;
}

module.exports = {
  update,
  getUpdate,
};
