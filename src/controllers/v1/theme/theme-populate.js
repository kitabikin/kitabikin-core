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

const Relation = (f, populate) => {
  const qsPopulate = qs.parse(populate);

  if (_.isNil(qsPopulate[0])) {
    getPopulate(f, qsPopulate, true);
  } else {
    Object.keys(qsPopulate).map((index) => {
      getPopulate(f, qsPopulate[index], true);
    });
  }
};

const getPopulate = (f, populate, isTotal = false) => {
  Object.keys(populate).map((k) => {
    const key = k;
    const value = populate[k] === 'true';

    if (value) {
      switch (key) {
        case 'theme_category':
          if (isTotal) {
            f.leftJoin(
              'invitation.theme_category as theme_category',
              'theme_category.id_theme_category',
              'invitation.theme.id_theme_category'
            );
          } else {
            f.withGraphJoined('theme_category');
          }
          break;
        case 'event':
          if (isTotal) {
            f.leftJoin(
              'invitation.event as theme_category:event',
              'theme_category:event.id_event',
              'theme_category.id_event'
            );
          } else {
            f.withGraphJoined('theme_category.[event]');
          }
          break;
        default:
          break;
      }
    }
  });
};

module.exports = {
  Populate,
  Relation,
};
