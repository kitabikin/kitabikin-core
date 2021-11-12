exports.up = function (knex) {
  return knex.schema.withSchema('event').createTable('event_price', function (t) {
    t.uuid('id_event_price').primary().defaultTo(knex.raw('gen_random_uuid()'));
    t.uuid('id_event_package').notNullable();
    t.string('discount_type');
    t.decimal('discount');
    t.decimal('price');
    t.text('description');
    t.boolean('is_price').defaultTo(true);
    t.uuid('created_id');
    t.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.withSchema('event').dropTable('event_price');
};
