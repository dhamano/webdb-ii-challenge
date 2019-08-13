
exports.up = function(knex) {
  return knex.schema.createTable('cars', tbl => {
    tbl.increments();
    tbl.string('vin', 17).unique().notNullable();
    tbl.string('make', 128).notNullable();
    tbl.string('model', 128).notNullable();
    tbl.integer('mileage').notNullable();
    tbl.string('transmission', 128);
    tbl.string('title_status', 128);
  })
  .createTable('sales', tbl => {
    tbl.increments();
    tbl.integer('car_id').unsigned();
    tbl.foreign('car_id').references('id').inTable('cars');
    tbl.decimal('sale_price').notNullable();
    tbl.timestamps(true, true);
  })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('cars')
    .dropTableIfExists('sales');
};
