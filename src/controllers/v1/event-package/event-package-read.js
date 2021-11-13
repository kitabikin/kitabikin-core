const { Ok, ErrorNotFound, ErrorHandler } = require('@core/helpers/response');
const { Filter } = require('@core/helpers/filter');
const EventPackageModel = require('@core/models/invitation/event-package.model');

const _ = require('lodash');
const { Populate } = require('./event-package-populate');

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
  const populate = req.query.with;

  const fWhere = (f) => {
    if (!_.isNil(where)) {
      Filter(f, 'invitation.event', where);
    }
  };

  const fWith = (f) => {
    if (!_.isNil(populate)) {
      Populate(f, populate);
    }
  };

  const qRead = await EventPackageModel.query()
    .first()
    .withGraphFetched('event_price(orderByCreatedAt)')
    .findById(pUniq)
    .modify(fWhere)
    .modify(fWith);

  return qRead;
}

module.exports = {
  read,
  getRead,
};
