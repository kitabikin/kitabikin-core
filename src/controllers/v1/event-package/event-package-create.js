const { Ok, ErrorHandler } = require('@/helpers/response');
const EventPackageModel = require('@/models/invitation/event-package.model');

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

  _.assign(insert.event_price, {
    created_id: createdId,
  });

  const qInsert = await EventPackageModel.query()
    .first()
    .withGraphFetched('event_price(orderByCreatedAt)')
    .insertGraphAndFetch(insert);

  return qInsert;
}

module.exports = {
  create,
  getCreate,
};
