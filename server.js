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

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});
