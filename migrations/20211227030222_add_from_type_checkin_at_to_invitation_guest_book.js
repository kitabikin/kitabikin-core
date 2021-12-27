exports.up = function (knex, Promise) {
  return knex.schema.withSchema('invitation').table('invitation_guest_book', function (t) {
    t.timestamp('checkin_at').defaultTo(knex.fn.now());
    t.string('type').defaultTo('biasa');
    t.string('from').defaultTo('admin');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.withSchema('invitation').table('invitation_guest_book', function (t) {
    t.dropColumn('checkin_at');
    t.dropColumn('type');
    t.dropColumn('from');
  });
};
