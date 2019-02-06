const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');
const environment = process.env.NODE_ENV || 'test';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);
require('events').EventEmitter.prototype._maxListeners = 100
chai.use(chaiHttp);


describe('API Routes', () => {
  beforeEach(done => {
    database.migrate.rollback()
      .then(() => {
        database.migrate.latest()
          .then(() => {
            return database.seed.run()
              .then(() => {
                done();
              })
          })
      })
  })

  describe('/api/breweries', () => {
    it('should GET: happy: return all the breweries', (done) => {
      chai
      .request(server)
      .get('/api/breweries')
      .end((err, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('array');
        response.body.length.should.equal(2);
        response.body[0].should.have.property('id');
        response.body[0].should.have.property('name');
        response.body[0].should.have.property('city');
        response.body[0].should.have.property('food');
        response.body[0].should.have.property('dog_friendly');
        response.body[0].should.have.property('website');    
        done();
      });
    })

    it('should GET: happy: return all the breweries that match search', (done) => {
      chai
      .request(server)
      .get('/api/breweries?city=portland')
      .end((err, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('array');
        response.body.length.should.equal(1);
        response.body[0].should.have.property('id');
        response.body[0].should.have.property('name');
        response.body[0].should.have.property('city');
        response.body[0].should.have.property('food');
        response.body[0].should.have.property('dog_friendly');
        response.body[0].should.have.property('website');    
        done();
      });
    })

    it('should GET: sad: return all the breweries that match search', (done) => {
      chai
      .request(server)
      .get('/api/breweries?city=pizza')
      .end((err, response) => {
        response.should.have.status(422);    
        done();
      });
    })

    it('should DELETE: happy: delete a single brewery', done => {
      chai.request(server)
      .delete('/api/breweries/2')
      .end((err, response) => {
        response.should.have.status(202)
        done()
      })
    })

    it('should DELETE: sad: delete a single brewery', done => {
      chai.request(server)
      .delete('/api/breweries/5000000')
      .end((err, response) => {
        response.should.have.status(422)
        done()
      })
    })

    it('should GET: happy: return a single brewey matching passed in id', (done) => {
      chai.request(server)
      .get('/api/breweries/1')
      .end((err, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('object');
        response.body.should.have.property('id');
        response.body.should.have.property('name');
        response.body.should.have.property('city');
        response.body.should.have.property('food');
        response.body.should.have.property('dog_friendly');
        response.body.should.have.property('website');
        response.body.should.have.property('outdoor_seating');   
        done();
      });
    })
 
    it('should POST: happy: add a new brewery', done => {
      chai.request(server)
      .post('/api/breweries')
      .send({brewery: {
        name: 'Odell',
        city: 'Fort Collins',
        food: 'yes',
        dog_friendly: 'yes',
        outdoor_seating: 'no',
        website: 'www.odell.com'
        }
      })
    .set('Content-Type', 'application/json')
    .end((err, response) => {
      response.should.have.status(201);
      response.body.should.be.a('object');
      response.body.should.have.property('name');
      response.body.should.have.property('city');
      response.body.should.have.property('food');
      response.body.should.have.property('dog_friendly');
      response.body.should.have.property('outdoor_seating');
      response.body.should.have.property('website');
      done();
    })
  })

  it('should POST: sad: fail to add a brewery', done => {
    chai.request(server)
    .post('/api/breweries')
    .send({brewery: {
      name: 'Odell',
      city: 'Fort Collins',
      food: 'yes',
      dog_friendly: 'yes',
      outdoor_seating: 'no'
      }
    })
    .set('Content-Type', 'application/json')
    .end((error, response) => {
      response.should.have.status(422)
      response.body.should.have.property('error');
      response.body.error.should.equal('Expected format: {name: <string>, city: <string>, food: <string>, dog_friendly: <string>, outdoor_seating: <string>, website: <string>}. You\'re missing a "website" property');
      done();
    })
  })

  it('should PATCH: happy: update a brewery', done => {
    chai.request(server)
      .patch('/api/breweries/2')
      .send({
        name: 'Super Awesome Brewing Company'
      })
      .end((error, response) => {
        response.should.have.status(200)
        response.body.should.be.a('object')
        response.body.should.have.property('id')
        response.body.id.should.equal(2)
        response.body.id.should.be.a('number')
        response.body.should.have.property('name')
        response.body.name.should.equal('Super Awesome Brewing Company')
        response.body.name.should.be.a('string')
        response.body.should.have.property('city')
        response.body.city.should.equal('Denver')
        response.body.city.should.be.a('string')
        response.body.should.have.property('food')
        response.body.food.should.equal('yes')
        response.body.food.should.be.a('string')
        response.body.should.have.property('dog_friendly')
        response.body.dog_friendly.should.equal('yes')
        response.body.dog_friendly.should.be.a('string')
        response.body.should.have.property('outdoor_seating')
        response.body.outdoor_seating.should.equal('yes')
        response.body.outdoor_seating.should.be.a('string')
        response.body.should.have.property('website') 
        response.body.website.should.equal('www.rouge.com')
        response.body.website.should.be.a('string')
        response.body.should.have.property('created_at')
        response.body.created_at.should.be.a('string')
        response.body.should.have.property('updated_at')
        response.body.updated_at.should.be.a('string')
        done()
      })
    })
  })

  describe('/api/beers', () => {
    it('should GET: happy: array of all beers', done => {
      chai.request(server)
      .get('/api/beers')
      .end((err, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('array');
        response.body[0].should.have.property('name');
        response.body[0].should.have.property('style');
        response.body[0].should.have.property('abv');
        response.body[0].should.have.property('availability');
        done();
      })
    });

    it('should POST: happy: should add a beer', (done) => {
      chai.request(server)
      .post('/api/beers')
      .send({beer: {
        abv: '5.6%',
        style: 'STOUT',  
        name: 'DOUBLE CHOCOLATE STOUT',
        availability: 'year round',
        brewery_id: 1
      }})
      .end((err, response) => {
        response.should.have.status(201);
        response.body.should.be.a('object');
        response.body.should.have.property('abv');
        response.body.should.have.property('name');
        response.body.should.have.property('style');
        response.body.should.have.property('availability');
        response.body.should.have.property('brewery_id');   
        done();
      });
    })

    it('should POST: sad: should add a beer', (done) => {
      chai.request(server)
      .post('/api/beers')
      .send({beer: {
        abv: '5.6%',
        style: 'STOUT'
      }})
      .end((err, response) => {
        response.should.have.status(422);
        response.body.should.be.a('object');  
        done();
      });
    })

  describe('/api/beers/:id', () => {
    it('should GET: happy: a single beer', done => {
      chai.request(server)
      .get('/api/beers/1')
      .end((err, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('object')
        done()
      })
    })

    it('should GET: sad: a single beer', done => {
      chai.request(server)
      .get('/api/beers/100')
      .end((err, response) => {
        response.should.have.status(420);
        done()
      })
    })

    it('should PUT: happy: edit a beer', (done) => {
      chai.request(server)
      .put('/api/beers/2')
      .send({
        abv: '8.3%',
        style: 'ale',  
        name: 'voodoo donut',
        availabilty: 'special release',
        brewery_id: 2 
      })
      .end((err, response) => {  
        response.should.have.status(200);
        done();
      });
    })

    it('should PUT: sad: edit a beer', (done) => {
      chai.request(server)
      .put('/api/beers/1000')
      .send({ 
      })
      .end((err, response) => {  
        response.should.have.status(500);
        done();
      });
    })

    it('should DELETE: happy: delete a single beer', done => {
      chai.request(server)
      .delete('/api/beers/1')
      .end((err, response) => {
        response.should.have.status(201)
        done()
      })
    })

    it('should DELETE: sad: fail to delete a beer', done => {
      chai.request(server)
      .delete('/api/beers/:id')
      .end((err, response) => {
        response.should.have.status(500)
        done()
      })
    })

    it('should PATCH: happy: edit a beer with only some changes', (done) => {
      chai.request(server)
      .patch('/api/beers/1')
      .send({
        style: 'sour',  
        name: 'Summer Brew',
        })
      .end((err, response) => {
        response.should.have.status(202);
        done()
      })
    })

    it('should PATCH: sad: not edit if not in correct format', (done) => {
      chai.request(server)
      .patch('/api/beers/1')
      .send({
        bob: 'something'
      })
      .end((err, response) => {
        response.should.have.status(422)
        done()
      })
    })

    it('should PATCH: sad: return a 404 if there is not a matching id', (done) => {
      chai.request(server)
      .patch('/api/beers/156789765678')
      .send({
        style: 'sour'
      })
      .end((err, response) => {
        response.should.have.status(404)
        done()
      })
    })

  })

  describe('/api/breweries/:id', () => {
    it('should PUT: happy: update brewery entry', done => {
      chai.request(server)
      .put('/api/breweries/2')
      .send({
        name: 'Odell',
        city: 'Fort Collins',
        food: 'no',
        dog_friendly: 'no',
        outdoor_seating: 'yes',
        website: "www.odell.com"
      })
      .end((err, response) => {
        response.should.have.status(200)
        done()
      })
    })

    it('should PUT: sad: not update brewery entry if incomplete', done => {
      chai.request(server)
      .put('/api/breweries/1')
      .send({})
      .end((err, response) => {
        response.should.have.status(500)
        done()
      })
    })
  })
})
  describe('/api/breweries/:id/beers', () => {
    it('should GET: happy: return a single brewery\'s beers matching passed in id', (done) => {
      chai.request(server)
      .get('/api/breweries/2/beers')
      .end((err, response) => {
        response.should.have.status(200);
        response.should.be.json
        response.body.should.be.a('array')
        response.body.length.should.equal(2)
        response.body[0].should.have.property('abv')
        response.body[0].should.have.property('name')
        response.body[0].should.have.property('style')
        response.body[0].should.have.property('availability')
        response.body[0].should.have.property('brewery_id')   
        done();
      });
    })
    it('should GET: sad: return a single brewery\'s beers matching passed in id', (done) => {
      chai.request(server)
      .get('/api/breweries/10000/beers')
      .end((err, response) => {
        response.should.have.status(422);
        done();
      });
    })
  })
})

