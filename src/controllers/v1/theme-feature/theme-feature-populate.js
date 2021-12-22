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
        case 'theme_feature_column':
          if (isTotal) {
            f.leftJoin(
              'invitation.theme_feature_column as theme_feature_column',
              'theme_feature_column.id_theme_feature',
              'theme_feature.id_theme_feature'
            );
          } else {
            f.withGraphJoined('theme_feature_column(orderByOrder)');
          }
          break;
        case 'theme_feature_mapping':
          if (isTotal) {
            f.leftJoin(
              'invitation.theme_feature_mapping as theme_feature_mapping',
              'theme_feature_mapping.id_theme_feature',
              'theme_feature.id_theme_feature'
            );
          } else {
            f.withGraphJoined('theme_feature_mapping.[event_package]');
          }
          break;
        case 'theme':
          if (isTotal) {
            f.leftJoin('invitation.theme as theme', 'theme.id_theme', 'invitation.theme_feature.id_theme');
          } else {
            f.withGraphJoined('theme');
          }
          break;
        case 'theme_category':
          if (isTotal) {
            f.leftJoin(
              'invitation.theme_category as theme_category',
              'theme_category.id_theme_category',
              'invitation.theme.id_theme_category'
            );
          } else {
            f.withGraphJoined('theme.[theme_category]');
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
            f.withGraphJoined('theme.[theme_category.[event]]');
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
