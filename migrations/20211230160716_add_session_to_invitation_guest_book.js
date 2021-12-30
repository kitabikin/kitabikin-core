exports.up = function (knex, Promise) {
  return knex.schema.withSchema('invitation').table('invitation_guest_book', function (t) {
    t.integer('session').defaultTo(1);
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.withSchema('invitation').table('invitation_guest_book', function (t) {
    t.dropColumn('session');
  });
};
