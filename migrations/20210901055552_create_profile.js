exports.up = function (knex) {
  return knex.schema.withSchema('sso').createTable('profile', function (t) {
    t.uuid('id_profile').primary().defaultTo(knex.raw('gen_random_uuid()'));
    t.uuid('id_user').notNullable();
    t.string('name').notNullable();
    t.text('photo');
    t.text('banner');
    t.text('bio');
    t.uuid('created_id');
    t.timestamp('created_at').defaultTo(knex.fn.now());
    t.uuid('modified_id');
    t.timestamp('modified_at').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.withSchema('sso').dropTable('profile');
};
