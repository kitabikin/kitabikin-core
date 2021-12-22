exports.seed = function (knex) {
  return knex('sso.user_role')
    .del()
    .then(function () {
      return knex('sso.user_role').insert([
        {
          id_user_role: '747d9791-e468-4afc-b060-7add140c874d',
          id_user: '4f41033c-5c4a-4c46-a5ad-c7e58dd7a720',
          id_role: '4c818743-c1da-4f90-bca8-0e3a9b55826d',
        },
        {
          id_user_role: '941ed828-f68c-4435-8c28-9a80a854168f',
          id_user: '4f41033c-5c4a-4c46-a5ad-c7e58dd7a720',
          id_role: '2ce0ecf9-e393-40f1-b7d1-347e2b2c0161',
        },
        {
          id_user_role: '9ac4ed60-8176-441d-b58e-2effc148f658',
          id_user: '2912caa5-37d5-49c5-b189-3d00c9a38484',
          id_role: '4c818743-c1da-4f90-bca8-0e3a9b55826d',
        },
        {
          id_user_role: '552b30fd-51cd-4320-ae3e-7c0d701b7888',
          id_user: '2912caa5-37d5-49c5-b189-3d00c9a38484',
          id_role: '2ce0ecf9-e393-40f1-b7d1-347e2b2c0161',
        },
        {
          id_user_role: '11d4bfa3-e8fa-4a9c-8cde-7a44dc74d7ec',
          id_user: 'c5d9cf61-e388-4950-8a7d-3ea953cfddfe',
          id_role: '1959af8f-ebaf-4deb-b4e8-a58a5a250dd9',
        },
        {
          id_user_role: 'bf694643-55bb-4fe6-8baa-c5fa4ffb7b69',
          id_user: 'bf191221-c979-45a0-be74-f812881c475d',
          id_role: '30cb66e6-7c61-4115-8099-f0493b6ee925',
        },
      ]);
    });
};
