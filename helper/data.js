const breweryData = [
  {
    name: 'Avery Brewing Company',
    city: 'Boulder',
    food: 'yes',
    dog_friendly: 'yes',
    outdoor_seating: 'yes',
    website: 'www.averybrewing.com',
    beers: [
      {
        name: 'The Real Peel IPA',
        style: 'American IPA',
        abv: '6.3',
        availability: 'Year-Round'
      },
      {
        name: 'Out of Bounds Stout',
        style: 'Classic American Pilsener',
        abv: '4.7',
        availability: 'Year-Round'
      }
    ]
  },
  {
    name: 'New Belgium Brewing Company',
    city: 'Fort Collins',
    food: 'yes',
    dog_friendly: 'yes',
    outdoor_seating: 'no',
    website: 'www.newbelgium.com/',
    beers: [
      {
        name: 'Sunshine',
        style: 'American Wheat',
        abv: '5.0',
        availability: 'Year-Round'
      },
      {
        name: 'Tartastic',
        style: 'Sour Ale',
        abv: '4.5',
        availability: 'Year-Round'
      }
    ]
  },
  {
    name: 'Funkwerks',
    city: 'Fort Collins',
    food: 'yes',
    dog_friendly: 'yes',
    outdoor_seating: 'yes',
    website: 'www.funkwerks.com',
    beers: [
      {
        name: 'Pale Ryder',
        style: 'Rye Beer',
        abv: '6.4',
        availability: 'Rotating'
      },
      {
        name: 'Raspberry Provincial',
        style: 'Fruit Beer',
        abv: '4.2',
        availability: 'Rotating'
      }
    ]
  },
  {
    name: '10 Barrel Brewing Company',
    city: 'Denver',
    food: 'yes',
    dog_friendly: 'no',
    outdoor_seating: 'yes',
    website: 'www.10barrel.com',
    beers: [
      {
        name: 'Apocalypse IPA',
        style: 'American IPA',
        abv: '6.8',
        availability: 'Year-Round'
      },
      {
        name: 'Brilliant',
        style: 'Sour Ale',
        abv: '7.8',
        availability: 'Rotating'
      }
    ]
  },
  {
    name: 'Elk Avenue Brewing Company',
    city: 'Crested Butte',
    food: 'yes',
    dog_friendly: 'no',
    outdoor_seating: 'no',
    website: 'www.eldobrewpub.com/',
    beers: [
      {
        name: 'Eldo: Session Ale',
        style: 'American Ale',
        abv: '4.5',
        availability: 'Year-Round'
      },
      {
        name: 'Breakfast Ale',
        style: 'Light Hybrid Beer',
        abv: '4.2',
        availability: 'Year-Round'
      }
    ]
  },
  {
    name: 'Phantom Canyon Brewing Company',
    city: 'Colorado Springs',
    food: 'yes',
    dog_friendly: 'no',
    outdoor_seating: 'no',
    website: 'www.phantomcanyon.com/',
    beers: [
      {
        name: 'Latzenbier',
        style: 'Altbier',
        abv: '5.9',
        availability: 'Rotating'
      },
      {
        name: 'La Flama Blanca',
        style: 'American IPA',
        abv: '4.3',
        availability: 'Rotating'
      }
    ]
  },
  {
    name: 'Barrels & Bottles Brewery',
    city: 'Golden',
    food: 'yes',
    dog_friendly: 'yes',
    outdoor_seating: 'yes',
    website: 'www.barrelsbottles.com/',
    beers: [
      {
        name: 'Cin-Ful',
        style: 'Coffee Porter',
        abv: '6.3',
        availability: 'Rotating'
      },
      {
        name: 'Wanda Mae\'s Peach Pie',
        style: 'American Brown Ale',
        abv: '5.0',
        availability: 'Rotating'
      }
    ]
  },
  {
    name: 'Carver Brewing Company',
    city: 'Durango',
    food: 'yes',
    dog_friendly: 'no',
    outdoor_seating: 'yes',
    website: 'www.carverbrewing.com/',
    beers: [
      {
        name: 'Red Mountain Rye',
        style: 'Rye Beer',
        abv: '6.3',
        availability: 'Seasonal'
      },
      {
        name: 'Raspberry Wheat Ale',
        style: 'Fruit Beer',
        abv: '5.2',
        availability: 'Year-Round'
      }
    ]
  },
  {
    name: 'Vail Brewing Company',
    city: 'Vail',
    food: 'yes',
    dog_friendly: 'yes',
    outdoor_seating: 'no',
    website: 'www.vailbrewingco.com/',
    beers: [
      {
        name: 'Porch Time Lime',
        style: 'American Wheat Ale',
        abv: '5.2',
        availability: 'Rotating'
      },
      {
        name: 'Hop Kush',
        style: 'American Pale Ale',
        abv: '5.0',
        availability: 'Year-Round'
      }
    ]
  },
  {
    name: 'Odell Brewing Company',
    city: 'Denver',
    food: 'yes',
    dog_friendly: 'yes',
    outdoor_seating: 'yes',
    website: 'www.odellbrewing.com',
    beers: [
      {
        name: 'Gramps',
        style: 'Oatmeal Stout',
        abv: '6.4',
        availability: 'Special Release'
      },
      {
        name: 'Odell IPA',
        style: 'American IPA',
        abv: '7.0',
        availability: 'Year-Round'
      }
    ]
  },
  {
    name: 'Loveland Aleworks',
    city: 'Loveland',
    food: 'no',
    dog_friendly: 'no',
    outdoor_seating: 'yes',
    website: 'www.lovelandaleworks.com/',
    beers: [
      {
        name: 'Hops in Translation',
        style: 'American Pale Ale',
        abv: '5.6',
        availability: 'Rotating'
      },
      {
        name: 'Tripel',
        style: 'Belgian Tripel',
        abv: '7.8',
        availability: 'Year-Round'
      }
    ]
  },
  {
    name: 'Elevation Beer Company',
    city: 'Poncha Springs',
    food: 'yes',
    dog_friendly: 'yes',
    outdoor_seating: 'yes',
    website: 'www.elevationbeerco.com',
    beers: [
      {
        name: 'First Cast',
        style: 'American IPA',
        abv: '6.5',
        availability: 'Year-Round'
      },
      {
        name: 'Little Mo\'',
        style: 'American Porter',
        abv: '6.2',
        availability: 'Year-Round'
      }
    ]
  },
  {
    name: 'FH Beerworks',
    city: 'Colorado Springs',
    food: 'yes',
    dog_friendly: 'yes',
    outdoor_seating: 'no',
    website: 'www.fieldhousebrew.com',
    beers: [
      {
        name: 'Paralysis By Analysis',
        style: 'American IPA',
        abv: '6.5',
        availability: 'Year-Round'
      },
      {
        name: 'Fist Pump',
        style: 'Milk Stout',
        abv: '6.5',
        availability: 'Year-Round'
      }
    ]
  },
  {
    name: 'Black Project Spontaneous & Wild Ales',
    city: 'Denver',
    food: 'no',
    dog_friendly: 'no',
    outdoor_seating: 'no',
    website: 'www.blackprojectbeer.com',
    beers: [
      {
        name: 'Jumpseat',
        style: 'American Wild Ale',
        abv: '6.2',
        availability: 'Special Release'
      },
      {
        name: 'Flyby',
        style: 'American Wild Ale',
        abv: '7.0',
        availability: 'Special Release'
      }
    ]
  },
  {
    name: 'FATE Brewing Company',
    city: 'Boulder',
    food: 'yes',
    dog_friendly: 'no',
    outdoor_seating: 'yes',
    website: 'www.fatebrewingcompany.com/',
    beers: [
      {
        name: 'Parcae',
        style: 'Belgian Pale Ale',
        abv: '5',
        availability: 'Year-Round'
      },
      {
        name: 'Caramel Pumpkin Stout',
        style: 'Pumpkin Beer',
        abv: '4.2',
        availability: 'Seasonal'
      }
    ]
  }
]

module.exports = breweryData;
