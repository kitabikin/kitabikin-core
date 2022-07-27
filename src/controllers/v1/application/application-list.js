const { OkList, ErrorNotFound, ErrorHandler } = require('@/helpers/response');
const { Filter } = require('@/helpers/filter');
const { Pagination } = require('@/helpers/pagination');
const ApplicationModel = require('@/models/sso/application.model');

const { getTotal } = require('./application-total');

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
    if (_.isNil(sort) === false) {
      const s = sort.split(':');
      f.orderBy(`sso.application.${s[0]}`, s[1]);
    } else {
      f.orderBy('sso.application.modified_at', 'desc');
    }
  };

  const fQuery = (f) => {
    if (_.isNil(query) === false) {
      f.where('sso.application.name', 'ilike', '%' + query + '%');
    }
  };

  const fWhere = (f) => {
    if (!_.isNil(where)) {
      Filter(f, 'sso.application', where);
    }
  };

  const qList = await ApplicationModel.query()
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
