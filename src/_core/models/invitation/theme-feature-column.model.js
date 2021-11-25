const { Model } = require('objection');
const { db } = require('@core/config/connection');

Model.knex(db);

class ThemeFeatureColumnModel extends Model {
  static get tableName() {
    return 'invitation.theme_feature_column';
  }

  static get idColumn() {
    return 'id_theme_feature_column';
  }

  static get relationMappings() {
    const ThemeFeatureModel = require('./theme-feature.model');
    const InvitationFeatureDataModel = require('./invitation-feature-data.model');

    return {
      theme_feature: {
        relation: Model.BelongsToOneRelation,
        modelClass: ThemeFeatureModel,
        join: {
          from: 'invitation.theme_feature_column.id_theme_feature',
          to: 'invitation.theme_feature.id_theme_feature',
        },
      },
      data: {
        relation: Model.HasManyRelation,
        modelClass: InvitationFeatureDataModel,
        join: {
          from: 'invitation.theme_feature_column.id_theme_feature_column',
          to: 'invitation.invitation_feature_data.id_theme_feature_column',
        },
      },
    };
  }

  static get modifiers() {
    return {
      orderByOrder(query) {
        query.orderBy('invitation.theme_feature_column.order', 'asc');
      },

      publicSelects(query) {
        query.select('invitation.theme_feature_column.code');
      },

      publicThemeSelects(query) {
        query.select(
          'invitation.theme_feature_column.code',
          'invitation.theme_feature_column.default_value as value'
        );
      },
    };
  }
}

module.exports = ThemeFeatureColumnModel;
