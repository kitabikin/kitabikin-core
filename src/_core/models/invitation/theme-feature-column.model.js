const { Model } = require('objection');
const { db } = require('@core/config/connection');

Model.knex(db);

class ThemeFeatureColumnModel extends Model {
  static get tableName() {
    return 'invitation.theme_feature_column';
  }

  static get idColumn() {
    return 'id_theme_feature_column';
  }

  static get relationMappings() {
    const ThemeFeatureModel = require('./theme-feature.model');

    return {
      theme_feature: {
        relation: Model.BelongsToOneRelation,
        modelClass: ThemeFeatureModel,
        join: {
          from: 'invitation.theme_feature_column.id_theme_feature',
          to: 'invitation.theme_feature.id_theme_feature',
        },
      },
    };
  }

  static get modifiers() {
    return {
      orderByOrder(query) {
        query.orderBy('order', 'asc');
      },
    };
  }
}

module.exports = ThemeFeatureColumnModel;
