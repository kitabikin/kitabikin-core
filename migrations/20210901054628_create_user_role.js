exports.up = function (knex) {
  return knex.schema.withSchema('sso').createTable('user_role', function (t) {
    t.uuid('id_user_role').primary().defaultTo(knex.raw('gen_random_uuid()'));
    t.uuid('id_user').notNullable();
    t.uuid('id_role').notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.withSchema('sso').dropTable('user_role');
};
