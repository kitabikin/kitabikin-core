const { Model } = require('objection');
const { db } = require('@core/config/connection');

Model.knex(db);

class EventModel extends Model {
  static get tableName() {
    return 'invitation.event';
  }

  static get idColumn() {
    return 'id_event';
  }

  static get relationMappings() {
    const EventPackageModel = require('./event-package.model');
    const ThemeCategoryModel = require('./theme-category.model');

    return {
      event_package: {
        relation: Model.HasManyRelation,
        modelClass: EventPackageModel,
        join: {
          from: 'invitation.event.id_event',
          to: 'invitation.event_package.id_event',
        },
      },
      theme_category: {
        relation: Model.HasManyRelation,
        modelClass: ThemeCategoryModel,
        join: {
          from: 'invitation.event.id_event',
          to: 'invitation.theme_category.id_event',
        },
      },
    };
  }

  static get modifiers() {
    return {
      filterCode(query, code) {
        query.where('invitation.event.code', code);
      },

      orderByModifiedAt(query, dir) {
        query.orderBy('invitation.event.modified_at', dir);
      },

      publicSelects(query) {
        query.select(
          'invitation.event.code',
          'invitation.event.name',
          'invitation.event.image',
          'invitation.event.banner',
          'invitation.event.description',
          'invitation.event.is_active',
          'invitation.event.modified_at'
        );
      },
    };
  }
}

module.exports = EventModel;
