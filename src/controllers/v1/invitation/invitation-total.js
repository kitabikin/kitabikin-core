const { Ok, ErrorNotFound, ErrorHandler } = require('@/helpers/response');
const InvitationModel = require('@/models/invitation/invitation.model');

const { Relation } = require('./invitation-populate');
const { Filter } = require('./invitation-filter');

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
  const populate = req.query.with;

  const fQuery = (f) => {
    if (_.isNil(query) === false) {
      f.where('invitation.invitation.name', 'ilike', '%' + query + '%');
    }
  };

  const fWhere = (f) => {
    if (!_.isNil(where)) {
      Filter(f, where);
    }
  };

  const fWith = (f) => {
    if (!_.isNil(populate)) {
      Relation(f, populate, true);
    }
  };

  const qTotal = await InvitationModel.query()
    .first()
    .count({ count: 'invitation.invitation.id_invitation' })
    .modify(fQuery)
    .modify(fWhere)
    .modify(fWith);

  return qTotal;
}

module.exports = {
  total,
  getTotal,
};
