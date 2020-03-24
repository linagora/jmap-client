const { expect } = require('chai');
const mockery = require('mockery');
const jmap = require('../../../dist/jmap-client');

function newTransport() {
  return new jmap.RequestTransport(new jmap.QPromiseProvider());
}

describe('The RequestTransport class', function() {

  beforeEach(function() {
    mockery.enable({
      useCleanCache: true,
      warnOnReplace: false,
      warnOnUnregistered: false
    });
  });

  afterEach(function() {
    mockery.disable();
  });

  function expectTransportError(err, cause, statusCode, responseText) {
    expect(err).to.be.a.instanceof(jmap.TransportError);
    expect(err.cause).to.equal(cause);
    expect(err.statusCode).to.equal(statusCode);
    expect(err.responseText).to.equal(responseText);
  }

  describe('The post method', function() {

    it('should reject the promise when an error occurs', function(done) {
      var cause = new Error('Failed');

      mockery.registerMock('request', function(options, callback) {
        callback(cause);
      });

      newTransport().post('').then(null, function(err) {
        expectTransportError(err, cause, 0, null);

        done();
      });
    });

    it.only('should reject the promise when status code is not 200 nor 201', function(done) {
      mockery.registerMock('request', function(options, callback) {
        callback(null, {
          statusCode: 400
        }, '{}');
      });

      newTransport().post('').then(null, function(err) {
        expectTransportError(err, null, 400, '{}');

        done();
      });
    });

    it('should resolve the promise when status code is 200, returning the body', function(done) {
      mockery.registerMock('request', function(options, callback) {
        callback(null, {
          statusCode: 200
        }, 'Success !');
      });

      newTransport().post('').then(function(data) {
        expect(data).to.equal('Success !');

        done();
      });
    });

    it('should resolve the promise when status code is 201, returning the body', function(done) {
      mockery.registerMock('request', function(options, callback) {
        callback(null, {
          statusCode: 201
        }, 'Accepted !');
      });

      newTransport().post('').then(function(data) {
        expect(data).to.equal('Accepted !');

        done();
      });
    });

    it('should build a correct options object and pass it to request', function() {
      mockery.registerMock('request', function(options) {
        expect(options).to.deep.equal({
          method: 'POST',
          url: 'https://jmap.open-paas.org',
          headers: {
            Authorization: 'SuperSecretToken'
          },
          body: {
            a: 'b',
            c: 0
          },
          json: true
        });
      });

      newTransport().post('https://jmap.open-paas.org', {
        Authorization: 'SuperSecretToken'
      }, {
        a: 'b',
        c: 0
      });
    });

    it('should build a correct options object and pass it to request, when using raw mode', function() {
      mockery.registerMock('request', function(options) {
        expect(options).to.deep.equal({
          method: 'POST',
          url: 'https://jmap.open-paas.org',
          headers: {
            Authorization: 'SuperSecretToken'
          },
          body: {},
          json: false
        });
      });

      newTransport().post('https://jmap.open-paas.org', {
        Authorization: 'SuperSecretToken'
      }, {}, true);
    });

  });

});
