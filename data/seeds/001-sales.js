
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('sales').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('sales').insert([
        { car_id: 1, sale_price: 3890.00 },
        { car_id: 2, sale_price: 3999.00 },
        { car_id: 3, sale_price: 6999.00 },
        { car_id: 4, sale_price: 85980.00 },
        { car_id: 5, sale_price: 2495.00 },
        { car_id: 6, sale_price: 4495.00 },
        { car_id: 7, sale_price: 16900.00 },
        { car_id: 8, sale_price: 8785.00 },
        { car_id: 9, sale_price: 11500.00 },
        { car_id: 10, sale_price: 2995.00 },
        { car_id: 2, sale_price: 3595.00 }
      ]);
    });
};
