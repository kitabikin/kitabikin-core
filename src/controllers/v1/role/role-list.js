const { OkList, ErrorNotFound, ErrorHandler } = require('@core/helpers/response');
const { Filter } = require('@core/helpers/filter');
const { Pagination } = require('@core/helpers/pagination');
const RoleModel = require('@core/models/sso/role.model');

const { getTotal } = require('./role-total');

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
      f.orderBy('sso.role.modified_at', 'desc');
      return;
    }

    const s = sort.split(':');

    switch (s[0]) {
      case 'application':
        f.orderBy('sso.role.modified_at', 'desc');
        f.orderBy('application.name', s[1]);
        break;
      default:
        f.orderBy(`sso.role.${s[0]}`, s[1]);
        break;
    }
  };

  const fQuery = (f) => {
    if (!_.isNil(query)) {
      f.where('sso.role.name', 'ilike', '%' + query + '%');
    }
  };

  const fWhere = (f) => {
    if (!_.isNil(where)) {
      Filter(f, 'sso.role', where);
    }
  };

  const qList = await RoleModel.query()
    .withGraphJoined('application')
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
