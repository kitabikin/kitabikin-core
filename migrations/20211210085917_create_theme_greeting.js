exports.up = function (knex) {
  return knex.schema.withSchema('invitation').createTable('theme_greeting', function (t) {
    t.uuid('id_theme_greeting').primary().defaultTo(knex.raw('gen_random_uuid()'));
    t.uuid('id_theme').notNullable();
    t.string('name').notNullable();
    t.text('greeting').notNullable();
    t.boolean('is_active').defaultTo(true);
    t.boolean('is_delete').defaultTo(false);
    t.uuid('created_id');
    t.timestamp('created_at').defaultTo(knex.fn.now());
    t.uuid('modified_id');
    t.timestamp('modified_at').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.withSchema('invitation').dropTable('theme_greeting');
};
