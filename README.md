# Colorado Brews API

## About the API
BYOB is an API that provides data about breweries in Denver and the beers that they carry. Users can add data to the API through POST requests, delete data with DELETE requests, and edit data with PUT requests.

### In order to use the api, you must have the following installed:
Node.js
NPM

### Installation
* Clone down this repo
* git clone https://github.com/lorynmason/BYOB.git
* Next install dependencies
* npm install

#### This will install
* Express, Body-parser, Knex, PostgreSQL Database, Mocha, Chai, Chai HTTP
Start the server with node server.js (or nodemon if you have it installed).

* Create local database
* Create database in PostgreSQL:
* psql
* CREATE DATABASE colorado_brews;

#### Run migrations using:
* knex migrate:latest
* Seed database:
* knex seed:run

#### Running Tests
* Create local testing environment
* Create test database in PostgreSQL:
* psql
* CREATE DATABASE byob_tests;

#### Run migrations using:
* NODE_ENV=test knex migrate:latest

#### Seed test database:
* NODE_ENV=test knex seed:run

#### To run the test suite
* npm run test

--------------------------------
## /api/breweries
### `GET`

Making an API call to this endpoint returns all breweries.

Data returned for each brewery includes:
* brewery id
* brewery name
* brewery city
* whether or not the brewery serves food 
* whether or not the brewery is dog friendly
* whether or not the brewery has outdoor seating
* brewery website
* creation timestamp
* update timestamp

##### Example of returned JSON:
```json
[{
    "id": 1,
    "name": "Odell",
    "city": "Fort Collins",
    "food": "no",
    "dog_friendly": "yes",
    "outdoor_seating": "yes",
    "website": "www.odell.com",
    "created_at": "2018-12-06T18:40:50.931Z",
    "updated_at": "2018-12-06T18:40:50.931Z"
  },
  {
    "id": 2,
    "name": "New Belgium",
    "city": "Fort Collins",
    "food": "yes",
    "dog_friendly": "no",
    "outdoor_seating": "no",
    "website": "www.newbelgium.com",
    "created_at": "2018-12-06T18:40:50.931Z",
    "updated_at": "2018-12-06T18:40:50.931Z"
  },
  {
    "id": 3,
    "name": "Avery Brewing",
    "city": "Denver",
    "food": "yes",
    "dog_friendly": "yes",
    "outdoor_seating": "yes",
    "website": "www.averybrewing.com",
    "created_at": "2018-12-06T18:40:50.931Z",
    "updated_at": "2018-12-06T18:40:50.931Z"
  }]
```

#### Querying database

Including the brewery city in the URL will return all breweries located in that city.

##### Example query:
```url
http://..../api/breweries/?city=Denver
```

##### Example of returned JSON:
```json
[{
  "id": 22,
   "name": "10 Barrel Brewing Company",
   "city": "Denver",
   "food": "yes",
   "dog_friendly": "no",
   "outdoor_seating": "yes",
   "website": "www.10barrel.com",
   "created_at": "2019-01-29T17:08:02.602Z",
   "updated_at": "2019-01-29T17:08:02.602Z"
},
{
  "id": 32,
  "name": "Black Project Spontaneous & Wild Ales",
  "city": "Denver",
  "food": "no",
  "dog_friendly": "no",
  "outdoor_seating": "no",
  "website": "www.blackprojectbeer.com",
  "created_at": "2019-01-29T17:08:02.612Z",
  "updated_at": "2019-01-29T17:08:02.612Z"
 }]
```

--------------------------------
## /api/breweries/:id/beers
### `GET`

Making an API call to this endpoint returns all beers for the breewery with the specified id.

Data returned for each beer:
* beer id
* beer name
* beer style
* beer abv
* beer availability
* corresponding brewery id
* creation timestamp
* update timestamp

##### Required:
An id that corresponds to an beer present in the database must be provided in the URL to return the desired JSON.

URL with specified id:
```url
http://..../api/breweries/1/beers
```
Corresponding brewery:
```json
{
  "id": 29,
   "name": "Odell Brewing Company",
   "city": "Denver",
   "food": "yes",
   "dog_friendly": "yes",
   "outdoor_seating": "yes",
   "website": "www.odellbrewing.com",
   "created_at": "2019-01-29T17:08:02.608Z",
   "updated_at": "2019-01-29T17:08:02.608Z"
 }
```

