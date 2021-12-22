const _ = require('lodash');
const qs = require('qs');

const Filter = (f, schema, where) => {
  const qsWhere = qs.parse(where);

  if (_.isNil(qsWhere[0])) {
    getFilter(f, schema, qsWhere);
  } else {
    Object.keys(qsWhere).map((index) => {
      getFilter(f, schema, qsWhere[index]);
    });
  }
};

const getFilter = (f, schema, where) => {
  Object.keys(where).map((k) => {
    const split = k.split('__');
    const key = split[0];

    const value = where[k];
    const isArray = _.isArray(value);

    if (_.isNil(split[1]) || split[1] === 'eq') {
      if (isArray) {
        f.whereIn(`${schema}.${key}`, value);
      } else {
        f.where(`${schema}.${key}`, value);
      }
    } else if (split[1] === 'ne') {
      if (isArray) {
        f.whereNotIn(`${schema}.${key}`, value);
      } else {
        f.whereNot(`${schema}.${key}`, value);
      }
    } else if (split[1] === 'lt') {
      f.where(`${schema}.${key}`, '<', value);
    } else if (split[1] === 'gt') {
      f.where(`${schema}.${key}`, '>', value);
    } else if (split[1] === 'lte') {
      f.where(`${schema}.${key}`, '<=', value);
    } else if (split[1] === 'gte') {
      f.where(`${schema}.${key}`, '>=', value);
    } else if (split[1] === 'contains') {
      f.where(`${schema}.${key}`, 'ilike', '%' + value + '%');
    } else if (split[1] === 'ncontains') {
      f.where(`${schema}.${key}`, 'not ilike', '%' + value + '%');
    } else if (split[1] === 'containss') {
      f.where(`${schema}.${key}`, 'like', '%' + value + '%');
    } else if (split[1] === 'ncontainss') {
      f.where(`${schema}.${key}`, 'not like', '%' + value + '%');
    } else if (split[1] === 'null') {
      const isNull = value === 'true';
      if (isNull) {
        f.whereNull(`${schema}.${key}`);
      } else {
        f.whereNotNull(`${schema}.${key}`);
      }
    }
  });
};

module.exports = {
  Filter,
  getFilter,
};
