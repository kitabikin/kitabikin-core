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
            f.withGraphJoined('user(defaultSelects).[profile]');
          } else {
            f.withGraphJoined('user(defaultSelects).[profile]');
          }
          break;
        case 'event':
          if (access === 'private') {
            f.withGraphJoined('event');
          } else {
            f.withGraphJoined('event');
          }
          break;
        case 'event_package':
          if (access === 'private') {
            f.withGraphJoined('event_package');
          } else {
            f.withGraphJoined('event_package');
          }
          break;
        case 'theme_category':
          if (access === 'private') {
            f.withGraphJoined('theme_category');
          } else {
            f.withGraphJoined('theme_category');
          }
          break;
        case 'theme':
          if (access === 'private') {
            f.withGraphJoined('theme');
          } else {
            f.withGraphJoined('theme(publicSelects)');
          }
          break;
        case 'invitation_feature':
          if (access === 'private') {
            f.withGraphJoined('invitation_feature as feature.[theme_feature]');
          } else {
            f.withGraphJoined('invitation_feature(publicSelects) as feature.[theme_feature(publicSelects)]');
          }
          break;
        case 'invitation_feature_data':
          if (access === 'private') {
            f.withGraphJoined(
              'invitation_feature as feature.[theme_feature, invitation_feature_data as column.[theme_feature_column(publicSelects)]]'
            );
          } else {
            f.withGraphJoined(
              'invitation_feature(publicSelects) as feature.[theme_feature(publicSelects), invitation_feature_data(publicSelects) as column.[theme_feature_column(publicSelects)]]'
            );
          }
          break;
        case 'invitation_greeting':
          if (access === 'private') {
            f.withGraphJoined('invitation_greeting(orderByIGModifiedAt)');
          } else {
            f.withGraphJoined('invitation_greeting(publicSelects, orderByIGModifiedAt)');
          }

          f.modifiers({
            orderByIGModifiedAt(builder) {
              builder.where('invitation.invitation_guest_book.modified_at', 'desc');
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
        case 'user':
          f.leftJoin('sso.user as user', 'user.id_user', 'invitation.id_user');
          break;
        case 'event':
          f.leftJoin('invitation.event as event', 'event.id_event', 'invitation.id_event');
          break;
        case 'event_package':
          f.leftJoin(
            'invitation.event_package as event_package',
            'event_package.id_event_package',
            'invitation.id_event_package'
          );
          break;
        case 'theme_category':
          f.leftJoin(
            'invitation.theme_category as theme_category',
            'theme_category.id_theme_category',
            'invitation.id_theme_category'
          );
          break;
        case 'theme':
          f.leftJoin('invitation.theme as theme', 'theme.id_theme', 'invitation.id_theme');
          break;
        case 'invitation_feature':
          f.leftJoin(
            'invitation.invitation_feature as invitation_feature',
            'invitation_feature.id_invitation',
            'invitation.id_invitation'
          );
          break;
        case 'invitation_greeting':
          f.leftJoin(
            'invitation.invitation_greeting as invitation_greeting',
            'invitation_greeting.id_invitation',
            'invitation.id_invitation'
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
