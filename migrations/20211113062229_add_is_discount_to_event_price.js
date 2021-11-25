exports.up = function (knex, Promise) {
  return knex.schema.withSchema('invitation').table('event_price', function (t) {
    t.boolean('is_discount').defaultTo(false);
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.withSchema('invitation').table('event_price', function (t) {
    t.dropColumn('is_discount');
  });
};
