const { Model } = require('objection');
const { db } = require('@core/config/connection');

Model.knex(db);

class ThemeModel extends Model {
  static get tableName() {
    return 'invitation.theme';
  }

  static get idColumn() {
    return 'id_theme';
  }

  static get relationMappings() {
    const ThemeCategoryModel = require('./theme-category.model');
    const ThemeFeatureModel = require('./theme-feature.model');

    return {
      theme_category: {
        relation: Model.BelongsToOneRelation,
        modelClass: ThemeCategoryModel,
        join: {
          from: 'invitation.theme.id_theme_category',
          to: 'invitation.theme_category.id_theme_category',
        },
      },
      theme_feature: {
        relation: Model.HasManyRelation,
        modelClass: ThemeFeatureModel,
        join: {
          from: 'invitation.theme.id_theme',
          to: 'invitation.theme_feature.id_theme',
        },
      },
    };
  }

  static get modifiers() {
    return {
      filterCode(query, code) {
        query.where('invitation.theme.code', code);
      },

      orderByModifiedAt(query, dir) {
        query.orderBy('invitation.theme.modified_at', dir);
      },

      publicSelects(query) {
        query.select(
          'invitation.theme.code',
          'invitation.theme.name',
          'invitation.theme.image',
          'invitation.theme.banner',
          'invitation.theme.description',
          'invitation.theme.is_active',
          'invitation.theme.modified_at'
        );
      },
    };
  }
}

module.exports = ThemeModel;
