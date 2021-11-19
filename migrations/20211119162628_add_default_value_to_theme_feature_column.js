exports.up = function (knex, Promise) {
  return knex.schema.withSchema('invitation').table('theme_feature_column', function (t) {
    t.text('default_value');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.withSchema('invitation').table('theme_feature_column', function (t) {
    t.dropColumn('default_value');
  });
};
