const { Model } = require('objection');
const { db } = require('@core/config/connection');

Model.knex(db);

class ThemeFeatureModel extends Model {
  static get tableName() {
    return 'invitation.theme_feature';
  }

  static get idColumn() {
    return 'id_theme_feature';
  }

  static get relationMappings() {
    const ThemeModel = require('./theme.model');
    const ThemeFeatureColumnModel = require('./theme-feature-column.model');

    return {
      theme: {
        relation: Model.BelongsToOneRelation,
        modelClass: ThemeModel,
        join: {
          from: 'invitation.theme_feature.id_theme',
          to: 'invitation.theme.id_theme',
        },
      },
      theme_feature_column: {
        relation: Model.HasManyRelation,
        modelClass: ThemeFeatureColumnModel,
        join: {
          from: 'invitation.theme_feature.id_theme_feature',
          to: 'invitation.theme_feature_column.id_theme_feature',
        },
      },
    };
  }
}

module.exports = ThemeFeatureModel;
