exports.up = function (knex) {
  return knex.schema.withSchema('invitation').createTable('testimonial', function (t) {
    t.uuid('id_testimonial').primary().defaultTo(knex.raw('gen_random_uuid()'));
    t.uuid('id_user').notNullable();
    t.integer('rate').notNullable();
    t.string('name').notNullable();
    t.text('testimonial').notNullable();
    t.boolean('is_active').defaultTo(true);
    t.boolean('is_delete').defaultTo(false);
    t.uuid('created_id');
    t.timestamp('created_at').defaultTo(knex.fn.now());
    t.uuid('modified_id');
    t.timestamp('modified_at').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.withSchema('invitation').dropTable('testimonial');
};
