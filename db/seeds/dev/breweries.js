const breweryData = require('../../../helper/data')

const addBrewery = (knex, brewery) => {
  return knex('breweries').insert({
    name: brewery.name,
    city: brewery.city,
    food: brewery.food,
    dog_friendly: brewery.dog_friendly,
    outdoor_seating: brewery.outdoor_seating,
    website: brewery.website, 

  }, 'id')
  .then(breweryIDs => {
    let beerPromises = brewery.beers.map(beer => {
      return createBeers(knex, {
        name: beer.name,
        style: beer.style,  
        abv: beer.abv,
        availability: beer.availability,
        brewery_id: breweryIDs[0]
      })
    })
    return Promise.all(beerPromises)
  })
}

const createBeers = (knex, beer) => {
  return knex('beers').insert(beer)
}

exports.seed = function(knex, Promise) {
  return knex('beers').del()
    .then(() => knex('breweries').del())
    .then(() => {
      let breweryPromises = breweryData.map(brewery => {
        return addBrewery(knex, brewery)
      })
      return Promise.all(breweryPromises)
    })
    .then(() => console.log('Successfully seeded database'))
    .catch(error => console.log(`Error seeding database: ${error.message}`))
};