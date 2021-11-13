exports.seed = function (knex) {
  return knex('invitation.event_package')
    .del()
    .then(function () {
      return knex('invitation.event_package').insert([
        {
          id_event_package: 'd2ed6fe4-8504-4392-8ac2-31d8df106791',
          id_event: '2b3b4de1-ed5c-4b5a-9b62-1059344c5775',
          code: 'alpha',
          name: 'Alpha',
          is_recommendation: false,
        },
        {
          id_event_package: '459b8bfa-c4a2-4915-a909-0bc60d957a3d',
          id_event: '2b3b4de1-ed5c-4b5a-9b62-1059344c5775',
          code: 'beta',
          name: 'Beta',
          is_recommendation: true,
        },
        {
          id_event_package: 'eec58f28-6d89-4225-8390-4d14e69babb7',
          id_event: '2b3b4de1-ed5c-4b5a-9b62-1059344c5775',
          code: 'charlie',
          name: 'Charlie',
          is_recommendation: false,
        },
      ]);
    });
};
