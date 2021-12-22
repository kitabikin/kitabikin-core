exports.seed = function (knex) {
  return knex('invitation.theme')
    .del()
    .then(function () {
      return knex('invitation.theme').insert([
        {
          id_theme: '6609494b-48a0-4a1d-8791-364de5f043f0',
          id_theme_category: '1feb89c2-d62d-4e9d-90d7-7e4e50b7c582',
          code: 'tropical',
          name: 'Tropical',
          id_image: 'tropical1',
          image: 'http://google.com',
        },
        {
          id_theme: 'a0043da8-1bc3-4758-b266-7d5a3ca04a28',
          id_theme_category: '2dd82b0f-1383-4305-8908-a97939fcca6e',
          code: 'palem',
          name: 'Palem',
          id_image: 'palem1',
          image: 'http://bing.com',
        },
      ]);
    });
};
