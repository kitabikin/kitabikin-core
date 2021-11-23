const { Ok, ErrorNotFound, ErrorHandler } = require('@core/helpers/response');
const InvitationFeatureModel = require('@core/models/invitation/invitation-feature.model');

const { Relation } = require('./invitation-feature-populate');
const { Filter } = require('./invitation-feature-filter');

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
  const where = req.query.where;
  const populate = req.query.with;

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

  const qTotal = await InvitationFeatureModel.query()
    .first()
    .count({ count: 'invitation.invitation_feature.id_invitation_feature' })
    .modify(fWhere)
    .modify(fWith);

  return qTotal;
}

module.exports = {
  total,
  getTotal,
};
