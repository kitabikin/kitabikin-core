exports.up = function (knex) {
  return knex.schema.withSchema('invitation').createTable('invitation', function (t) {
    t.uuid('id_invitation').primary().defaultTo(knex.raw('gen_random_uuid()'));
    t.uuid('id_user').notNullable();
    t.uuid('id_event').notNullable();
    t.uuid('id_event_package').notNullable();
    t.uuid('id_theme_category').notNullable();
    t.uuid('id_theme').notNullable();
    t.string('code').unique().notNullable();
    t.string('name').notNullable();
    t.timestamp('invitation_at').defaultTo(knex.fn.now());
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
  return knex.schema.withSchema('invitation').dropTable('invitation');
};
