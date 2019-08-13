
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        {vin: '1G6KE54Y02U115395', make: 'Cadillac', model: 'DeVille', mileage: 150000, transmission: null, title_status: 'clear' },
        {vin: 'JH4CC2660RC002031', make: 'Acura', model: 'Vigor', mileage: 98000, transmission: null, title_status: null },
        {vin: 'JH4KA3270KC007497', make: 'Acura', model: 'Legend', mileage: 95600, transmission: null, title_status: null },
        {vin: 'ZFFSG17A0K0080042', make: 'Ferrari', model: 'Testarossa', mileage: 60125, transmission: null, title_status: 'salvage' },
        {vin: '1NXBR18E42Z566660', make: 'Toyota', model: 'Corolla', mileage: 165252, transmission: null, title_status: null },
        {vin: '1NXBR12E5YZ236569', make: 'Toyota', model: 'Corolla', mileage: 190252, transmission: null, title_status: 'junk' },
        {vin: 'WP0AB29991S385642', make: 'Porche', model: '911', mileage: 90252, transmission: null, title_status: 'reconstructed' },
        {vin: 'WP1AA2A27EL107397', make: 'Porche', model: 'Cayenne', mileage: 65252, transmission: null, title_status: null },
        {vin: 'JN1CZ24D1RX545594', make: 'Nissan', model: '3000ZX', mileage: 165520, transmission: null, title_status: 'affidavit' },
        {vin: '3N1GB22B0LK002494', make: 'Nissan', model: 'Sentra', mileage: 65520, transmission: null, title_status: null }
      ]);
    });
};
