exports.up = function (knex) {
  return knex.schema.withSchema('sso').createTable('application', function (t) {
    t.uuid('id_application').primary().defaultTo(knex.raw('gen_random_uuid()'));
    t.string('code').unique().notNullable();
    t.string('name').notNullable();
    t.text('image');
    t.text('banner');
    t.text('description');
    t.boolean('is_active').defaultTo(true);
    t.boolean('is_delete').defaultTo(false);
    t.uuid('created_id');
    t.timestamp('created_at').defaultTo(knex.fn.now());
    t.uuid('modified_id');
    t.timestamp('modified_at').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.withSchema('sso').dropTable('application');
};
