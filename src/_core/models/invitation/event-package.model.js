const { Model } = require('objection');
const { db } = require('@core/config/connection');

Model.knex(db);

class EventPackageModel extends Model {
  static get tableName() {
    return 'invitation.event_package';
  }

  static get idColumn() {
    return 'id_event_package';
  }

  static get relationMappings() {
    const EventModel = require('./event.model');
    const EventPriceModel = require('./event-price.model');

    return {
      event: {
        relation: Model.BelongsToOneRelation,
        modelClass: EventModel,
        join: {
          from: 'invitation.event_package.id_event',
          to: 'invitation.event.id_event',
        },
      },
      event_price: {
        relation: Model.HasOneRelation,
        modelClass: EventPriceModel,
        join: {
          from: 'invitation.event_package.id_event_package',
          to: 'invitation.event_price.id_event_package',
        },
      },
    };
  }
}

module.exports = EventPackageModel;
