const { Model } = require('objection');
const { db } = require('@/config/connection');

Model.knex(db);

class ThemeGreetingModel extends Model {
  static get tableName() {
    return 'invitation.theme_greeting';
  }

  static get idColumn() {
    return 'id_theme_greeting';
  }

  static get relationMappings() {
    const ThemeModel = require('./theme.model');

    return {
      theme: {
        relation: Model.BelongsToOneRelation,
        modelClass: ThemeModel,
        join: {
          from: 'invitation.theme_greeting.id_theme',
          to: 'invitation.theme.id_theme',
        },
      },
    };
  }

  static get modifiers() {
    return {
      publicSelects(query) {
        query.select(
          'invitation.theme_greeting.name',
          'invitation.theme_greeting.greeting',
          'invitation.theme_greeting.is_active',
          'invitation.theme_greeting.created_at'
        );
      },
    };
  }
}

module.exports = ThemeGreetingModel;
