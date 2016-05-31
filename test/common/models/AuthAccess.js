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
        username: 'user',
        apiUrl: 'http://localhost:8899',
        eventSourceUrl: 'http://localhost:8899/eventSource',
        uploadUrl: 'http://localhost:8899/upload',
        downloadUrl: 'http://localhost:8899/download'
      };

      expect(function() {
        new jmap.AuthAccess(payload);
      }).to.throw(Error);
    });

    it('should throw if payload.api parameter is not defined', function() {
      var payload = {
        username: 'user',
        accessToken: 'http://localhost:8899',
        eventSourceUrl: 'http://localhost:8899/eventSource',
        uploadUrl: 'http://localhost:8899/upload',
        downloadUrl: 'http://localhost:8899/download'
      };

      expect(function() {
        new jmap.AuthAccess(payload);
      }).to.throw(Error);
    });

    it('should throw if payload.eventSource parameter is not defined', function() {
      var payload = {
        username: 'user',
        accessToken: 'http://localhost:8899',
        apiUrl: 'http://localhost:8899/eventSource',
        uploadUrl: 'http://localhost:8899/upload',
        downloadUrl: 'http://localhost:8899/download'
      };

      expect(function() {
        new jmap.AuthAccess(payload);
      }).to.throw(Error);
    });

    it('should throw if payload.upload parameter is not defined', function() {
      var payload = {
        username: 'user',
        accessToken: 'http://localhost:8899',
        apiUrl: 'http://localhost:8899/eventSource',
        eventSourceUrl: 'http://localhost:8899/upload',
        downloadUrl: 'http://localhost:8899/download'
      };

      expect(function() {
        new jmap.AuthAccess(payload);
      }).to.throw(Error);
    });

    it('should throw if payload.download parameter is not defined', function() {
      var payload = {
        username: 'user',
        accessToken: 'http://localhost:8899',
        apiUrl: 'http://localhost:8899/eventSource',
        uploadUrl: 'http://localhost:8899/upload',
        eventSourceUrl: 'http://localhost:8899/download'
      };

      expect(function() {
        new jmap.AuthAccess(payload);
      }).to.throw(Error);
    });

    it('should throw if payload.username parameter is not defined', function() {
      var payload = {
        accessToken: 'http://localhost:8899',
        apiUrl: 'http://localhost:8899/eventSource',
        uploadUrl: 'http://localhost:8899/upload',
        downloadUrl: 'http://localhost:8899/download',
        eventSourceUrl: 'http://localhost:8899/download'
      };

      expect(function() {
        new jmap.AuthAccess(payload);
      }).to.throw(Error);
    });

    it('should expose username, accessToken, apiUrl, eventSourceUrl, downloadUrl and uploadUrl properties', function() {
      var payload = {
        username: 'user',
        versions: [1],
        extensions: { 'com.fastmail.message': [1] },
        accessToken: 'http://localhost:8899',
        apiUrl: 'http://localhost:8899/eventSource',
        eventSourceUrl: 'http://localhost:8899/eventSource',
        uploadUrl: 'http://localhost:8899/upload',
        downloadUrl: 'http://localhost:8899/download'
      };

      var authToken = new jmap.AuthAccess(payload);

      ['username', 'accessToken', 'apiUrl', 'eventSourceUrl', 'uploadUrl', 'downloadUrl'].forEach(function(property) {
        expect(authToken[property]).to.equal(payload[property]);
      });
    });
  });
});
