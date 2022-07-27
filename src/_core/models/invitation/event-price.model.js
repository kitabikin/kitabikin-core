const { Model } = require('objection');
const { db } = require('@/config/connection');

Model.knex(db);

class EventPriceModel extends Model {
  static get tableName() {
    return 'invitation.event_price';
  }

  static get idColumn() {
    return 'id_event_price';
  }

  static get relationMappings() {
    const EventPackageModel = require('./event-package.model');

    return {
      event_package: {
        relation: Model.BelongsToOneRelation,
        modelClass: EventPackageModel,
        join: {
          from: 'invitation.event_price.id_event_package',
          to: 'invitation.event_package.id_event_package',
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
