const { Model } = require('objection');
const { db } = require('@/config/connection');

Model.knex(db);

class ThemeFeatureMappingModel extends Model {
  static get tableName() {
    return 'invitation.theme_feature_mapping';
  }

  static get idColumn() {
    return 'id_theme_feature_mapping';
  }

  static get relationMappings() {
    const ThemeFeatureModel = require('./theme-feature.model');
    const EventPackageModel = require('./event-package.model');

    return {
      theme_feature: {
        relation: Model.BelongsToOneRelation,
        modelClass: ThemeFeatureModel,
        join: {
          from: 'invitation.theme_feature_mapping.id_theme_feature',
          to: 'invitation.theme_feature.id_theme_feature',
        },
      },
      event_package: {
        relation: Model.BelongsToOneRelation,
        modelClass: EventPackageModel,
        join: {
          from: 'invitation.theme_feature_mapping.id_event_package',
          to: 'invitation.event_package.id_event_package',
        },
      },
    };
  }
}

module.exports = ThemeFeatureMappingModel;
