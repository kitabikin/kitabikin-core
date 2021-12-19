exports.up = function (knex) {
  return knex.schema.withSchema('invitation').createTable('theme_guest_book', function (t) {
    t.uuid('id_theme_guest_book').primary().defaultTo(knex.raw('gen_random_uuid()'));
    t.uuid('id_theme').notNullable();
    t.string('name').notNullable();
    t.text('address');
    t.string('no_telp');
    t.text('qr_code');
    t.text('qr_code_url');
    t.string('confirmation');
    t.integer('total_reservation');
    t.boolean('is_send').defaultTo(false);
    t.boolean('is_active').defaultTo(true);
    t.boolean('is_delete').defaultTo(false);
    t.uuid('created_id');
    t.timestamp('created_at').defaultTo(knex.fn.now());
    t.uuid('modified_id');
    t.timestamp('modified_at').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.withSchema('invitation').dropTable('theme_guest_book');
};
