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
        case 'invitation':
          if (access === 'private') {
            f.withGraphJoined('invitation');
          } else {
            f.withGraphJoined('invitation');
          }
          break;
        case 'parrent':
          f.withGraphJoined('parent(onlyNotYet)');
          f.modifiers({
            onlyNotYet(builder) {
              builder.where('confirmation', 'notyet');
            },
          });
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
        case 'invitation':
          f.leftJoin(
            'invitation.invitation as invitation',
            'invitation.id_invitation',
            'invitation_guest_book.id_invitation'
          );
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
