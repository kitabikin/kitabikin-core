const { Ok, ErrorHandler } = require('@core/helpers/response');
const ThemeGreetingModel = require('@core/models/invitation/theme-greeting.model');

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

  const qInsert = await ThemeGreetingModel.query().first().insertGraphAndFetch(insert);

  return qInsert;
}

module.exports = {
  create,
  getCreate,
};
