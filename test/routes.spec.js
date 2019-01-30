const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');
const environment = process.env.NODE_ENV || 'test';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

chai.use(chaiHttp);


describe('API Routes', () => {
//   before(done => {
//     database.migrate.latest()
//   .then(() => {
//      database.seed.run()
//   })
//   done();
// });

beforeEach(done => {
  database.migrate
    .rollback()
    .then(() => database.migrate.latest())
    .then(() => database.seed.run())
    .then(() => done())
})

  describe('/api/breweries', () => {
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
  })

  describe('/api/beers', () => {
    it('should GET array of all beers', done => {
      chai.request(server)
      .get('/api/beers')
      .end((err, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('array');
        // console.log(response.body)
        response.body[0].should.have.property('name');
        response.body[0].should.have.property('style');
        response.body[0].should.have.property('abv');
        response.body[0].should.have.property('availability');
        done();
      })
    });

  describe('/api/beers/:id', () => {
    it('should GET a single beer', done => {
      chai.request(server)
      .get('/api/beers/1')
      .end((err, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('object')
        done()
      })
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
  })

  describe('/api/breweries/:id', () => {
    it('should PUT: happy: update brewery entry', done => {
      chai.request(server)
      .put('/api/breweries/1')
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
      .put('/api/breweries/:id')
      .send({})
      .end((err, response) => {
        response.should.have.status(500)
        done()
      })
    })
  })
})
})