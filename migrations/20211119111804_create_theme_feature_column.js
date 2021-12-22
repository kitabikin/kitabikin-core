exports.up = function (knex) {
  return knex.schema.withSchema('invitation').createTable('theme_feature_column', function (t) {
    t.uuid('id_theme_feature_column').primary().defaultTo(knex.raw('gen_random_uuid()'));
    t.uuid('id_theme_feature').notNullable();
    t.string('code').unique().notNullable();
    t.string('label').notNullable();
    t.string('label_helper');
    t.json('configuration');
    t.integer('order');
    t.text('description');
    t.boolean('is_admin').defaultTo(false);
  });
};

exports.down = function (knex) {
  return knex.schema.withSchema('invitation').dropTable('theme_feature_column');
};
