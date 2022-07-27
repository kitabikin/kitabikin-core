const { Model } = require('objection');
const { db } = require('@/config/connection');

Model.knex(db);

class ThemeGuestBookModel extends Model {
  static get tableName() {
    return 'invitation.theme_guest_book';
  }

  static get idColumn() {
    return 'id_theme_guest_book';
  }

  static get relationMappings() {
    const ThemeModel = require('./theme.model');

    return {
      theme: {
        relation: Model.BelongsToOneRelation,
        modelClass: ThemeModel,
        join: {
          from: 'invitation.theme_guest_book.id_theme',
          to: 'invitation.theme.id_theme',
        },
      },
    };
  }

  static get modifiers() {
    return {
      publicSelects(query) {
        query.select(
          'invitation.theme_guest_book.name',
          'invitation.theme_guest_book.address',
          'invitation.theme_guest_book.is_active',
          'invitation.theme_guest_book.created_at'
        );
      },
    };
  }
}

module.exports = ThemeGuestBookModel;
