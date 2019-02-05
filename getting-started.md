# :beers::beer::beers::beer::beers::beer::beers::beer::beers::beers::beer::beers::beer::beers::beer::beers::beer::beers:
# Getting Started :beers:
* A macOS guide

### Dependencies

* Node.js - 6.1.0 or greater
* Knex - 0.15.2 or greater
* PostgreSQL database - 7.7.1

### Get it

If you're planning on [contributing](contributing.md) code to the project, it is a good idea to begin by forking this repo using the `Fork` button in the top-right corner of this screen. You should then be able to use `git clone` to copy your fork onto your local machine.

    git clone 
    git clone https://github.com/lorynmason/BYOB.git

Jump into your new local copy of the BYOB:

   ```
   cd BYOB
   ```

And then add an `upstream` remote that points to the main repo:

    git remote add upstream https://github.com/lorynmason/BYOB.git

Fetch the latest version of `master` from `upstream` (ie. the main repo):

git fetch upstream master

Install your node dependencies by running

```
$ npm i
```

This will install:
```
Express
Body-parser
Knex
PostgreSQL Database
Mocha
Chai
Chai HTTP
```


### Get it running

First, start the server with ``` node server.js ``` or ``` nodemon server.js ``` if nodemon is installed.

Next, you need to create the database user the app will use by manually typing the following in your terminal:

```sh
$ sudo -u postgres psql -c "CREATE DATABASE colorado_brews"
```

To setup and seed database run these knex commands
```
$ knex migrate:latest
$ knex seed:run
```
### Testing

To setup your testing database

```
$ psql -c "CREATE DATABASE boyb_tests"
```

Run migrations using

```
NODE_ENV=test knex migrate:latest
```

Seed test database

```
NODE_ENV=test knex seed:run
```

run `npm test` to see results

You can reference the knexfile.js to confirm.

# :beers::beer::beers::beer::beers::beer::beers::beer::beers::beers::beer::beers::beer::beers::beer::beers::beer::beers:
