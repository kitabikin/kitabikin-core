const { Ok, ErrorNotFound, ErrorHandler } = require('@core/helpers/response');
const InvitationGuestBookModel = require('@core/models/invitation/invitation-guest-book.model');

const { Relation } = require('./invitation-guest-book-populate');
const { Filter } = require('./invitation-guest-book-filter');

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
      f.where('invitation.invitation_guest_book.name', 'ilike', '%' + query + '%');
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

  const qTotal = await InvitationGuestBookModel.query()
    .first()
    .count({ count: 'invitation.invitation_guest_book.id_invitation_guest_book' })
    .modify(fQuery)
    .modify(fWhere)
    .modify(fWith);

  return qTotal;
}

module.exports = {
  total,
  getTotal,
};
