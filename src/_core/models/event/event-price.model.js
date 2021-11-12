const { Model } = require('objection');
const { db } = require('@core/config/connection');

// MODELS
const EventPackageModel = require('./event-package.model');

Model.knex(db);

class EventPriceModel extends Model {
  static get tableName() {
    return 'event.event_price';
  }

  static get idColumn() {
    return 'id_event_price';
  }

  static get relationMappings() {
    return {
      event_package: {
        relation: Model.BelongsToOneRelation,
        modelClass: EventPackageModel,
        join: {
          from: 'event.event_price.id_event_package',
          to: 'event.event_package.id_event_package',
        },
      },
    };
  }

  static get modifiers() {
    return {
      orderByCreatedAt(query) {
        query.orderBy('created_at', 'desc');
      },
    };
  }
}

module.exports = EventPriceModel;
