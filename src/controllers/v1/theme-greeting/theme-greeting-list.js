const { OkList, ErrorNotFound, ErrorHandler } = require('@core/helpers/response');
const { Pagination } = require('@core/helpers/pagination');
const ThemeGreetingModel = require('@core/models/invitation/theme-greeting.model');

const { getTotal } = require('./theme-greeting-total');
const { Populate } = require('./theme-greeting-populate');
const { Sort } = require('./theme-greeting-sort');
const { Filter } = require('./theme-greeting-filter');

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
  const access = req.access;
  const start = req.query.start;
  const limit = req.query.limit;
  const sort = req.query.sort;
  const query = req.query.search;
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
      f.orderBy('invitation.theme_greeting.modified_at', 'desc');
      return;
    }

    Sort(f, sort);
  };

  const fQuery = (f) => {
    if (_.isNil(query) === false) {
      f.where('invitation.theme_greeting.name', 'ilike', '%' + query + '%');
    }
  };

  const fWhere = (f) => {
    if (!_.isNil(where)) {
      Filter(f, where);
    }
  };

  const fWith = (f) => {
    if (!_.isNil(populate)) {
      Populate(f, populate, access);
    }
  };

  let qList;
  if (access === 'private') {
    qList = await ThemeGreetingModel.query()
      .modify(fStart)
      .modify(fLimit)
      .modify(fSort)
      .modify(fQuery)
      .modify(fWhere)
      .modify(fWith);
  } else {
    qList = await ThemeGreetingModel.query()
      .modify('publicSelects')
      .modify(fStart)
      .modify(fLimit)
      .modify(fSort)
      .modify(fQuery)
      .modify(fWhere)
      .modify(fWith);
  }

  return qList;
}

module.exports = {
  list,
  getList,
};
