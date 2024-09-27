var supertest = require('supertest'),
app = require('../app');

const testCompany = {
    name : 'EXPERDECO',
    siren: '303830244',
    siret: '30383024400024',
    address: '70 Route du Giffre, 74970 Marignier',
    phone: {
        prefix: '+33',
        number: '450346354'
    } 
};

const resultExpected = {
  name: 'Experdéco',
  address: '70 Route du Giffre, 74970 Marignier, France',
  phone: '+33 4 50 34 63 54'
};

exports.findContactByCompanyName = function(done){
    supertest(app)
    .get('/companies/contact')
    .query({name: testCompany.name})
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200,resultExpected)
    .end(done);
  };

exports.findContactByCompanySiret = function(done){
    supertest(app)
    .get('/companies/contact')
    .query({siret: testCompany.siret})
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200,resultExpected)
    .end(done);
  };

exports.findContactByCompanySiren = function(done){
    supertest(app)
    .get('/companies/contact')
    .query({siren: testCompany.siren})
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200,resultExpected)
    .end(done);
  };

  exports.findContactByCompanyAddress = function(done){
    supertest(app)
    .get('/companies/contact')
    .query({address: testCompany.address})
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200,resultExpected)
    .end(done);
  };

  exports.noParamsInBodyRequest = function(done){
    supertest(app)
    .get('/companies/contact')
    .query({})
    .expect(400)
    .end(done);
  };

  exports.noBodyInRequest = function(done){
    supertest(app)
    .get('/companies/contact')
    .expect(400)
    .end(done);
  };

  exports.companyNameNotFound = function(done){
    supertest(app)
    .get('/companies/contact')
    .query({name: '  '})
    .set('Accept', 'application/json')
    .expect(404)
    .end(done);
  };

  exports.companySiretNotFound = function(done){
    supertest(app)
    .get('/companies/contact')
    .query({siret: '999999'})
    .set('Accept', 'application/json')
    .expect(404)
    .end(done);
  };

  exports.companySirenNotFound = function(done){
    supertest(app)
    .get('/companies/contact')
    .query({siren: '999999'})
    .set('Accept', 'application/json')
    .expect(404)
    .end(done);
  };