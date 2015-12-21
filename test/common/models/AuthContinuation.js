'use strict';

var expect = require('chai').expect,
    jmap = require('../../../dist/jmap-client');

describe('The AuthContinuation class', function() {
  describe('constructor', function() {
    it('should throw if payload parameter is not defined', function() {
      expect(function() {
        new jmap.AuthContinuation();
      }).to.throw(Error);
    });

    it('should throw if payload.continuationToken parameter is not defined', function() {
      expect(function() {
        var payload = {methods: []};

        new jmap.AuthContinuation(payload);
      }).to.throw(Error);
    });

    it('should throw if payload.methods parameter is not defined', function() {
      expect(function() {
        var payload = {continuationToken: 'continuationToken1'};

        new jmap.AuthContinuation(payload);
      }).to.throw(Error);
    });

    it('should throw if payload.methods parameter is not an array', function() {
      expect(function() {
        var payload = {continuationToken: 'continuationToken1', methods: 'password'};

        new jmap.AuthContinuation(payload);
      }).to.throw(Error);
    });

    it('should expose continuationToken and methods properties', function() {
      var payload = {continuationToken: 'continuationToken1', methods: ['password', 'external']};
      var authContinuation = new jmap.AuthContinuation(payload);

      expect(authContinuation.continuationToken).to.equal(payload.continuationToken);
      expect(authContinuation.methods).to.deep.equal(payload.methods);
    });

  });
});
