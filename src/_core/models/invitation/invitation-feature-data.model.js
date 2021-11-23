const { Model } = require('objection');
const { db } = require('@core/config/connection');

Model.knex(db);

class InvitationFeatureDataModel extends Model {
  static get tableName() {
    return 'invitation.invitation_feature_data';
  }

  static get idColumn() {
    return 'id_invitation_feature_data';
  }

  static get relationMappings() {
    const InvitationFeatureModel = require('./invitation-feature.model');

    return {
      invitation_feature: {
        relation: Model.BelongsToOneRelation,
        modelClass: InvitationFeatureModel,
        join: {
          from: 'invitation.invitation_feature_data.id_invitation_feature',
          to: 'invitation.invitation_feature.id_invitation_feature',
        },
      },
    };
  }
}

module.exports = InvitationFeatureDataModel;
