const { Model } = require('objection');
const { db } = require('@core/config/connection');

Model.knex(db);

class ThemeCategoryModel extends Model {
  static get tableName() {
    return 'invitation.theme_category';
  }

  static get idColumn() {
    return 'id_theme_category';
  }

  static get relationMappings() {
    const EventModel = require('./event.model');

    return {
      event: {
        relation: Model.BelongsToOneRelation,
        modelClass: EventModel,
        join: {
          from: 'invitation.theme_category.id_event',
          to: 'invitation.event.id_event',
        },
      },
    };
  }
}

module.exports = ThemeCategoryModel;
