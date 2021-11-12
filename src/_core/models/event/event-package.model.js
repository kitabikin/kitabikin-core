const { Model } = require('objection');
const { db } = require('@core/config/connection');

// MODELS
const EventModel = require('./event.model');
const EventPriceModel = require('./event-price.model');

Model.knex(db);

class EventPackageModel extends Model {
  static get tableName() {
    return 'event.event_package';
  }

  static get idColumn() {
    return 'id_event_package';
  }

  static get relationMappings() {
    return {
      event: {
        relation: Model.BelongsToOneRelation,
        modelClass: EventModel,
        join: {
          from: 'event.event_package.id_event',
          to: 'event.event.id_event',
        },
      },
      event_price: {
        relation: Model.HasOneRelation,
        modelClass: EventPriceModel,
        join: {
          from: 'event.event_package.id_event_package',
          to: 'event.event_price.id_event_package',
        },
      },
    };
  }
}

module.exports = EventPackageModel;
