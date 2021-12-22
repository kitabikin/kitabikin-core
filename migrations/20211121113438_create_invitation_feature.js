exports.up = function (knex) {
  return knex.schema.withSchema('invitation').createTable('invitation_feature', function (t) {
    t.uuid('id_invitation_feature').primary().defaultTo(knex.raw('gen_random_uuid()'));
    t.uuid('id_invitation').notNullable();
    t.uuid('id_theme_feature').notNullable();
    t.boolean('is_active').defaultTo(true);
  });
};

exports.down = function (knex) {
  return knex.schema.withSchema('invitation').dropTable('invitation_feature');
};
