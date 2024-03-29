const { Model } = require('objection');
const { db } = require('@/config/connection');

Model.knex(db);

class InvitationModel extends Model {
  static get tableName() {
    return 'invitation.invitation';
  }

  static get idColumn() {
    return 'id_invitation';
  }

  static get relationMappings() {
    const UserModel = require('../sso/user.model');
    const EventModel = require('./event.model');
    const EventPackageModel = require('./event-package.model');
    const ThemeCategoryModel = require('./theme-category.model');
    const ThemeModel = require('./theme.model');
    const InvitationFeatureModel = require('./invitation-feature.model');
    const InvitationGreetingModel = require('./invitation-greeting.model');
    const InvitationGuestBookTemplateModel = require('./invitation-guest-book-template.model');

    return {
      user: {
        relation: Model.HasOneRelation,
        modelClass: UserModel,
        join: {
          from: 'invitation.invitation.id_user',
          to: 'sso.user.id_user',
        },
      },
      event: {
        relation: Model.HasOneRelation,
        modelClass: EventModel,
        join: {
          from: 'invitation.invitation.id_event',
          to: 'invitation.event.id_event',
        },
      },
      event_package: {
        relation: Model.HasOneRelation,
        modelClass: EventPackageModel,
        join: {
          from: 'invitation.invitation.id_event_package',
          to: 'invitation.event_package.id_event_package',
        },
      },
      theme_category: {
        relation: Model.HasOneRelation,
        modelClass: ThemeCategoryModel,
        join: {
          from: 'invitation.invitation.id_theme_category',
          to: 'invitation.theme_category.id_theme_category',
        },
      },
      theme: {
        relation: Model.HasOneRelation,
        modelClass: ThemeModel,
        join: {
          from: 'invitation.invitation.id_theme',
          to: 'invitation.theme.id_theme',
        },
      },
      invitation_feature: {
        relation: Model.HasManyRelation,
        modelClass: InvitationFeatureModel,
        join: {
          from: 'invitation.invitation.id_invitation',
          to: 'invitation.invitation_feature.id_invitation',
        },
      },
      invitation_greeting: {
        relation: Model.HasManyRelation,
        modelClass: InvitationGreetingModel,
        join: {
          from: 'invitation.invitation.id_invitation',
          to: 'invitation.invitation_greeting.id_invitation',
        },
      },
      invitation_guest_book_template: {
        relation: Model.HasOneRelation,
        modelClass: InvitationGuestBookTemplateModel,
        join: {
          from: 'invitation.invitation.id_invitation_guest_book_template',
          to: 'invitation.invitation_guest_book_template.id_invitation_guest_book_template',
        },
      },
    };
  }

  static get modifiers() {
    return {
      filterCode(query, code) {
        query.where('invitation.invitation.code', code);
      },

      publicSelects(query) {
        query.select(
          'invitation.invitation.id_invitation',
          'invitation.invitation.code',
          'invitation.invitation.name',
          'invitation.invitation.invitation_at',
          'invitation.invitation.description',
          'invitation.invitation.metadata',
          'invitation.invitation.is_active'
        );
      },
    };
  }
}

module.exports = InvitationModel;
