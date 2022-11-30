exports.up = function (knex, Promise) {
  return knex.schema.withSchema('invitation').table('invitation', function (t) {
    t.uuid('id_invitation_guest_book_template').defaultTo(knex.raw('gen_random_uuid()'));
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.withSchema('invitation').table('invitation', function (t) {
    t.dropColumn('id_invitation_guest_book_template');
  });
};
