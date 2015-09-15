'use strict';

var expect = require('chai').expect,
    jmap = require('../../dist/jmap-client').jmap,
    q = require('q');

describe('The Client class', function() {

  describe('The constructor', function() {

    it('should throw an Error if transport is not defined', function() {
      expect(function() {
        new jmap.Client();
      }).to.throw(Error);
    });

    it('should set transport.promiseProvider to the given promise provider', function() {
      var promiseProvider = { promise: 'provider' },
          client = new jmap.Client({}, promiseProvider);

      expect(client.transport.promiseProvider).to.deep.equal(promiseProvider);
    });

    it('should set transport.promiseProvider to an instance of ES6PromiseProvider by default', function() {
      var client = new jmap.Client({});

      expect(client.transport.promiseProvider).to.be.an.instanceof(jmap.ES6PromiseProvider);
    });

  });

  describe('The withAuthenticationToken method', function() {

    it('should store the token as authToken', function() {
      expect(new jmap.Client({}).withAuthenticationToken('token').authToken).to.equal('token');
    });

  });

  describe('The withAPIUrl method', function() {

    it('should store the url as apiUrl', function() {
      expect(new jmap.Client({}).withAPIUrl('https://jmap.open-paas.org').apiUrl).to.equal('https://jmap.open-paas.org');
    });

  });

  describe('The getAccounts method', function() {

    it('should post on the API url', function(done) {
      new jmap.Client({
        post: function(url) {
          expect(url).to.equal('https://test');

          return q.reject();
        }
      })
        .withAPIUrl('https://test')
        .withAuthenticationToken('token')
        .getAccounts()
        .then(null, done);
    });

    it('should send correct HTTP headers, including Authorization=token', function(done) {
      new jmap.Client({
        post: function(url, headers) {
          expect(headers).to.deep.equal({
            Authorization: 'token',
            'Content-Type': 'application/json',
            Accept: 'application/json'
          });

          return q.reject();
        }
      })
        .withAPIUrl('https://test')
        .withAuthenticationToken('token')
        .getAccounts()
        .then(null, done);
    });

    it('should send a valid JMAP "getAccounts" request body when there is no options', function(done) {
      new jmap.Client({
        post: function(url, headers, body) {
          expect(body).to.deep.equal([['getAccounts', {}, '#0']]);

          return q.reject();
        }
      })
        .withAPIUrl('https://test')
        .withAuthenticationToken('token')
        .getAccounts()
        .then(null, done);
    });

    it('should send a valid JMAP "getAccounts" request body, forwarding options', function(done) {
      new jmap.Client({
        post: function(url, headers, body) {
          expect(body).to.deep.equal([['getAccounts', { sinceState: 'state' }, '#0']]);

          return q.reject();
        }
      })
        .withAPIUrl('https://test')
        .withAuthenticationToken('token')
        .getAccounts({ sinceState: 'state' })
        .then(null, done);
    });

    it('should reject the promise if the JMAP response is invalid', function(done) {
      new jmap.Client({
        post: function() {
          return q('Invalid JMAP response');
        }
      })
        .withAPIUrl('https://test')
        .withAuthenticationToken('token')
        .getAccounts()
        .then(null, function() { done(); });
    });

    it('should resolve the promise with an array of Account objects when the response is valid', function(done) {
      var client = new jmap.Client({
        post: function() {
          return q([['accounts', {list: [{id: 'id'}, {id: 'id2'}]}, '#0']]);
        }
      });

      client
        .withAPIUrl('https://test')
        .withAuthenticationToken('token')
        .getAccounts()
        .then(function(data) {
          expect(data).to.deep.equal([
            new jmap.Account(client, 'id'),
            new jmap.Account(client, 'id2')
          ]);

          done();
        });
    });

  });

});
