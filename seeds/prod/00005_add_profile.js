exports.seed = function (knex) {
  return knex('sso.profile')
    .del()
    .then(function () {
      return knex('sso.profile').insert([
        {
          id_profile: '2bcfa419-9a56-4955-926c-d8626e51a70c',
          id_user: '4f41033c-5c4a-4c46-a5ad-c7e58dd7a720',
          name: 'Rendi',
        },
        {
          id_profile: '3a78ec4e-8b8f-4147-a065-d705b28649ff',
          id_user: '2912caa5-37d5-49c5-b189-3d00c9a38484',
          name: 'Fajar',
        },
        {
          id_profile: '33077c3e-2b07-45c3-8984-313cb793b3bf',
          id_user: 'c5d9cf61-e388-4950-8a7d-3ea953cfddfe',
          name: 'Administrator',
        },
        {
          id_profile: 'ba062125-a359-4215-94db-65da84594cee',
          id_user: 'bf191221-c979-45a0-be74-f812881c475d',
          name: 'Client',
        },
      ]);
    });
};
