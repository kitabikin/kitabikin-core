const { Model } = require('objection');
const { db } = require('@core/config/connection');

// MODELS
const ProfileModel = require('./profile.model');
const RoleModel = require('./role.model');

Model.knex(db);

class UserModel extends Model {
  static get tableName() {
    return 'sso.user';
  }

  static get idColumn() {
    return 'id_user';
  }

  static get relationMappings() {
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
    };
  }
}

module.exports = UserModel;
