const _ = require('lodash');
const qs = require('qs');

const Populate = (f, populate) => {
  const qsPopulate = qs.parse(populate);

  if (_.isNil(qsPopulate[0])) {
    getPopulate(f, qsPopulate);
  } else {
    Object.keys(qsPopulate).map((index) => {
      getPopulate(f, qsPopulate[index]);
    });
  }
};

const getPopulate = (f, populate) => {
  Object.keys(populate).map((k) => {
    const key = k;
    const value = populate[k] === 'true';

    if (value) {
      switch (key) {
        case 'event_package':
          f.withGraphFetched('[event_package]');
          break;
        case 'event_price':
          f.withGraphFetched('[event_package.[event_price(orderByCreatedAt)]]');
          break;
        default:
          break;
      }
    }
  });
};

module.exports = {
  Populate,
};
