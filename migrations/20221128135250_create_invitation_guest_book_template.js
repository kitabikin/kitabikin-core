exports.up = function (knex) {
  return knex.schema.withSchema('invitation').createTable('invitation_guest_book_template', function (t) {
    t.uuid('id_invitation_guest_book_template').primary().defaultTo(knex.raw('gen_random_uuid()'));
    t.text('template').notNullable();
    t.boolean('is_active').defaultTo(true);
    t.boolean('is_delete').defaultTo(false);
    t.uuid('created_id');
    t.timestamp('created_at').defaultTo(knex.fn.now());
    t.uuid('modified_id');
    t.timestamp('modified_at').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.withSchema('invitation').dropTable('invitation_guest_book_template');
};
