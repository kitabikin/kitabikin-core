const { Model } = require('objection');
const { db } = require('@core/config/connection');

Model.knex(db);

class InvitationGreetingModel extends Model {
  static get tableName() {
    return 'invitation.theme_greeting';
  }

  static get idColumn() {
    return 'id_theme_greeting';
  }

  static get relationMappings() {
    const InvitationModel = require('./invitation.model');

    return {
      invitation: {
        relation: Model.BelongsToOneRelation,
        modelClass: InvitationModel,
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

module.exports = InvitationGreetingModel;
