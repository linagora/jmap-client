'use strict';

var expect = require('chai').expect,
    jmap = require('../../../dist/jmap-client'),
    q = require('q');

describe('The Attachment class', function() {

  describe('The constructor', function() {

    it('should throw an Error if blobId is not defined', function() {
      expect(function() {
        new jmap.Attachment({});
      }).to.throw(Error);
    });

    it('should throw an Error if blobId is null', function() {
      expect(function() {
        new jmap.Attachment({}, null);
      }).to.throw(Error);
    });

    it('should use default value for all other fields if not defined', function() {
      var attachment = new jmap.Attachment({}, 'blobId');

      expect(attachment.blobId).to.equal('blobId');
      expect(attachment.url).to.equal(null);
      expect(attachment.type).to.equal(null);
      expect(attachment.name).to.equal(null);
      expect(attachment.size).to.equal(0);
      expect(attachment.cid).to.equal(null);
      expect(attachment.isInline).to.equal(false);
      expect(attachment.width).to.equal(null);
      expect(attachment.height).to.equal(null);
    });

    it('should use default value for all other fields iif an empty opts object is given', function() {
      var attachment = new jmap.Attachment({}, 'blobId', {});

      expect(attachment.blobId).to.equal('blobId');
      expect(attachment.url).to.equal(null);
      expect(attachment.type).to.equal(null);
      expect(attachment.name).to.equal(null);
      expect(attachment.size).to.equal(0);
      expect(attachment.cid).to.equal(null);
      expect(attachment.isInline).to.equal(false);
      expect(attachment.width).to.equal(null);
      expect(attachment.height).to.equal(null);
    });

    it('should allow defining other fields through the opts object', function() {
      var attachment = new jmap.Attachment({}, 'blobId', {
        url: 'https://jmap.org/download/blob/blobId/filename',
        type: 'application/javascript',
        name: 'jmap.js',
        size: 100,
        isInline: true,
        cid: 'cid',
        width: 20,
        height: 30
      });

      expect(attachment.blobId).to.equal('blobId');
      expect(attachment.url).to.equal('https://jmap.org/download/blob/blobId/filename');
      expect(attachment.type).to.equal('application/javascript');
      expect(attachment.name).to.equal('jmap.js');
      expect(attachment.size).to.equal(100);
      expect(attachment.cid).to.equal('cid');
      expect(attachment.isInline).to.equal(true);
      expect(attachment.width).to.equal(20);
      expect(attachment.height).to.equal(30);
    });

    it('should not guess the url if client has no downloadUrl', function() {
      expect(new jmap.Attachment({}, 'blobId', {}).url).to.equal(null);
    });

    it('should guess the url if client has no downloadUrl, setting blobId and name template variables', function() {
      expect(new jmap.Attachment({
        downloadUrl: 'https://jmap.org/dl/{blobId}/{name}'
      }, '1234', {
        name: 'file.js'
      }).url).to.equal('https://jmap.org/dl/1234/file.js');
    });

    it('should guess the url if client has no downloadUrl, using blobId as name if not defined', function() {
      expect(new jmap.Attachment({
        downloadUrl: 'https://jmap.org/dl/{blobId}/{name}'
      }, '1234').url).to.equal('https://jmap.org/dl/1234/1234');
    });

  });

  describe('The fromJSONObject static method', function() {

    it('should throw an Error if object is not defined', function() {
      expect(function() {
        jmap.Attachment.fromJSONObject({});
      }).to.throw(Error);
    });

    it('should throw an Error if object.blobId is not defined', function() {
      expect(function() {
        jmap.Attachment.fromJSONObject({}, {});
      }).to.throw(Error);
    });

    it('should return an instance of Attachment', function() {
      expect(jmap.Attachment.fromJSONObject({}, { blobId: 'blobId' })).to.be.an.instanceof(jmap.Attachment);
    });

    it('should use default values for for all other fields if not defined', function() {
      var attachment = jmap.Attachment.fromJSONObject({}, { blobId: 'blobId' });

      expect(attachment.url).to.equal(null);
      expect(attachment.type).to.equal(null);
      expect(attachment.name).to.equal(null);
      expect(attachment.size).to.equal(0);
      expect(attachment.cid).to.equal(null);
      expect(attachment.isInline).to.equal(false);
      expect(attachment.width).to.equal(null);
      expect(attachment.height).to.equal(null);
    });

    it('should copy values for all other fields if defined', function() {
      var attachment = jmap.Attachment.fromJSONObject({}, {
        blobId: 'blobId',
        url: 'https://jmap.org/download/blob/blobId/filename',
        type: 'application/javascript',
        name: 'jmap.js',
        size: 100,
        isInline: true,
        cid: 'cid',
        width: 20,
        height: 30
      });

      expect(attachment.blobId).to.equal('blobId');
      expect(attachment.url).to.equal('https://jmap.org/download/blob/blobId/filename');
      expect(attachment.type).to.equal('application/javascript');
      expect(attachment.name).to.equal('jmap.js');
      expect(attachment.size).to.equal(100);
      expect(attachment.cid).to.equal('cid');
      expect(attachment.isInline).to.equal(true);
      expect(attachment.width).to.equal(20);
      expect(attachment.height).to.equal(30);
    });

  });

  describe('The toJSONObject', function() {

    it('should produce blobId only object when no opts', function() {
      expect(new jmap.Attachment({}, 'blobId', {}).toJSONObject()).to.deep.equal({
        blobId: 'blobId',
        size: 0,
        isInline: false
      });
    });

    it('should produce partial json when only few opts', function() {
      var attachment = new jmap.Attachment({}, 'blobId', {
        name: 'jmap.js',
        isInline: false
      });

      expect(attachment.toJSONObject()).to.deep.equal({
        blobId: 'blobId',
        name: 'jmap.js',
        size: 0,
        isInline: false
      });
    });

    it('should produce full json when full opts', function() {
      var attachment = new jmap.Attachment({}, 'blobId', {
        url: 'https://jmap.org/download/blob/blobId/filename',
        type: 'application/javascript',
        name: 'jmap.js',
        size: 100,
        isInline: true,
        cid: 'cid',
        width: 20,
        height: 30
      });

      expect(attachment.toJSONObject()).to.deep.equal({
        blobId: 'blobId',
        url: 'https://jmap.org/download/blob/blobId/filename',
        type: 'application/javascript',
        name: 'jmap.js',
        size: 100,
        isInline: true,
        cid: 'cid',
        width: 20,
        height: 30
      });
    });

  });

  describe('The getSignedDownloadUrl method', function() {

    function newClient(post) {
      return new jmap.Client({
        post: post
      })
        .withAuthenticationToken('token')
        .withDownloadUrl('downloadUrl/{blobId}');
    }

    it('should throw an Error if url is not defined', function() {
      expect(function() {
        new jmap.Attachment({}, 'blobId').getSignedDownloadUrl();
      }).to.throw(Error);
    });

    it('should send an authenticated POST request to the downloadUrl, and reject on failure', function(done) {
      new jmap.Attachment(newClient(function(url, headers, data, raw) {
        expect(url).to.equal('downloadUrl/id1');
        expect(headers.Authorization).to.equal('token');
        expect(data).to.equal(null);
        expect(raw).to.equal(true);

        return q.reject();
      }), 'id1')
        .getSignedDownloadUrl()
        .then(null, done);
    });

    it('should send an authenticated POST request to the downloadUrl, then forge the signed URL using the token', function(done) {
      new jmap.Attachment(newClient(function() {
        return q('superSecretToken');
      }), 'id1')
        .getSignedDownloadUrl()
        .then(function(url) {
          expect(url).to.equal('downloadUrl/id1?access_token=superSecretToken');

          done();
        });
    });

  });

});
