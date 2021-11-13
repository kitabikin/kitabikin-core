exports.seed = function (knex) {
  return knex('invitation.theme_category')
    .del()
    .then(function () {
      return knex('invitation.theme_category').insert([
        {
          id_theme_category: '1feb89c2-d62d-4e9d-90d7-7e4e50b7c582',
          id_event: '2b3b4de1-ed5c-4b5a-9b62-1059344c5775',
          code: 'modern',
          name: 'Modern',
        },
        {
          id_theme_category: '2dd82b0f-1383-4305-8908-a97939fcca6e',
          id_event: '2b3b4de1-ed5c-4b5a-9b62-1059344c5775',
          code: 'traditional',
          name: 'Tradisional',
        },
      ]);
    });
};
