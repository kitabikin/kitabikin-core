const { Model } = require('objection');
const { db } = require('@core/config/connection');

Model.knex(db);

class InvitationFeatureModel extends Model {
  static get tableName() {
    return 'invitation.invitation_feature';
  }

  static get idColumn() {
    return 'id_invitation_feature';
  }

  static get relationMappings() {
    const InvitationModel = require('./invitation.model');
    const InvitationFeatureDataModel = require('./invitation-feature-data.model');
    const ThemeFeatureModel = require('./theme-feature.model');

    return {
      invitation: {
        relation: Model.BelongsToOneRelation,
        modelClass: InvitationModel,
        join: {
          from: 'invitation.invitation_feature.id_invitation',
          to: 'invitation.invitation.id_invitation',
        },
      },
      invitation_feature_data: {
        relation: Model.HasManyRelation,
        modelClass: InvitationFeatureDataModel,
        join: {
          from: 'invitation.invitation_feature.id_invitation_feature',
          to: 'invitation.invitation_feature_data.id_invitation_feature',
        },
      },
      theme_feature: {
        relation: Model.HasOneRelation,
        modelClass: ThemeFeatureModel,
        join: {
          from: 'invitation.invitation_feature.id_theme_feature',
          to: 'invitation.theme_feature.id_theme_feature',
        },
      },
    };
  }
}

module.exports = InvitationFeatureModel;
