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
        case 'theme_category':
          if (access === 'private') {
            f.withGraphJoined('theme_category');
          } else {
            f.withGraphJoined('theme_category(publicSelects)');
          }
          break;
        case 'event':
          if (access === 'private') {
            f.withGraphJoined('theme_category.[event]');
          } else {
            f.withGraphJoined('theme_category(publicSelects).[event(publicSelects)]');
          }
          break;
        case 'theme_feature':
          if (access === 'private') {
            f.withGraphJoined('theme_feature');
          } else {
            f.withGraphJoined('theme_feature(publicSelects) as feature');
          }
          break;
        case 'theme_feature_column':
          if (access === 'private') {
            f.withGraphJoined('theme_feature.[theme_feature_column]');
          } else {
            f.withGraphJoined(
              'theme_feature(publicSelects) as feature.[theme_feature_column(publicThemeSelects) as column]'
            );
          }
          break;
        case 'theme_greeting':
          if (access === 'private') {
            f.withGraphJoined('theme_greeting');
          } else {
            f.withGraphJoined('theme_greeting(publicSelects)');
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
        case 'theme_category':
          f.leftJoin(
            'invitation.theme_category as theme_category',
            'theme_category.id_theme_category',
            'invitation.theme.id_theme_category'
          );
          break;
        case 'event':
          f.leftJoin(
            'invitation.event as theme_category:event',
            'theme_category:event.id_event',
            'theme_category.id_event'
          );
          break;
        case 'theme_feature':
          f.leftJoin(
            'invitation.theme_feature as theme_feature',
            'theme_feature.id_theme',
            'invitation.theme.id_theme'
          );
          break;
        case 'theme_greeting':
          f.leftJoin(
            'invitation.theme_greeting as theme_greeting',
            'theme_greeting.id_theme',
            'invitation.theme.id_theme'
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
