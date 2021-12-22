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
        case 'profile':
          if (isTotal) {
            f.leftJoin('sso.profile as profile', 'profile.id_user', 'user.id_user');
          } else {
            f.withGraphJoined('profile');
          }
          break;
        case 'role':
          if (isTotal) {
            f.leftJoin('sso.user_role as user_role', 'user_role.id_user', 'user.id_user');
            f.leftJoin('sso.role as role', 'role.id_role', 'user_role.id_role');
          } else {
            f.withGraphJoined('role.[application]');
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
