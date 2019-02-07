# :beers::beer::beers::beer::beers::beer::beers::beer::beers::beers::beer::beers::beer::beers::beer::beers::beer::beers:
# Colorado Brews API

## About the API :beers:
BYOB is an API that provides data about breweries in Denver and the beers that they carry. Users can add data to the API through POST requests, delete data with DELETE requests, and edit data with PUT requests.

See the deployed app [here](https://colorado-brews.herokuapp.com/api/breweries)

[Installation Instructions](getting-started.md)

[How to Contribute](contributing.md)

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
## /api/breweries/:id
### `GET`

Making an API call to this endpoint returns a brewery with the specified id.

* brewery id
* brewery name
* brewery city
* whether or not the brewery serves food 
* whether or not the brewery is dog friendly
* whether or not the brewery has outdoor seating
* brewery website
* creation timestamp
* update timestamp

##### Required:
An id that corresponds to a brewery present in the database must be provided in the URL to return the desired JSON.

URL with specified id:
```url
http://..../api/breweries/29
```
##### Example of returned JSON:

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

--------------------------------
## /api/breweries/:id/beers
### `GET`

Making an API call to this endpoint returns all beers for the brewery with the specified id.

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

## /api/breweries
### `POST`

Making an API call to this endpoint adds a brewery to the database.

##### Required:
A correctly formatted brewery object must be provided in the request body in order to `post` to the database. 

##### Example of correctly formatted brewery object:
```
{ name: <STRING>, city: <STRING>, food: <STRING>, dog_friendly: <STRING>, outdoor_seating: <STRING>, website: <STRING>  }
```
```javascript
{
  "name": "Vail Brewing Company",
  "city": "Vail",
  "food": "yes",
  "dog_friendly": "yes",
  "outdoor_seating": "no",
  "website": "www.vailbrewingco.com/", 
}
```

--------------------------------
## /api/breweries/:id
### `PUT`

Making an API call to this endpoint updates brewery properties of the brewery with the specified id.

##### Required:
An id that corresponds to a brewery present in the database must be provided in the URL.

URL with specified id:
```url
http://..../api/breweries/1
```

## /api/breweries/:id
### `DELETE`

Making an API call to this endpoint deletes the brewery with the specified id.

##### Required:
An id that corresponds to a brewery present in the database must be provided in the URL.

URL with specified id:
```url
http://..../api/breweries/1
```

--------------------------------
## /api/beers
### `GET`

Making an API call to this endpoint returns all beers.

Data returned for each beer:
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
--------------------------------
## /api/beers/:id
### `GET`

Making an API call to this endpoint returns a beer with the specified id

Data returned the beer includes:
* beer id
* beer name
* beer style
* beer abv
* beer availability
* corresponding brewery id
* creation timestamp
* update timestamp

##### Required:
An id that corresponds to a beer present in the database must be provided in the URL to return the desired JSON.

URL with specified id:
```url
http://..../api/beers/14
```

##### Example of returned JSON:
```json
{ 
  "id": 14,
  "name": "Wanda Mae's Peach Pie",
  "style": "American Brown Ale",
  "abv": "5.0",
  "availability": "Rotating",
  "brewery_id": 26,
  "created_at": "2019-01-29T17:08:02.623Z",
  "updated_at": "2019-01-29T17:08:02.623Z"
}
```

--------------------------------
## /api/beers
### `POST`

Making an API call to this endpoint adds a beer to the database

##### Required:
* A correctly formatted beer object must be provided in the request body in order to `post` to the database.

##### Example of correctly formatted beer object:
```
{ name: <STRING>, style: <STRING>, abv: <STRING>, availability: <STRING> }
```
```javascript
{
  "name": "Tripel",
  "style": "Belgian Tripel",
  "abv": "7.8",
  "availability": "Year-Round"
}
```

--------------------------------
## /api/beers/:id
### `PUT`

Making an API call to this endpoint updates beer properties of the beer with the specified id.

##### Required:
An id that corresponds to a beer present in the database must be provided in the URL.

URL with specified id:
```url
http://..../api/beers/1
```

## /api/beers/:id
### `DELETE`

Making an API call to this endpoint deletes the beer with the specified id.

##### Required:
An id that corresponds to a beer present in the database must be provided in the URL.

URL with specified id:
```url
http://..../api/beers/1
```

--------------------------------












### Contributors 

Loryn Mason GITHUB: [@lorynmason](https://github.com/lorynmason) 

Ashley Levi GITHUB: [@ashleylevi](https://github.com/ashleylevi)

# :beers::beer::beers::beer::beers::beer::beers::beer::beers::beers::beer::beers::beer::beers::beer::beers::beer::beers:
