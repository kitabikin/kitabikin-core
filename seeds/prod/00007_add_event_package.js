exports.seed = function (knex) {
  return knex('invitation.event_package')
    .del()
    .then(function () {
      return knex('invitation.event_package').insert([
        {
          id_event_package: 'f9c6bc51-6bb3-4d2a-a45b-4efd87f92edf',
          id_event: '2b3b4de1-ed5c-4b5a-9b62-1059344c5775',
          code: 'wedding-free',
          name: 'Gratis',
          is_recommendation: false,
        },
        {
          id_event_package: 'd2ed6fe4-8504-4392-8ac2-31d8df106791',
          id_event: '2b3b4de1-ed5c-4b5a-9b62-1059344c5775',
          code: 'wedding-alpha',
          name: 'Alpha',
          is_recommendation: false,
        },
        {
          id_event_package: '459b8bfa-c4a2-4915-a909-0bc60d957a3d',
          id_event: '2b3b4de1-ed5c-4b5a-9b62-1059344c5775',
          code: 'wedding-beta',
          name: 'Beta',
          is_recommendation: false,
        },
        {
          id_event_package: 'eec58f28-6d89-4225-8390-4d14e69babb7',
          id_event: '2b3b4de1-ed5c-4b5a-9b62-1059344c5775',
          code: 'wedding-charlie',
          name: 'Charlie',
          is_recommendation: true,
        },
        {
          id_event_package: '5122794a-f902-4f8a-b32a-24d6c39fe69f',
          id_event: '2b3b4de1-ed5c-4b5a-9b62-1059344c5775',
          code: 'wedding-custom',
          name: 'Custom',
          is_recommendation: false,
        },
      ]);
    });
};
