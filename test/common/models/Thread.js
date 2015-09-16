'use strict';

var expect = require('chai').expect,
    jmap = require('../../../dist/jmap-client').jmap;

describe('The Thread class', function() {

  describe('The constructor', function() {

    it('should throw an Error if id is not defined', function() {
      expect(function() {
        new jmap.Thread({});
      }).to.throw(Error);
    });

    it('should use default value for messageIds if not defined', function() {
      expect(new jmap.Thread({}, 'id').messageIds).to.deep.equal([]);
    });

    it('should use default value for messageIds if an empty opts object is given', function() {
      expect(new jmap.Thread({}, 'id', {}).messageIds).to.deep.equal([]);
    });

    it('should allow defining messageIds through the opts object', function() {
      expect(new jmap.Thread({}, 'id', { messageIds: ['id1'] }).messageIds).to.deep.equal(['id1']);
    });

  });

  describe('The getMessages method', function() {

    it('should delegate to the jmap client, passing ids in the options, when no options are given', function(done) {
      new jmap.Thread({
        getMessages: function(options) {
          expect(options).to.deep.equal({
            ids: ['id1', 'id2']
          });

          done();
        }
      }, 'threadId', {
        messageIds: ['id1', 'id2']
      }).getMessages();
    });

    it('should preserve other options', function(done) {
      new jmap.Thread({
        getMessages: function(options) {
          expect(options).to.deep.equal({
            ids: ['id1', 'id2'],
            properties: ['id', 'body']
          });

          done();
        }
      }, 'threadId', {
        messageIds: ['id1', 'id2']
      }).getMessages({ properties: ['id', 'body'] });
    });

  });

  describe('The fromJSONObject static method', function() {

    it('should throw an Error if object is not defined', function() {
      expect(function() {
        jmap.Thread.fromJSONObject({});
      }).to.throw(Error);
    });

    it('should throw an Error if object.id is not defined', function() {
      expect(function() {
        jmap.Thread.fromJSONObject({}, {});
      }).to.throw(Error);
    });

    it('should return an instance of Thread', function() {
      expect(jmap.Thread.fromJSONObject({}, { id: 'id' })).to.be.an.instanceof(jmap.Thread);
    });

    it('should use default value for messageIds if not defined', function() {
      expect(jmap.Thread.fromJSONObject({}, { id: 'id' }).messageIds).to.deep.equal([]);
    });

    it('should copy value for messageIds if defined', function() {
      var thread = jmap.Thread.fromJSONObject({}, {
        id: 'id',
        messageIds: ['id1', 'id2']
      });

      expect(thread.id).to.equal('id');
      expect(thread.messageIds).to.deep.equal(['id1', 'id2']);
    });

  });

});
