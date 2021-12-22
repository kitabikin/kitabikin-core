exports.seed = function (knex) {
  return knex('sso.role')
    .del()
    .then(function () {
      return knex('sso.role').insert([
        {
          id_role: '4c818743-c1da-4f90-bca8-0e3a9b55826d',
          id_application: '998726b6-4b3d-4ff8-a619-4ab1ae1ba366',
          code: 'kitabikin-super-admin',
          name: 'SUPER ADMIN',
        },
        {
          id_role: '2ce0ecf9-e393-40f1-b7d1-347e2b2c0161',
          id_application: '8f725fb8-2c8a-4de9-89ea-c6e5f1173fbb',
          code: 'event-super-admin',
          name: 'SUPER ADMIN',
        },
        {
          id_role: '1959af8f-ebaf-4deb-b4e8-a58a5a250dd9',
          id_application: '8f725fb8-2c8a-4de9-89ea-c6e5f1173fbb',
          code: 'event-administrator',
          name: 'ADMINISTRATOR',
        },
        {
          id_role: '30cb66e6-7c61-4115-8099-f0493b6ee925',
          id_application: '8f725fb8-2c8a-4de9-89ea-c6e5f1173fbb',
          code: 'event-client',
          name: 'CLIENT',
        },
        {
          id_role: 'e70c66f2-8c61-4a07-817d-d44a74717a5d',
          id_application: '8f725fb8-2c8a-4de9-89ea-c6e5f1173fbb',
          code: 'event-partner',
          name: 'PARTNER',
        },
        {
          id_role: '45bd3ed8-81ac-460a-af9c-57755cb5711f',
          id_application: '8f725fb8-2c8a-4de9-89ea-c6e5f1173fbb',
          code: 'event-editor',
          name: 'EDITOR',
        },
        {
          id_role: '90b2669d-fc86-47a4-827f-a96ac2c7d7ce',
          id_application: '8f725fb8-2c8a-4de9-89ea-c6e5f1173fbb',
          code: 'event-author',
          name: 'AUTHOR',
        },
        {
          id_role: '81b1ddca-c166-40e4-82ca-3287a198e146',
          id_application: '8f725fb8-2c8a-4de9-89ea-c6e5f1173fbb',
          code: 'event-contributor',
          name: 'CONTRIBUTOR',
        },
        {
          id_role: 'b309d7c1-3e07-45bd-91f0-b0ac42ab369f',
          id_application: '8f725fb8-2c8a-4de9-89ea-c6e5f1173fbb',
          code: 'event-subscriber',
          name: 'SUBSCRIBER',
        },
      ]);
    });
};
