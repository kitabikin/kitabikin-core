const { Ok, ErrorHandler } = require('@core/helpers/response');
const RoleModel = require('@core/models/sso/role.model');

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
  const idApplication = req.body.id_application;
  const code = req.body.code;
  const name = req.body.name;
  const description = req.body.description;
  const createdId = req.decoded.id_user;

  const insert = {
    id_application: idApplication,
    code,
    name,
    description,
    created_id: createdId,
  };

  const qInsert = await RoleModel.query()
    .first()
    .returning('*')
    .withGraphFetched('application')
    .insertGraph(insert);

  return qInsert;
}

module.exports = {
  create,
  getCreate,
};
