const { Model } = require('objection');
const { db } = require('@core/config/connection');

// MODELS
const ApplicationModel = require('./application.model');
const UserModel = require('./user.model');

Model.knex(db);

class RoleModel extends Model {
  static get tableName() {
    return 'sso.role';
  }

  static get idColumn() {
    return 'id_role';
  }

  static get relationMappings() {
    return {
      application: {
        relation: Model.BelongsToOneRelation,
        modelClass: ApplicationModel,
        join: {
          from: 'sso.role.id_application',
          to: 'sso.application.id_application',
        },
      },
      user: {
        relation: Model.ManyToManyRelation,
        modelClass: UserModel,
        join: {
          from: 'sso.role.id_role',
          through: {
            from: 'sso.user_role.id_role',
            to: 'sso.user_role.id_user',
          },
          to: 'sso.user.id_user',
        },
      },
    };
  }

  static get modifiers() {
    return {
      loginSelects(query) {
        query.select('role.id_role as id_role_alias', 'role.id_application', 'role.code', 'role.name');
      },
    };
  }
}

module.exports = RoleModel;
