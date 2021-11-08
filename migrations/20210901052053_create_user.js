exports.up = function (knex) {
  return knex.schema.withSchema('sso').createTable('user', function (t) {
    t.uuid('id_user').primary().defaultTo(knex.raw('gen_random_uuid()'));
    t.string('username').unique().notNullable();
    t.text('password').notNullable();
    t.text('email').unique();
    t.string('referral_code').unique();
    t.string('signup_with');
    t.boolean('is_email').defaultTo(true);
    t.boolean('is_active').defaultTo(true);
    t.boolean('is_delete').defaultTo(false);
    t.uuid('created_id');
    t.timestamp('created_at').defaultTo(knex.fn.now());
    t.uuid('modified_id');
    t.timestamp('modified_at').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.withSchema('sso').dropTable('user');
};