##### Example of returned JSON:

```json
[{
   "id": 19,
   "name": "Gramps",
   "style": "Oatmeal Stout",
   "abv": "6.4",
   "availability": "Special Release",
   "brewery_id": 29,
   "created_at": "2019-01-29T17:08:02.625Z",
   "updated_at": "2019-01-29T17:08:02.625Z"
  },
{
  "id": 20,
  "name": "Odell IPA",
  "style": "American IPA",
  "abv": "7.0",
  "availability": "Year-Round",
  "brewery_id": 29,
  "created_at": "2019-01-29T17:08:02.625Z",
  "updated_at": "2019-01-29T17:08:02.625Z"
}]
```

--------------------------------
## /api/beers
### `GET`

Making an API call to this endpoint returns all beers.

Data returned for each recipe:
* beer id
* beer name
* beer style
* beer abv
* beer availability
* corresponding brewery id
* creation timestamp
* update timestamp

##### Example of returned JSON:
```json
[{
    "id": 14,
    "name": "Wanda Mae's Peach Pie",
    "style": "American Brown Ale",
    "abv": "5.0",
    "availability": "Rotating",
    "brewery_id": 26,
    "created_at": "2019-01-29T17:08:02.623Z",
    "updated_at": "2019-01-29T17:08:02.623Z"
  },
  {
    "id": 19,
    "name": "Gramps",
    "style": "Oatmeal Stout",
    "abv": "6.4",
    "availability": "Special Release",
    "brewery_id": 29,
    "created_at": "2019-01-29T17:08:02.625Z",
    "updated_at": "2019-01-29T17:08:02.625Z"
  },
  {
    "id": 24,
    "name": "Tripel",
    "style": "Belgian Tripel",
    "abv": "7.8",
    "availability": "Year-Round",
    "brewery_id": 30,
    "created_at": "2019-01-29T17:08:02.628Z",
    "updated_at": "2019-01-29T17:08:02.628Z"
  }]
```

### `POST`

Making an API call to this endpoint adds a recipe to the database.

##### Required:
A correctly formatted recipe object must be provided in the request body in order to `post` to the database. 

##### Example of correctly formatted recipe object:
```
{ recipe_name: <STRING>, ingredients: <ARRAY>, steps: <ARRAY> }
```
```javascript
{
  recipe_name: 'brownie banana bread',
  ingredients: [
    {ingredient_name:'Betty Crocker Milk Chocolate brownie mix', aisle: 'baking'}, 
    {ingredient_name:'bananas', aisle: 'produce'}, 
    {ingredient_name:'butter', aisle: 'dairy'}, 
    {ingredient_name:'eggs', aisle: 'dairy'}, 
    {ingredient_name:'heavy whipping cream', aisle: 'dairy'}, 
    {ingredient_name:'mini chocolate chips', aisle: 'baking'}, 
  ],
  steps: [
    'preheat oven to 350 degrees F',
    'line an 8x5-inch loaf pan with parchment paper',
    'spray the bottom only with cooking spray',
    'put the brownie mix in a medium bowl',
    'stir in mashed bananas, butter, eggs, and whipping cream just until combined',
    'stir in 1 cup of the chocolate chips',
    'pour the batter into the prepared pan and spread evenly',
    'sprinkle the remaining chocolate chips on top',
    'bake 75 to 90 minutes or until a toothpick inserted into the center comes out clean',
    'cover the bread loosely with foil at about the 1 hour mark to avoid over-browning or burning on top',
    'cool 20 minutes, then remove the loaf from the pan to a cooling rack until completely cooled'
  ],
}
```

--------------------------------
## /api/v1/recipes/:id/ingredients
### `GET`

Making an API call to this endpoint returns all ingredients for the recipe with the specified id given.

Data returned for each ingredient includes:
* ingredient id
* ingredient name
* aisle where ingredient can be located in grocery store
* creation timestamp
* update timestamp

##### Required:
An id that corresponds to a recipe present in the database must be provided in the URL to return the desired JSON.

URL with specified id:
```url
http://..../api/vi/recipes/1/ingredients
```

Corresponding recipe:
```json
{
  "id": 1,
  "recipe_name": "billy's bootastic bacon & eggs",
  "created_at": "2018-12-06T18:40:50.886Z",
  "updated_at": "2018-12-06T18:40:50.886Z"
}
```

