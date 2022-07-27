const { Model } = require('objection');
const { db } = require('@/config/connection');

Model.knex(db);

class InvitationGreetingModel extends Model {
  static get tableName() {
    return 'invitation.invitation_greeting';
  }

  static get idColumn() {
    return 'id_invitation_greeting';
  }

  static get relationMappings() {
    const InvitationModel = require('./invitation.model');

    return {
      invitation: {
        relation: Model.BelongsToOneRelation,
        modelClass: InvitationModel,
        join: {
          from: 'invitation.invitation_greeting.id_invitation',
          to: 'invitation.invitation.id_invitation',
        },
      },
    };
  }

  static get modifiers() {
    return {
      orderByModifiedAt(query, dir) {
        query.orderBy('invitation.invitation_greeting.modified_at', dir);
      },

      publicSelects(query) {
        query.select(
          'invitation.invitation_greeting.name',
          'invitation.invitation_greeting.greeting',
          'invitation.invitation_greeting.is_active',
          'invitation.invitation_greeting.created_at'
        );
      },
    };
  }
}

module.exports = InvitationGreetingModel;
