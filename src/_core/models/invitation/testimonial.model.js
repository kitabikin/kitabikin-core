const { Model } = require('objection');
const { db } = require('@/config/connection');

Model.knex(db);

class TestimonialModel extends Model {
  static get tableName() {
    return 'invitation.testimonial';
  }

  static get idColumn() {
    return 'id_testimonial';
  }

  static get relationMappings() {
    const UserModel = require('../sso/user.model');

    return {
      user: {
        relation: Model.HasOneRelation,
        modelClass: UserModel,
        join: {
          from: 'invitation.testimonial.id_user',
          to: 'sso.user.id_user',
        },
      },
    };
  }

  static get modifiers() {
    return {
      defaultSelects(query) {
        query.select(
          'invitation.testimonial.id_testimonial',
          'invitation.testimonial.id_user',
          'invitation.testimonial.rate',
          'invitation.testimonial.name',
          'invitation.testimonial.testimonial',
          'invitation.testimonial.is_active',
          'invitation.testimonial.is_delete',
          'invitation.testimonial.created_id',
          'invitation.testimonial.created_at',
          'invitation.testimonial.modified_id',
          'invitation.testimonial.modified_at'
        );
      },

      publicSelects(query) {
        query.select(
          'invitation.testimonial.rate',
          'invitation.testimonial.name',
          'invitation.testimonial.testimonial'
        );
      },
    };
  }
}

module.exports = TestimonialModel;
