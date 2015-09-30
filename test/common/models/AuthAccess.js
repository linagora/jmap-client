'use strict';

var expect = require('chai').expect,
    jmap = require('../../../dist/jmap-client');

describe('The AuthAccess class', function() {
  describe('constructor', function() {
    it('should throw if payload parameter is not defined', function() {
      expect(function() {
        new jmap.AuthAccess();
      }).to.throw(Error);
    });

    it('should throw if payload.accessToken parameter is not defined', function() {
      var payload = {
        api: 'http://localhost:8899',
        eventSource: 'http://localhost:8899/eventSource',
        upload: 'http://localhost:8899/upload',
        download: 'http://localhost:8899/download'
      };
      expect(function() {
        new jmap.AuthAccess(payload);
      }).to.throw(Error);
    });

    it('should throw if payload.api parameter is not defined', function() {
      var payload = {
        accessToken: 'http://localhost:8899',
        eventSource: 'http://localhost:8899/eventSource',
        upload: 'http://localhost:8899/upload',
        download: 'http://localhost:8899/download'
      };
      expect(function() {
        new jmap.AuthAccess(payload);
      }).to.throw(Error);
    });

    it('should throw if payload.eventSource parameter is not defined', function() {
      var payload = {
        accessToken: 'http://localhost:8899',
        api: 'http://localhost:8899/eventSource',
        upload: 'http://localhost:8899/upload',
        download: 'http://localhost:8899/download'
      };
      expect(function() {
        new jmap.AuthAccess(payload);
      }).to.throw(Error);
    });

    it('should throw if payload.upload parameter is not defined', function() {
      var payload = {
        accessToken: 'http://localhost:8899',
        api: 'http://localhost:8899/eventSource',
        eventSource: 'http://localhost:8899/upload',
        download: 'http://localhost:8899/download'
      };
      expect(function() {
        new jmap.AuthAccess(payload);
      }).to.throw(Error);
    });

    it('should throw if payload.download parameter is not defined', function() {
      var payload = {
        accessToken: 'http://localhost:8899',
        api: 'http://localhost:8899/eventSource',
        upload: 'http://localhost:8899/upload',
        eventSource: 'http://localhost:8899/download'
      };
      expect(function() {
        new jmap.AuthAccess(payload);
      }).to.throw(Error);
    });

    it('should expose accessToken, api, eventSource, download and upload properties', function() {
      var payload = {
        accessToken: 'http://localhost:8899',
        api: 'http://localhost:8899/eventSource',
        eventSource: 'http://localhost:8899/eventSource',
        upload: 'http://localhost:8899/upload',
        download: 'http://localhost:8899/download'
      };

      var authToken = new jmap.AuthAccess(payload);
      expect(authToken.accessToken).to.equal(payload.accessToken);
      expect(authToken.api).to.equal(payload.api);
      expect(authToken.eventSource).to.equal(payload.eventSource);
      expect(authToken.download).to.equal(payload.download);
      expect(authToken.upload).to.equal(payload.upload);
    });
  });
});
