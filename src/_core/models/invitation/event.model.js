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

    return {
      event_package: {
        relation: Model.HasManyRelation,
        modelClass: EventPackageModel,
        join: {
          from: 'invitation.event.id_event',
          to: 'invitation.event_package.id_event',
        },
      },
    };
  }
}

module.exports = EventModel;
