exports.seed = function (knex) {
  return knex('event.event_price')
    .del()
    .then(function () {
      return knex('event.event_price').insert([
        {
          id_event_price: '78bb019f-7d2a-49ae-9ef8-397442ec7e79',
          id_event_package: 'd2ed6fe4-8504-4392-8ac2-31d8df106791',
          discount_type: 'fixed',
          discount: '100',
          price: '349',
          is_price: true,
        },
        {
          id_event_price: '587aee98-d749-43ec-8010-8de5edf3553a',
          id_event_package: 'd2ed6fe4-8504-4392-8ac2-31d8df106791',
          discount_type: 'fixed',
          discount: '100',
          price: '249',
          is_price: true,
        },
        {
          id_event_price: 'fc155707-b31a-4e4d-b196-a91692533b2e',
          id_event_package: '459b8bfa-c4a2-4915-a909-0bc60d957a3d',
          discount_type: 'fixed',
          discount: '100',
          price: '449',
          is_price: true,
        },
        {
          id_event_price: 'db5d2feb-3535-4d40-b96e-bc00db793b24',
          id_event_package: 'eec58f28-6d89-4225-8390-4d14e69babb7',
          is_price: false,
        },
      ]);
    });
};
