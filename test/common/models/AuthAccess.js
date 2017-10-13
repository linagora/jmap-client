'use strict';

var expect = require('chai').expect,
    jmap = require('../../../dist/jmap-client');

describe('The AuthAccess class', function() {
  function defaultAccounts(id) {
    var accounts = {};

    accounts[id] = {
      name: 'test',
      isPrimary: true,
      isReadOnly: false,
      hasDataFor: ['mail']
    };

    return accounts;
  }

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
        new jmap.AuthAccess({}, payload);
      }).to.throw(Error);
    });

    it('should throw if payload.api parameter is not defined', function() {
      var payload = {
        username: 'user',
        accessToken: 'http://localhost:8899',
        eventSourceUrl: 'http://localhost:8899/eventSource',
        uploadUrl: 'http://localhost:8899/upload',
        downloadUrl: 'http://localhost:8899/download',
        signingId: 'signId1',
        signingKey: 'signKeyA',
        accounts: defaultAccounts('a1'),
        capabilities: {}
      };

      expect(function() {
        new jmap.AuthAccess({}, payload);
      }).to.throw(Error);
    });

    it('should throw if payload.eventSource parameter is not defined', function() {
      var payload = {
        username: 'user',
        accessToken: 'http://localhost:8899',
        apiUrl: 'http://localhost:8899/eventSource',
        uploadUrl: 'http://localhost:8899/upload',
        downloadUrl: 'http://localhost:8899/download',
        signingId: 'signId1',
        signingKey: 'signKeyA',
        accounts: defaultAccounts('a1'),
        capabilities: {}
      };

      expect(function() {
        new jmap.AuthAccess({}, payload);
      }).to.throw(Error);
    });

    it('should throw if payload.upload parameter is not defined', function() {
      var payload = {
        username: 'user',
        accessToken: 'http://localhost:8899',
        apiUrl: 'http://localhost:8899/eventSource',
        eventSourceUrl: 'http://localhost:8899/upload',
        downloadUrl: 'http://localhost:8899/download',
        signingId: 'signId1',
        signingKey: 'signKeyA',
        accounts: defaultAccounts('a1'),
        capabilities: {}
      };

      expect(function() {
        new jmap.AuthAccess({}, payload);
      }).to.throw(Error);
    });

    it('should throw if payload.download parameter is not defined', function() {
      var payload = {
        username: 'user',
        accessToken: 'http://localhost:8899',
        apiUrl: 'http://localhost:8899/eventSource',
        uploadUrl: 'http://localhost:8899/upload',
        eventSourceUrl: 'http://localhost:8899/download',
        signingId: 'signId1',
        signingKey: 'signKeyA',
        accounts: defaultAccounts('a1'),
        capabilities: {}
      };

      expect(function() {
        new jmap.AuthAccess({}, payload);
      }).to.throw(Error);
    });

    it('should throw if payload.username parameter is not defined', function() {
      var payload = {
        accessToken: 'http://localhost:8899',
        apiUrl: 'http://localhost:8899/eventSource',
        uploadUrl: 'http://localhost:8899/upload',
        downloadUrl: 'http://localhost:8899/download',
        eventSourceUrl: 'http://localhost:8899/download',
        signingId: 'signId1',
        signingKey: 'signKeyA',
        accounts: defaultAccounts('a1'),
        capabilities: {}
      };

      expect(function() {
        new jmap.AuthAccess({}, payload);
      }).to.throw(Error);
    });

    it('should throw if payload.signingId parameter is not defined', function() {
      var payload = {
        username: 'user',
        accessToken: 'http://localhost:8899',
        apiUrl: 'http://localhost:8899/eventSource',
        uploadUrl: 'http://localhost:8899/upload',
        downloadUrl: 'http://localhost:8899/download',
        eventSourceUrl: 'http://localhost:8899/download',
        signingKey: 'signKeyA',
        accounts: defaultAccounts('a1'),
        capabilities: {}
      };

      expect(function() {
        new jmap.AuthAccess({}, payload);
      }).to.throw(Error);
    });

    it('should throw if payload.signingKey parameter is not defined', function() {
      var payload = {
        username: 'user',
        accessToken: 'http://localhost:8899',
        apiUrl: 'http://localhost:8899/eventSource',
        uploadUrl: 'http://localhost:8899/upload',
        downloadUrl: 'http://localhost:8899/download',
        eventSourceUrl: 'http://localhost:8899/download',
        signingId: 'signId1',
        accounts: defaultAccounts('a1'),
        capabilities: {}
      };

      expect(function() {
        new jmap.AuthAccess({}, payload);
      }).to.throw(Error);
    });

    it('should throw if payload.accounts parameter is not defined', function() {
      var payload = {
        username: 'user',
        accessToken: 'http://localhost:8899',
        apiUrl: 'http://localhost:8899/eventSource',
        uploadUrl: 'http://localhost:8899/upload',
        downloadUrl: 'http://localhost:8899/download',
        eventSourceUrl: 'http://localhost:8899/download',
        signingId: 'signId1',
        signingKey: 'signKeyA',
        capabilities: {}
      };

      expect(function() {
        new jmap.AuthAccess({}, payload);
      }).to.throw(Error);
    });

    it('should throw if payload.capabilities parameter is not defined', function() {
      var payload = {
        username: 'user',
        accessToken: 'http://localhost:8899',
        apiUrl: 'http://localhost:8899/eventSource',
        uploadUrl: 'http://localhost:8899/upload',
        downloadUrl: 'http://localhost:8899/download',
        eventSourceUrl: 'http://localhost:8899/download',
        signingId: 'signId1',
        signingKey: 'signKeyA',
        accounts: defaultAccounts('a1')
      };

      expect(function() {
        new jmap.AuthAccess({}, payload);
      }).to.throw(Error);
    });

    it('should expose username, accessToken, signingId, signingKey, apiUrl, eventSourceUrl, downloadUrl, uploadUrl, accounts and capabilities properties', function() {
      var payload = {
        username: 'user',
        accessToken: 'http://localhost:8899',
        apiUrl: 'http://localhost:8899/eventSource',
        eventSourceUrl: 'http://localhost:8899/eventSource',
        uploadUrl: 'http://localhost:8899/upload',
        downloadUrl: 'http://localhost:8899/download',
        signingId: 'signId1',
        signingKey: 'signKeyA',
        accounts: defaultAccounts('account1'),
        capabilities: {
          'com.fastmail.message': {},
        }
      };

      payload.capabilities[jmap.Constants.CORE_CAPABILITIES_URI] = {
        maxSizeUpload: 2048,
        maxSizeRequest: 4096,
      };

      payload.capabilities[jmap.Constants.MAIL_CAPABILITIES_URI] = {
        maxSizeMessageAttachments: 2048,
        maxDelayedSend: 600,
      };

      var authToken = new jmap.AuthAccess({}, payload);

      ['username', 'accessToken', 'signingId', 'signingKey', 'apiUrl', 'eventSourceUrl', 'uploadUrl', 'downloadUrl'].forEach(function(property) {
        expect(authToken[property]).to.equal(payload[property]);
      });

      expect(authToken).to.have.property('accounts');
      expect(authToken.accounts).to.be.an.instanceof(Object);
      expect(authToken.accounts.account1).to.be.an.instanceof(jmap.Account);

      expect(authToken).to.have.property('serverCapabilities');
      expect(authToken.serverCapabilities).to.be.an.instanceof(jmap.ServerCapabilities);
      expect(authToken.serverCapabilities.maxSizeRequest).to.equal(4096);
      expect(authToken.serverCapabilities.maxSizeUpload).to.equal(2048);

      expect(authToken).to.have.property('mailCapabilities');
      expect(authToken.mailCapabilities).to.be.an.instanceof(jmap.MailCapabilities);
      expect(authToken.mailCapabilities.maxSizeMessageAttachments).to.equal(2048);
      expect(authToken.mailCapabilities.maxDelayedSend).to.equal(600);
    });
  });

  describe('The toJSONObject method', function() {

    it('should replicate the submitted payload', function() {
      var payload = {
        username: 'user',
        accessToken: 'http://localhost:8899',
        apiUrl: 'http://localhost:8899/eventSource',
        eventSourceUrl: 'http://localhost:8899/eventSource',
        uploadUrl: 'http://localhost:8899/upload',
        downloadUrl: 'http://localhost:8899/download',
        signingId: 'signId1',
        signingKey: 'signKeyA',
        accounts: defaultAccounts('account1'),
        capabilities: {}
      };

      payload.capabilities[jmap.Constants.CORE_CAPABILITIES_URI] = {
        maxCallsInRequest: 1,
        maxConcurrentRequests: 2,
        maxConcurrentUpload: 2,
        maxObjectsInGet: 100,
        maxObjectsInSet: 100,
        maxSizeRequest: 1024,
        maxSizeUpload: 1024,
      };

      var authAccess = new jmap.AuthAccess({}, payload);

      expect(authAccess.toJSONObject()).to.deep.equal(payload);
    });

  });
});
