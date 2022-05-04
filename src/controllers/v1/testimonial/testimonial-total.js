const { Ok, ErrorNotFound, ErrorHandler } = require('@core/helpers/response');
const UserModel = require('@core/models/invitation/testimonial.model');

const { Relation } = require('./testimonial-populate');
const { Filter } = require('./testimonial-filter');

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
      f.where('profile.name', 'ilike', '%' + query + '%');
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

  const qTotal = await UserModel.query()
    .first()
    .count({ count: 'invitation.testimonial.id_testimonial' })
    .modify(fQuery)
    .modify(fWhere)
    .modify(fWith);

  return qTotal;
}

module.exports = {
  total,
  getTotal,
};
