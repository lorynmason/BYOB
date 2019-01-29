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

app.get('/api/beers/:id', (request, response) => {
  const beerId = parseInt(request.params.id)
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

app.get('/api/breweries/:id', (request, response) => {
  const breweryId = parseInt(request.params.id)
  database('breweries').select()
  .then((breweries) => {
    const matchingBrewery = breweries.find((brewery) => {
      return brewery.id === breweryId
    })
    response.status(200).json(matchingBrewery)
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

app.delete('/api/beers/:id', (request, response) => {
  const beerId = parseInt(request.params.id)
  database('beers').where('id', beerId).delete()
    .then(beer => {
      response.status(201).send('deleted')
    })
    .catch(error => {
      response.status(500).json({ error })
    })
})

app.delete('/api/breweries/:id', (request, response) => {
  const breweryId = request.params.id;
  database('beers').select().where('brewery_id', breweryId).del()
  .then((breweries) => {
    response.status(200).json(breweries)
  })
  database('breweries').select().where('id', breweryId).del()
  .catch((error) => {
    response.status(500).json({ error });
  });
})

app.put('/api/breweries/:id', (request, response) => {
  const { id } = request.params

  database('breweries').where('id', request.params.id)
    .update({name: request.body.name, city: request.body.city, food: request.body.food, dog_friendly: request.body.dog_friendly, outdoor_seating: request.body.outdoor_seating, website: request.body.website})
    .then(() => {
      response.status(200).json(id);
    })
    .catch(error => {
      response.status(500).json({ error: error.message })
    })
});

app.put('/api/beers/:id', (request, response) => {
  const { id } = request.params

  database('beers').where('id', request.params.id)
    .update({name: request.body.name, style: request.body.style, abv: request.body.abv, availability: request.body.availability})
    .then(() => {
      response.status(200).json(id);
    })
    .catch(error => {
      response.status(500).json({ error: error.message })
    })
});



app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});
