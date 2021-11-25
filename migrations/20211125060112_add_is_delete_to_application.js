exports.up = function (knex, Promise) {
  return knex.schema.withSchema('sso').table('application', function (t) {
    t.boolean('is_delete').defaultTo(false);
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.withSchema('sso').table('application', function (t) {
    t.dropColumn('is_delete');
  });
};
