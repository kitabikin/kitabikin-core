const { OkList, ErrorNotFound, ErrorHandler } = require('@core/helpers/response');
const { Filter } = require('@core/helpers/filter');
const { Pagination } = require('@core/helpers/pagination');
const UserModel = require('@core/models/sso/user.model');

const { getTotal } = require('./user-total');

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

    const s = sort.split(':');

    switch (s[0]) {
      case 'profile':
        f.orderBy('profile.name', s[1]);
        f.orderBy('sso.user.modified_at', 'desc');
        break;
      default:
        f.orderBy(`sso.user.${s[0]}`, s[1]);
        break;
    }
  };

  const fQuery = (f) => {
    if (!_.isNil(query)) {
      f.where('profile.name', 'ilike', '%' + query + '%');
    }
  };

  const fWhere = (f) => {
    if (!_.isNil(where)) {
      Filter(f, 'sso.user', where);
    }
  };

  const qList = await UserModel.query()
    .withGraphJoined('profile')
    .withGraphJoined('role.[application]')
    .modify('defaultSelects')
    .modify(fStart)
    .modify(fLimit)
    .modify(fSort)
    .modify(fQuery)
    .modify(fWhere);

  return qList;
}

module.exports = {
  list,
  getList,
};
