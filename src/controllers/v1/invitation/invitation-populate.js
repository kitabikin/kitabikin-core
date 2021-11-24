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
        case 'user':
          if (isTotal) {
            f.leftJoin('sso.user as user', 'user.id_user', 'invitation.id_user');
          } else {
            f.withGraphJoined('user(defaultSelects).[profile]');
          }
          break;
        case 'event':
          if (isTotal) {
            f.leftJoin('invitation.event as event', 'event.id_event', 'invitation.id_event');
          } else {
            f.withGraphJoined('event');
          }
          break;
        case 'event_package':
          if (isTotal) {
            f.leftJoin(
              'invitation.event_package as event_package',
              'event_package.id_event_package',
              'invitation.id_event_package'
            );
          } else {
            f.withGraphJoined('event_package');
          }
          break;
        case 'theme_category':
          if (isTotal) {
            f.leftJoin(
              'invitation.theme_category as theme_category',
              'theme_category.id_theme_category',
              'invitation.id_theme_category'
            );
          } else {
            f.withGraphJoined('theme_category');
          }
          break;
        case 'theme':
          if (isTotal) {
            f.leftJoin('invitation.theme as theme', 'theme.id_theme', 'invitation.id_theme');
          } else {
            f.withGraphJoined('theme');
          }
          break;
        case 'invitation_feature':
          if (isTotal) {
            f.leftJoin(
              'invitation.invitation_feature as invitation_feature',
              'invitation_feature.id_invitation',
              'invitation.id_invitation'
            );
          } else {
            f.withGraphJoined(
              'invitation_feature(publicSelects) as feature.[theme_feature(publicSelects), invitation_feature_data(publicSelects) as data.[theme_feature_column(publicSelects)]]'
            );
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
