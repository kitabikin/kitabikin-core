const { Ok, ErrorHandler } = require('@/helpers/response');
const InvitationGreetingModel = require('@/models/invitation/invitation-greeting.model');

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
  const insert = req.body;

  const qInsert = await InvitationGreetingModel.query().first().insertGraphAndFetch(insert);

  return qInsert;
}

module.exports = {
  create,
  getCreate,
};
