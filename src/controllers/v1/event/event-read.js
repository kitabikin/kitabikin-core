const { Ok, ErrorNotFound, ErrorHandler } = require('@core/helpers/response');
const { Filter } = require('@core/helpers/filter');
const EventModel = require('@core/models/invitation/event.model');

const _ = require('lodash');

const read = async (req, res) => {
  try {
    const qRead = await getRead(req);

    Promise.all([qRead]).then(async (responses) => {
      const data = responses[0];

      if (_.isEmpty(data) === false) {
        return Ok(data, 'Retrieve data successfully.', res);
      } else {
        return ErrorNotFound('Data not found.', res);
      }
    });
  } catch (err) {
    return ErrorHandler(err, res);
  }
};

async function getRead(req) {
  const pUniq = req.params.uniq;
  const where = req.query.where;

  const fWhere = (f) => {
    if (!_.isNil(where)) {
      Filter(f, 'invitation.event', where);
    }
  };

  const qRead = await EventModel.query().first().returning('*').findById(pUniq).modify(fWhere);

  return qRead;
}

module.exports = {
  read,
  getRead,
};
