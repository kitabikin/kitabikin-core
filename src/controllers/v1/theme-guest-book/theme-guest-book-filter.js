const _ = require('lodash');
const qs = require('qs');

const { Filter: GlobalFilter } = require('@core/helpers/filter');

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
      default:
        GlobalFilter(f, 'invitation.theme_guest_book', where);
        break;
    }
  });
};

module.exports = {
  Filter,
};
