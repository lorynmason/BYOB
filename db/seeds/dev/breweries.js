let breweryData = [{
  id: 1, 
  name: 'Rouge',
  city: 'portland',
  food: 'yes',
  dog_friendly: 'yes',
  outdoor_seating: 'yes',
  website: 'www.rouge.com', 
  beers: [
    {
      abv: '5.6%',
      style: 'ale',  
      name: 'dead guy',
      availabilty: 'year round' 
    }, { 
      abv: '5.6%',
      style: 'ale',  
      name: 'voodoo donut',
      availabilty: 'year round'
    }
  ]
}, {
  id: 2, 
  name: '10 Barrel',
  city: 'Denver',
  food: 'yes',
  dog_friendly: 'yes',
  outdoor_seating: 'yes',
  website: 'www.rouge.com', 
  beers: [
    {
      abv: '5.6%',
      style: 'ale',  
      name: 'dead guy',
      availabilty: 'year round' 
    }, { 
      abv: '5.6%',
      style: 'ale',  
      name: 'voodoo donut',
      availabilty: 'year round'
    }
  ]
}
]

exports.seed = (knex, Promise) => {
  return knex('beers').del()
    .then(() => knex('breweries').del()) 
    .then(() => Promise.all(breweryData))
    .catch(error => console.log(`Error seeding data: ${error}`));
};
