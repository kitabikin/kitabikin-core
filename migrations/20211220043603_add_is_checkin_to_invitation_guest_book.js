exports.up = function (knex, Promise) {
  return knex.schema.withSchema('invitation').table('invitation_guest_book', function (t) {
    t.boolean('is_checkin').defaultTo(false);
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.withSchema('invitation').table('invitation_guest_book', function (t) {
    t.dropColumn('is_checkin');
  });
};
