const { OkList, ErrorNotFound, ErrorHandler } = require('@/helpers/response');
const { Pagination } = require('@/helpers/pagination');
const InvitationFeatureModel = require('@/models/invitation/invitation-feature.model');

const { getTotal } = require('./invitation-feature-total');
const { Populate } = require('./invitation-feature-populate');
const { Sort } = require('./invitation-feature-sort');
const { Filter } = require('./invitation-feature-filter');

const _ = require('lodash');

const list = async (req, res) => {
  try {
    const start = req.query.start;
    const limit = req.query.limit;
    const isPagination = !(_.isNil(start) && _.isNil(limit));

    const qList = await getList(req);
    const query = [];
    query.push(qList);

    if (isPagination) {
      const qTotal = await getTotal(req);
      query.push(qTotal);
    }

    Promise.all(query).then(async (responses) => {
      const data = responses[0];

      let paging = {};
      if (isPagination) {
        const total = responses[1].count;
        paging = Pagination(total, start, limit);
      }

      if (data.length > 0) {
        return OkList(data, paging, 'Retrieve data successfully.', res);
      } else {
        return ErrorNotFound('Data not found.', res);
      }
    });
  } catch (err) {
    return ErrorHandler(err, res);
  }
};

async function getList(req) {
  const start = req.query.start;
  const limit = req.query.limit;
  const sort = req.query.sort;
  const where = req.query.where;
  const populate = req.query.with;

  const fStart = (f) => {
    if (_.isNil(start) === false) {
      f.offset(start);
    }
  };

  const fLimit = (f) => {
    if (_.isNil(limit) === false) {
      f.limit(limit);
    }
  };

  const fSort = (f) => {
    if (_.isNil(sort)) {
      f.orderBy('invitation.invitation_feature.id_invitation_feature', 'desc');
      return;
    }

    Sort(f, sort);
  };

  const fWhere = (f) => {
    if (!_.isNil(where)) {
      Filter(f, where);
    }
  };

  const fWith = (f) => {
    if (!_.isNil(populate)) {
      Populate(f, populate);
    }
  };

  const qList = await InvitationFeatureModel.query()
    .modify(fStart)
    .modify(fLimit)
    .modify(fSort)
    .modify(fWhere)
    .modify(fWith);

  return qList;
}

module.exports = {
  list,
  getList,
};
