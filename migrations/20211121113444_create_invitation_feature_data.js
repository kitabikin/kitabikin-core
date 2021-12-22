exports.up = function (knex) {
  return knex.schema.withSchema('invitation').createTable('invitation_feature_data', function (t) {
    t.uuid('id_invitation_feature_data').primary().defaultTo(knex.raw('gen_random_uuid()'));
    t.uuid('id_invitation_feature').notNullable();
    t.uuid('id_theme_feature_column').notNullable();
    t.boolean('is_active').defaultTo(true);
    t.text('value');
  });
};

exports.down = function (knex) {
  return knex.schema.withSchema('invitation').dropTable('invitation_feature_data');
};
