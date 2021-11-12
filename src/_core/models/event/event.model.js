const { Model } = require('objection');
const { db } = require('@core/config/connection');

// MODELS
const EventPackageModel = require('./event-package.model');

Model.knex(db);

class EventModel extends Model {
  static get tableName() {
    return 'event.event';
  }

  static get idColumn() {
    return 'id_event';
  }

  static get relationMappings() {
    return {
      event_package: {
        relation: Model.HasManyRelation,
        modelClass: EventPackageModel,
        join: {
          from: 'event.event.id_event',
          to: 'event.event_package.id_event',
        },
      },
    };
  }
}

module.exports = EventModel;
