const SHA256 = require('crypto-js/sha256');

exports.seed = function (knex) {
  return knex('sso.user')
    .del()
    .then(function () {
      return knex('sso.user').insert([
        {
          id_user: '4f41033c-5c4a-4c46-a5ad-c7e58dd7a720',
          username: 'rendi',
          password: SHA256('password').toString(),
          email: 'rendi@kitabikin.com',
          referral_code: 'REFREN',
          signup_with: 'web',
        },
        {
          id_user: '2912caa5-37d5-49c5-b189-3d00c9a38484',
          username: 'fajar',
          password: SHA256('password').toString(),
          email: 'fajar@kitabikin.com',
          referral_code: 'REFFAJ',
          signup_with: 'web',
        },
        {
          id_user: 'c5d9cf61-e388-4950-8a7d-3ea953cfddfe',
          username: 'administrator',
          password: SHA256('password').toString(),
          email: 'administrator@event.com',
          referral_code: 'REFADM',
          signup_with: 'web',
        },
        {
          id_user: 'bf191221-c979-45a0-be74-f812881c475d',
          username: 'client',
          password: SHA256('password').toString(),
          email: 'client@event.com',
          referral_code: 'REFCLI',
          signup_with: 'web',
        },
      ]);
    });
};
