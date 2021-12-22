const _ = require('lodash');
const qs = require('qs');

const Populate = (f, populate, access = 'private') => {
  const qsPopulate = qs.parse(populate);

  if (_.isNil(qsPopulate[0])) {
    getPopulate(f, qsPopulate, access);
  } else {
    Object.keys(qsPopulate).map((index) => {
      getPopulate(f, qsPopulate[index], access);
    });
  }
};

const getPopulate = (f, populate, access) => {
  Object.keys(populate).map((k) => {
    const key = k;
    const value = populate[k] === 'true';

    if (value) {
      switch (key) {
        case 'theme':
          if (access === 'private') {
            f.withGraphJoined('theme');
          } else {
            f.withGraphJoined('theme');
          }
          break;
        default:
          break;
      }
    }
  });
};

const Relation = (f, populate) => {
  const qsPopulate = qs.parse(populate);

  if (_.isNil(qsPopulate[0])) {
    getRelation(f, qsPopulate);
  } else {
    Object.keys(qsPopulate).map((index) => {
      getRelation(f, qsPopulate[index]);
    });
  }
};

const getRelation = (f, populate) => {
  Object.keys(populate).map((k) => {
    const key = k;
    const value = populate[k] === 'true';

    if (value) {
      switch (key) {
        case 'theme':
          f.leftJoin('invitation.theme as theme', 'theme.id_theme', 'theme_greeting.id_theme');
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
