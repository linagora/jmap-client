'use strict';

var expect = require('chai').expect,
    jmap = require('../../../dist/jmap-client');

describe('The AuthMethod class', function() {
  describe('constructor', function() {
    it('should throw if payload parameter is not defined', function() {
      expect(function() {
        new jmap.AuthMethod();
      }).to.throw(Error);
    });

    it('should throw if payload.type parameter is not defined', function() {
      expect(function() {
        var payload = {};

        new jmap.AuthMethod(payload);
      }).to.throw(Error);
    });

    it('should throw if payload.type parameter is not a string', function() {
      expect(function() {
        var payload = { type: [] };

        new jmap.AuthMethod(payload);
      }).to.throw(Error);
    });

    it('should expose the type property', function() {
      var payload = { type: 'password' };
      var authMethod = new jmap.AuthMethod(payload);

      expect(authMethod.type).to.equal(payload.type);
    });

    it('should expose all properties', function() {
      var payload = {
        type: 'u2f',
        appId: 'app-id',
        signChallenge: 'xyz'
      };
      var authMethod = new jmap.AuthMethod(payload);

      expect(authMethod).to.deep.equal(payload);
    });
  });
});
