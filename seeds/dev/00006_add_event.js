exports.seed = function (knex) {
  return knex('event.event')
    .del()
    .then(function () {
      return knex('event.event').insert([
        {
          id_event: '2b3b4de1-ed5c-4b5a-9b62-1059344c5775',
          code: 'wedding',
          name: 'Pernikahan',
        },
      ]);
    });
};
