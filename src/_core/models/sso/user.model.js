const { Model } = require('objection');
const { db } = require('@core/config/connection');

Model.knex(db);

class UserModel extends Model {
  static get tableName() {
    return 'sso.user';
  }

  static get idColumn() {
    return 'id_user';
  }

  static get relationMappings() {
    const ProfileModel = require('./profile.model');
    const RoleModel = require('./role.model');

    return {
      profile: {
        relation: Model.HasOneRelation,
        modelClass: ProfileModel,
        join: {
          from: 'sso.user.id_user',
          to: 'sso.profile.id_user',
        },
      },
      role: {
        relation: Model.ManyToManyRelation,
        modelClass: RoleModel,
        join: {
          from: 'sso.user.id_user',
          through: {
            from: 'sso.user_role.id_user',
            to: 'sso.user_role.id_role',
          },
          to: 'sso.role.id_role',
        },
      },
    };
  }

  static get modifiers() {
    return {
      loginSelects(query) {
        query.select('id_user', 'username');
      },

      defaultSelects(query) {
        query.select(
          'sso.user.id_user',
          'sso.user.username',
          'sso.user.email',
          'sso.user.referral_code',
          'sso.user.signup_with',
          'sso.user.is_email',
          'sso.user.is_active',
          'sso.user.is_delete',
          'sso.user.created_id',
          'sso.user.created_at',
          'sso.user.modified_id',
          'sso.user.modified_at'
        );
      },
    };
  }
}

module.exports = UserModel;
