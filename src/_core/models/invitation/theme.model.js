const { Model } = require('objection');
const { db } = require('@core/config/connection');

Model.knex(db);

class ThemeCategoryModel extends Model {
  static get tableName() {
    return 'invitation.theme';
  }

  static get idColumn() {
    return 'id_theme';
  }

  static get relationMappings() {
    const ThemeCategoryModel = require('./theme-category.model');

    return {
      theme_category: {
        relation: Model.BelongsToOneRelation,
        modelClass: ThemeCategoryModel,
        join: {
          from: 'invitation.theme.id_theme_category',
          to: 'invitation.theme_category.id_theme_category',
        },
      },
    };
  }
}

module.exports = ThemeCategoryModel;
