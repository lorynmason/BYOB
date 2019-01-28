exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('breweries', function(table) {
      table.increments('id').primary();
      table.string('name');
      table.string('city');
      table.string('food');
      table.string('dog_friendly');
      table.string('outdoor_seating');
      table.string('website');

      table.timestamps(true, true);
    }),

    knex.schema.createTable('beers', function(table) {
      table.increments('id').primary();
      table.string('name');
      table.string('style');
      table.string('abv');
      table.string('availability');
      table.integer('brewery_id').unsigned()
      table.foreign('brewery_id')
        .references('breweries.id');

      table.timestamps(true, true);
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('beers'),
    knex.schema.dropTable('breweries')
  ]);
};