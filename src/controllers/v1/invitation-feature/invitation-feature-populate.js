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
        case 'theme_feature':
          if (isTotal) {
            f.leftJoin(
              'invitation.theme_feature as theme_feature',
              'theme_feature.id_theme_feature',
              'invitation_feature.id_theme_feature'
            );
          } else {
            f.withGraphJoined('theme_feature.[theme_feature_column(orderByOrder)]');
          }
          break;
        case 'invitation_feature_data':
          if (isTotal) {
            f.leftJoin(
              'invitation.invitation_feature_data as invitation_feature_data',
              'invitation_feature_data.id_invitation_feature',
              'invitation_feature.id_invitation_feature'
            );
          } else {
            f.withGraphJoined('invitation_feature_data');
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
