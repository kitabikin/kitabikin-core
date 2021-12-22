exports.up = function (knex, Promise) {
  return knex.schema.withSchema('invitation').table('theme_feature', function (t) {
    t.boolean('is_admin').defaultTo(false);
    t.boolean('is_new').defaultTo(false);
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.withSchema('invitation').table('theme_feature', function (t) {
    t.dropColumn('is_admin');
    t.dropColumn('is_new');
  });
};
