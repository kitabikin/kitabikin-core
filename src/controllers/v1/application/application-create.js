const { Ok, ErrorHandler } = require('@/helpers/response');
const ApplicationModel = require('@/models/sso/application.model');

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
  const code = req.body.code;
  const name = req.body.name;
  const description = req.body.description;
  const isActive = req.body.is_active;
  const createdId = req.decoded.id_user;

  const insert = {
    code,
    name,
    description,
    is_active: isActive,
    created_id: createdId,
  };

  const qInsert = await ApplicationModel.query().first().returning('*').insertGraph(insert);

  return qInsert;
}

module.exports = {
  create,
  getCreate,
};