##### Example of returned JSON:
```json
[
  {
    "id": 1,
    "ingredient_name": "eggs",
    "aisle": "dairy",
    "created_at": "2018-12-06T18:40:50.931Z",
    "updated_at": "2018-12-06T18:40:50.931Z"
  },
  {
    "id": 2,
    "ingredient_name": "salt",
    "aisle": "spices",
    "created_at": "2018-12-06T18:41:50.931Z",
    "updated_at": "2018-12-06T18:41:50.931Z"
  },
  {
    "id": 3,
    "ingredient_name": "black pepper",
    "aisle": "spices",
    "created_at": "2018-12-06T18:42:50.931Z",
    "updated_at": "2018-12-06T18:42:50.931Z"
  }
]
```

--------------------------------
## /api/v1/recipes/:id/steps
### `GET`

Making an API call to this endpoint provides all steps for the recipe with the specified id.

Data returned for each step includes:
* step id
* step text
* recipe id

##### Required:
An id that corresponds to a recipe present in the database must be provided in the URL to return the desired JSON.

URL with specified id:
```url
http://..../api/vi/recipes/1/steps
```

Corresponding recipe:
```json
{
  "id": 1,
  "recipe_name": "billy's bootastic bacon & eggs",
  "created_at": "2018-12-06T18:40:50.886Z",
  "updated_at": "2018-12-06T18:40:50.886Z"
}
```

##### Example of returned JSON:
```json
[
  {
    "id": 1,
    "step_text": "crack eggs over bowl, being careful not to let any shells fall into bowl",
    "recipe_id": 1
  },
  {
    "id": 2,
    "step_text": "scramble eggs with fork or whisk until all yolks are broken and mixed with egg whites",
    "recipe_id": 1
  },
  {
    "id": 3,
    "step_text": "season with salt and black pepper",
    "recipe_id": 1
  },
  {
    "id": 4,
    "step_text": "pour mixture into skillet heated to medium on stovetop",
    "recipe_id": 1
  },
  {
    "id": 5,
    "step_text": "continue stirring in skillet until desired texture is reached",
    "recipe_id": 1
  },
]
```

### `POST`

Making an API call to this endpoint adds a step to the recipe in the database with the specified id.

##### Required:
* An id that corresponds to a recipe present in the database must be provided in the URL.

* A correctly formatted step object must be provided in the request body in order to `post` to the database.

URL with specified id:
```url
http://..../api/vi/recipes/1/steps
```

Corresponding recipe:
```json
{
  "id": 1,
  "recipe_name": "billy's bootastic bacon & eggs",
  "created_at": "2018-12-06T18:40:50.886Z",
  "updated_at": "2018-12-06T18:40:50.886Z"
}
```

##### Example of correctly formatted step object:
```
{ step_text: <STRING> }
```
```javascript
{
  step_text: 'add cheese if desired'
}
```

--------------------------------
## /api/v1/recipes/:id
### `PUT`

Making an API call to this endpoint updates recipe name of the recipe with the specified id.

##### Required:
An id that corresponds to a recipe present in the database must be provided in the URL.

URL with specified id:
```url
http://..../api/vi/recipes/1
```

### `DELETE`

Making an API call to this endpoint deletes the recipe with the specified id.

##### Required:
An id that corresponds to a recipe present in the database must be provided in the URL.

URL with specified id:
```url
http://..../api/vi/recipes/1
```

--------------------------------
## /api/v1/recipes/:recipe_id/steps/:step_num
### `PUT`

Making an API call to this endpoint updates specified step for a given recipe with the specified id.

##### Required:
* An id that corresponds to a recipe present in the database must be provided in the URL.

* The number of the step to be updated must be provided in the URL.

URL with specified ids:
```url
http://..../api/vi/recipes/1/steps/2
```

--------------------------------
## /api/v1/recipes/:recipe_id/steps
### `DELETE`

Making an API call to this endpoint deletes the last step of the recipe with the specified id.

##### Required:
An id that corresponds to a recipe present in the database must be provided in the URL.

URL with specified id:
```url
http://..../api/vi/recipes/1/steps
``` 










### Contributors 

Loryn Mason GITHUB: [@lorynmason](https://github.com/lorynmason) 

Ashley Levi GITHUB: [@ashleylevi](https://github.com/ashleylevi)
