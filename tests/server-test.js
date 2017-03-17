const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const server = require('../server.js');

chai.use(chaiHttp);

// describe('API Routes', function() {
describe('Server', () => {
  it('should exist', () => {
    expect(server).to.exist;
  });
});


describe('GET /', () => {
  it('should send back an html file', (done) => {
    chai.request(server)
    .get('/')
    .end((err, res) => {
      if(err) { done(err); }
      expect(res).to.have.status(200);
      expect(res).to.be.html;
      done();
    });
  });
});

describe('GET /api/v1/folders', () => {
  beforeEach(function(done){
      const folders = [{name: 'folder1', id: 1},
                      {name: 'folder2', id: 2}];
      server.locals.folders = folders;
      done();
    });

    afterEach(function(done){
      server.locals.folders = [];
      done();
    });


  it('should respond back with all folders', (done) => {
    chai.request(server)
    .get('/api/v1/folders')
    .end((err, res) => {
      if(err) {done(err) }
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body).to.be.a('array');
      expect(res.body).to.have.length(33);
      done();
    });
  });
});

describe('GET /api/v1/urls', () => {
  it('should respond back with all urls', (done) => {
    chai.request(server)
    .get('/api/v1/urls')
    .end((err, res) => {
      if(err) {done(err) }
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body).to.be.a('array');
      expect(res.body).to.have.length(0);
      done();
    });
  });
});

describe('POST /api/v1/folders', function() {
    beforeEach(function(done){
        const folders = [{name: 'folder1', id: 1},
                        {name: 'folder2', id: 2}];
        server.locals.folders = folders;
        done();
      });

      afterEach(function(done){
        server.locals.folders = [];
        done();
      });

  it('should create a new folder', function(done) {
    let folder = {folderName:'folder fun'}
    chai.request(server)
    .post('/api/v1/folders')
    .send(folder)
    .end((err, res) => {
    expect(res).to.have.status(200);
    expect(res).to.be.json;
    expect(res.body).to.be.a('array');
    done();
    });
  });
});

describe('POST /api/v1/urls', function() {
    // beforeEach(function(done){
    //     const urls = [{name: 'folder1', id: 1},
    //                     {name: 'folder2', id: 2}];
    //     server.locals.urls = urls;
    //     done();
    //   });
    //
    //   afterEach(function(done){
    //     server.locals.urls = [];
    //     done();
    //   });

  it('should create a new folder', function(done) {
    let folder = {folderName:'folder fun'}
    chai.request(server)
    .post('/api/v1/urls')
    .send(folder)
    .end((err, res) => {
    expect(res).to.have.status(500);
    expect(res).to.be.application;
    expect(res.body).to.be.a('object');
    done();
    });
  });
});
