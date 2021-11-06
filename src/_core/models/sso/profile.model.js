const { Model } = require('objection');
const { db } = require('@core/config/connection');

// MODELS
const UserModel = require('./user.model');

Model.knex(db);

class ProfileModel extends Model {
  static get tableName() {
    return 'sso.profile';
  }

  static get idColumn() {
    return 'id_profile';
  }

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: 'sso.profile.id_user',
          to: 'sso.user.id_user',
        },
      },
    };
  }

  static get modifiers() {
    return {
      loginSelects(query) {
        query.select('id_profile', 'name', 'photo');
      },
    };
  }
}

module.exports = ProfileModel;
