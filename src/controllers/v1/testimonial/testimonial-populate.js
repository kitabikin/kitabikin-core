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
        case 'user':
          if (access === 'private') {
            f.withGraphJoined('user');
          } else {
            f.withGraphJoined('user(invitationSelects)');
          }
          break;
        case 'profile':
          if (access === 'private') {
            f.withGraphJoined('user.[profile]');
          } else {
            f.withGraphJoined('user(invitationSelects).[profile(invitationSelects)]');
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
        case 'user':
          f.leftJoin('sso.user as user', 'user.id_user', 'invitation.testimonial.id_user');
          break;
        case 'profile':
          f.leftJoin('sso.profile as profile', 'profile.id_user', 'user.id_user');
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
