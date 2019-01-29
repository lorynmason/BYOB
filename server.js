const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.use( bodyParser.json() );

app.use(express.static('public'));

app.set('port', process.env.PORT || 3000);
app.locals.title = 'Colorado Brews';

app.get('/api/breweries', (request, response) => {
  database('breweries').select()
    .then((breweries) => {
      response.status(200).json(breweries);
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});

app.get('/api/beers', (request, response) => {
  database('beers').select()
    .then((beers) => {
      response.status(200).json(beers);
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});

app.get('/api/breweries/:id/beers', (request, response) => {
  const id = parseInt(request.params.id)
  database('beers').select()
    .then((beers) => {
      const matchingBeers = beers.filter((beer) => {
        return beer.brewery_id === id
      })
      response.status(200).json(matchingBeers)
    })
    .catch((error) => {
      response.status(500).json({ error });
    })
});

app.get('/api/beers/:beer_id', (request, response) => {
  const beerId = parseInt(request.params.beer_id)
  database('beers').select()
  .then((beers) => {
    const matchingBeer = beers.find((beer) => {
      return beer.id === beerId
    })
    response.status(200).json(matchingBeer)
  })
  .catch((error) => {
    response.status(500).json({ error });
  })
});

app.post('/api/breweries', (request, response) => {
  const { brewery } = request.body;

  for (let requiredParameter of ['name', 'city', 'food', 'dog_friendly', 'outdoor_seating', 'website']){
    if (!brewery[requiredParameter]) {
      return response
        .status(422)
        .send({ error: `Expected format: {name: <string>, city: <string>, food: <string>, dog_friendly: <string>, outdoor_seating: <string>, website: <string>}. You're missing a "${requiredParameter}" property`})
    }
  }

  database('breweries').insert(brewery, 'id')
    .then(breweryId => {
      response.status(201).json({...brewery, id: breweryId[0] })
    })
    .catch(error => {
      response.status(500).json({ error})
    });
})

app.post('/api/beers', (request, response) => {
  const { beer } = request.body;

  for (let requiredParameter of ['name', 'style', 'abv', 'availability']){
    if (!beer[requiredParameter]) {
      return response
        .status(422)
        .send({ error: `Expected format: {name: <string>, style: <string>, abv: <string>, availability: <string>}. You're missing a "${requiredParameter}" property`})
    }
  }

  database('beers').insert(beer, 'id')
    .then(beerId => {
      response.status(201).json({...beer, id: beerId[0] })
    })
    .catch(error => {
      response.status(500).json({ error})
    });
})



app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});
