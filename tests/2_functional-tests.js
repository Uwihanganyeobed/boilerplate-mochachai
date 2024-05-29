const chai = require('chai');
const assert = chai.assert;

const server = require('../server');

const chaiHttp = require('chai-http');
chai.use(chaiHttp);

suite('Functional Tests', function () {
  this.timeout(5000);
  suite('Integration tests with chai-http', function () {
    // #1
    /*Run Functional Tests on API Endpoints using Chai-HTTP*/ 
    test('Test GET /hello with no name', function (done) {
      chai
        .request(server)
        .keepOpen()
        .get('/hello')
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, 'hello Guest');
          done();
        });
    });
    // #2
    /*Run Functional Tests on API Endpoints using Chai-HTTP II*/ 
    test('Test GET /hello with your name', function (done) {
      chai
        .request(server)
        .keepOpen()
        .get('/hello?name=xy_z')
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, 'hello xy_z');
          done();
        });
    });
    // #3
    /*Run Functional Tests on an API Response using Chai-HTTP III - PUT method*/ 
    test('Send {surname: "Colombo"}', function (done) {
      chai
        .request(server)
        .keepOpen()
        .put('/travellers')
        .send({
          "surname": "Colombo"
        })
        .end(function (err, res) {
          assert.equal(res.status, 200)
          assert.equal(res.type, 'application/json')
          assert.equal(res.body.name, 'Cristoforo')
          assert.equal(res.body.surname, 'Colombo')
          done();
        });
    });
    // #4
    /*Run Functional Tests on an API Response using Chai-HTTP IV - PUT method*/ 
    test('Send {surname: "da Verrazzano"}', function (done) {
      chai
      .request(server)
      .keepOpen()
      .put('/travellers')
      .send({
        "surname": "da Verrazzano"
      })
      .end(function(err,res){
        assert.equal(res.status, 200)
        assert.equal(res.type, 'application/json')
        assert.equal(res.body.name, 'Giovanni')
        assert.equal(res.body.surname, 'da Verrazzano')
        done();
      })
    });
  });
});

const Browser = require('zombie');
Browser.site = 'http://localhost:3000/';
const browser = new Browser();
suite('Functional Tests with Zombie.js', function() {
  this.timeout(5000);
  
  suiteSetup(function(done) {
    return browser.visit('/', done);
  });
 /*
  suite('Headless browser', function() {
    test('should have a working "site" property', function() {
      assert.isNotNull(browser.site);
    });
  });
   
  suite('"Famous Italian Explorers" form', function () {
    // #5
    test('Submit the surname "Colombo" in the HTML form', function (done) {
      assert.fail();

      done();
    });
    // #6
    test('Submit the surname "Vespucci" in the HTML form', function (done) {
      assert.fail();

      done();
    });
  });*/
});