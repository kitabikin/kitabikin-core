const { Model } = require('objection');
const { db } = require('@/config/connection');

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
    const ThemeFeatureColumnModel = require('./theme-feature-column.model');

    return {
      invitation_feature: {
        relation: Model.BelongsToOneRelation,
        modelClass: InvitationFeatureModel,
        join: {
          from: 'invitation.invitation_feature_data.id_invitation_feature',
          to: 'invitation.invitation_feature.id_invitation_feature',
        },
      },
      theme_feature_column: {
        relation: Model.HasOneRelation,
        modelClass: ThemeFeatureColumnModel,
        join: {
          from: 'invitation.invitation_feature_data.id_theme_feature_column',
          to: 'invitation.theme_feature_column.id_theme_feature_column',
        },
      },
    };
  }

  static get modifiers() {
    return {
      publicSelects(query) {
        query.select(
          'invitation.invitation_feature_data.is_active',
          'invitation.invitation_feature_data.value'
        );
      },
    };
  }
}

module.exports = InvitationFeatureDataModel;
