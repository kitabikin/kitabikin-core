const { Model } = require('objection');
const { db } = require('@/config/connection');

Model.knex(db);

class InvitationGuestBookTemplateModel extends Model {
  static get tableName() {
    return 'invitation.invitation_guest_book_template';
  }

  static get idColumn() {
    return 'id_invitation_guest_book_template';
  }
}

module.exports = InvitationGuestBookTemplateModel;
