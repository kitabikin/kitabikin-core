const { Model } = require('objection');
const { db } = require('@core/config/connection');

Model.knex(db);

class InvitationGuestBookModel extends Model {
  static get tableName() {
    return 'invitation.invitation_guest_book';
  }

  static get idColumn() {
    return 'id_invitation_guest_book';
  }

  static get relationMappings() {
    const InvitationModel = require('./invitation.model');
    const InvitationGuestBookModel = require('./invitation-guest-book.model');

    return {
      invitation: {
        relation: Model.BelongsToOneRelation,
        modelClass: InvitationModel,
        join: {
          from: 'invitation.invitation_guest_book.id_invitation',
          to: 'invitation.invitation.id_invitation',
        },
      },
      parent: {
        relation: Model.HasOneRelation,
        modelClass: InvitationGuestBookModel,
        join: {
          from: 'invitation.invitation_guest_book.name',
          to: 'invitation.invitation_guest_book.name',
        },
      },
    };
  }

  static get modifiers() {
    return {
      publicSelects(query) {
        query.select(
          'invitation.invitation_guest_book.name',
          'invitation.invitation_guest_book.address',
          'invitation.invitation_guest_book.is_active',
          'invitation.invitation_guest_book.created_at'
        );
      },
    };
  }
}

module.exports = InvitationGuestBookModel;
