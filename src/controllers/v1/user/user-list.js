const { OkList, ErrorNotFound, ErrorHandler } = require('@/helpers/response');
const { Pagination } = require('@/helpers/pagination');
const UserModel = require('@/models/sso/user.model');

const { getTotal } = require('./user-total');
const { Populate } = require('./user-populate');
const { Sort } = require('./user-sort');
const { Filter } = require('./user-filter');

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
  const query = req.query.search;
  const where = req.query.where;
  const populate = req.query.with;

  const fStart = (f) => {
    if (!_.isNil(start)) {
      f.offset(start);
    }
  };

  const fLimit = (f) => {
    if (!_.isNil(limit)) {
      f.limit(limit);
    }
  };

  const fSort = (f) => {
    if (_.isNil(sort)) {
      f.orderBy('sso.user.modified_at', 'desc');
      return;
    }

    Sort(f, sort);
  };

  const fQuery = (f) => {
    if (!_.isNil(query)) {
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
      Populate(f, populate);
    }
  };

  const qList = await UserModel.query()
    .modify('defaultSelects')
    .modify(fStart)
    .modify(fLimit)
    .modify(fSort)
    .modify(fQuery)
    .modify(fWhere)
    .modify(fWith);

  return qList;
}

module.exports = {
  list,
  getList,
};
