var http_mocks = require('node-mocks-http')
  , should = require('should')
  , mockery = require('mockery');

function buildResponse() {
  return http_mocks.createResponse({
    eventEmitter: require('events').EventEmitter
  });
}

describe('Controller Client', function() {

  before(function(){
    mockery.enable({
      warnOnUnregistered: false
    });
    
    mockery.registerMock('../models/client', {
      list: (cb) => cb(null, [{name:'First Client'}, {name:'Second Client'}]),
      create: (name, cb) => cb(null, {name: name, id: Math.random()})
    });
    this.controller = require('../controllers/clients');
  });

  after(function(){
    mockery.disable();
  });
  
  it('list Clients', function() {
    var response = buildResponse();
    var request = http_mocks.createRequest({
      method: 'GET',
      url: '/api/clients',
    });

    response.on('end', function(){
      response._isJSON().should.be.true;
      var data = JSON.parse(response._getData());
      should.not.exist(data.error);
      data.client.length.should.eql(2);
      data.client[0].name.should.eql("First Client");
      data.client[1].name.should.eql("Second Client");

      done();
    });

    this.controller.list(request, response);
  });

  it('create a new Client', function() {
    var response = buildResponse();
    var request = http_mocks.createRequest({
      method: 'POST',
      url: '/api/clients',
    });

    request.body = {
      name: 'Legomania'
    }

    response.on('end', function(){
      response._isJSON.should.be.true;
      var data = JSON.parse(response._getData());
      should.not.exist(data.error)
      data.client.name.should.eql(request.body.name);
      data.client.id.should.exist;

      done();
    });

    this.controller.create(request, response);
  });
  
});

describe('Controller Transaction', function() {
  it('create a new Transaction', function() {
    console.log('\tnot implemented.')
  });
  it('list Transactions', function() {
    console.log('\tnot implemented.')
  });
});

describe('Controller Payable', function() {
  it('get Avaiable', function() {
    console.log('\tnot implemented.')
  });
  it('get Waiting Funds', function() {
    console.log('\tnot implemented.')
  });
});
