exports.up = function (knex) {
  return knex.schema.withSchema('invitation').createTable('theme_feature_mapping', function (t) {
    t.uuid('id_theme_feature_mapping').primary().defaultTo(knex.raw('gen_random_uuid()'));
    t.uuid('id_theme_feature').notNullable();
    t.uuid('id_theme').notNullable();
    t.uuid('id_event_package').notNullable();
    t.boolean('is_active').defaultTo(true);
  });
};

exports.down = function (knex) {
  return knex.schema.withSchema('invitation').dropTable('theme_feature_mapping');
};
