const { Model } = require('objection');
const { db } = require('@/config/connection');

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
    const ThemeFeatureMappingModel = require('./theme-feature-mapping.model');

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
      column: {
        relation: Model.HasManyRelation,
        modelClass: ThemeFeatureColumnModel,
        join: {
          from: 'invitation.theme_feature.id_theme_feature',
          to: 'invitation.theme_feature_column.id_theme_feature',
        },
      },
      theme_feature_mapping: {
        relation: Model.HasManyRelation,
        modelClass: ThemeFeatureMappingModel,
        join: {
          from: 'invitation.theme_feature.id_theme_feature',
          to: 'invitation.theme_feature_mapping.id_theme_feature',
        },
      },
    };
  }

  static get modifiers() {
    return {
      filterCode(query, code) {
        query.where('invitation.theme_feature.code', code);
      },

      orderByModifiedAt(query, dir) {
        query.orderBy('invitation.theme_feature.modified_at', dir);
      },

      orderByOrder(query) {
        query.orderBy('invitation.theme_feature.order', 'asc');
      },

      publicSelects(query) {
        query.select(
          'invitation.theme_feature.code',
          'invitation.theme_feature.name',
          'invitation.theme_feature.order',
          'invitation.theme_feature.description',
          'invitation.theme_feature.is_active',
          'invitation.theme_feature.is_admin',
          'invitation.theme_feature.is_new',
          'invitation.theme_feature.modified_at'
        );
      },
    };
  }
}

module.exports = ThemeFeatureModel;
