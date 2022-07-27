const _ = require('lodash');
const qs = require('qs');

const { Filter: GlobalFilter } = require('@/helpers/filter');

const Filter = (f, where) => {
  const qsWhere = qs.parse(where);

  if (_.isNil(qsWhere[0])) {
    getFilter(f, qsWhere);
  } else {
    Object.keys(qsWhere).map((index) => {
      getFilter(f, qsWhere[index]);
    });
  }
};

const getFilter = (f, where) => {
  Object.keys(where).map((k) => {
    const firstSplit = k.split(':');
    const table = firstSplit[0];
    const key = firstSplit[1];

    let newKey;
    if (key) {
      const split = key.split('__');
      newKey = split[0];
    } else {
      const split = table.split('__');
      newKey = split[0];
    }

    switch (table) {
      case 'theme':
        GlobalFilter(f, 'theme', { [newKey]: where[k] });
        break;
      case 'theme_category':
        GlobalFilter(f, 'theme:theme_category', { [newKey]: where[k] });
        break;
      case 'event':
        GlobalFilter(f, 'theme:theme_category:event', { [newKey]: where[k] });
        break;
      default:
        GlobalFilter(f, 'invitation.theme_feature', where);
        break;
    }
  });
};

module.exports = {
  Filter,
};
