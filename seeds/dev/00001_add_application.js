exports.seed = function (knex) {
  return knex('sso.application')
    .del()
    .then(function () {
      return knex('sso.application').insert([
        {
          id_application: '998726b6-4b3d-4ff8-a619-4ab1ae1ba366',
          code: 'kitabikin',
          name: 'Kitabikin',
        },
        {
          id_application: '8f725fb8-2c8a-4de9-89ea-c6e5f1173fbb',
          code: 'event',
          name: 'Event',
        },
      ]);
    });
};
