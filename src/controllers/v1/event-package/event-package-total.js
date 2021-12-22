const { Ok, ErrorNotFound, ErrorHandler } = require('@core/helpers/response');
const { Filter } = require('@core/helpers/filter');
const EventPackageModel = require('@core/models/invitation/event-package.model');

const _ = require('lodash');

const total = async (req, res) => {
  try {
    const qTotal = await getTotal(req);

    if (qTotal.count > 0) {
      return Ok(qTotal, 'Retrieve data successfully.', res);
    } else {
      return ErrorNotFound('Data not found.', res);
    }
  } catch (err) {
    return ErrorHandler(err, res);
  }
};

async function getTotal(req) {
  const query = req.query.search;
  const where = req.query.where;

  const fQuery = (f) => {
    if (_.isNil(query) === false) {
      f.where('invitation.event_package.name', 'ilike', '%' + query + '%');
    }
  };

  const fWhere = (f) => {
    if (!_.isNil(where)) {
      Filter(f, 'invitation.event_package', where);
    }
  };

  const qTotal = await EventPackageModel.query()
    .first()
    .count({ count: 'invitation.event_package.id_event_package' })
    .modify(fQuery)
    .modify(fWhere);

  return qTotal;
}

module.exports = {
  total,
  getTotal,
};
