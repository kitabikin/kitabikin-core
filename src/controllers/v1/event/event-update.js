const { Ok, ErrorHandler } = require('@core/helpers/response');
const EventModel = require('@core/models/event/event.model');

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
    id_event: pUniq,
    modified_id: modifiedId,
    modified_at: modifiedAt,
  });

  const qUpdate = await EventModel.query().first().upsertGraphAndFetch(update);

  return qUpdate;
}

module.exports = {
  update,
  getUpdate,
};
