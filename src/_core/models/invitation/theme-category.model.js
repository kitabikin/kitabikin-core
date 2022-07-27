const { Model } = require('objection');
const { db } = require('@/config/connection');

Model.knex(db);

class ThemeCategoryModel extends Model {
  static get tableName() {
    return 'invitation.theme_category';
  }

  static get idColumn() {
    return 'id_theme_category';
  }

  static get relationMappings() {
    const EventModel = require('./event.model');
    const ThemeModel = require('./theme.model');

    return {
      event: {
        relation: Model.BelongsToOneRelation,
        modelClass: EventModel,
        join: {
          from: 'invitation.theme_category.id_event',
          to: 'invitation.event.id_event',
        },
      },
      theme: {
        relation: Model.HasManyRelation,
        modelClass: ThemeModel,
        join: {
          from: 'invitation.theme_category.id_theme_category',
          to: 'invitation.theme.id_theme_category',
        },
      },
    };
  }

  static get modifiers() {
    return {
      filterCode(query, code) {
        query.where('invitation.theme_category.code', code);
      },

      orderByModifiedAt(query, dir) {
        query.orderBy('invitation.theme_category.modified_at', dir);
      },

      publicSelects(query) {
        query.select(
          'invitation.theme_category.code',
          'invitation.theme_category.name',
          'invitation.theme_category.image',
          'invitation.theme_category.banner',
          'invitation.theme_category.description',
          'invitation.theme_category.is_active',
          'invitation.theme_category.modified_at'
        );
      },
    };
  }
}

module.exports = ThemeCategoryModel;
