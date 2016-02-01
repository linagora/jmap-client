'use strict';

var expect = require('chai').expect,
    jmap = require('../../../dist/jmap-client'),
    q = require('q');

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

  describe('The destroy method', function() {

    it('should delegate to the jmap client, passing ids in the options', function(done) {
      new jmap.Thread({
        destroyMessages: function(ids) {
          expect(ids).to.deep.equal(['id1', 'id2']);

          done();
        }
      }, 'threadId', {
        messageIds: ['id1', 'id2']
      }).destroy();
    });

  });

  describe('The moveToMailboxWithRole method', function() {

    it('should delegate to the jmap client, passing the correct options', function(done) {
      new jmap.Thread({
        getMailboxWithRole: function(role) {
          expect(role).to.equal('inbox');

          return q({ id: 'inbox' });
        },
        setMessages: function(options) {
          expect(options).to.deep.equal({
            update: {
              id1: { mailboxIds: ['inbox'] },
              id2: { mailboxIds: ['inbox'] },
              id3: { mailboxIds: ['inbox'] }
            }
          });

          done();
        }
      }, 'threadId', {
        messageIds: ['id1', 'id2', 'id3']
      }).moveToMailboxWithRole('inbox');
    });

  });

  describe('The move method', function() {

    it('should delegate to the jmap client, passing the correct options', function(done) {
      new jmap.Thread({
        setMessages: function(options) {
          expect(options).to.deep.equal({
            update: {
              id1: { mailboxIds: ['m1', 'm2'] },
              id2: { mailboxIds: ['m1', 'm2'] },
              id3: { mailboxIds: ['m1', 'm2'] }
            }
          });

          done();
        }
      }, 'threadId', {
        messageIds: ['id1', 'id2', 'id3']
      }).move(['m1', 'm2']);
    });

  });

  describe('The setIsFlagged method', function() {

    it('should throw an Error if isFlagged is not defined', function() {
      expect(function() {
        jmap.Thread.setIsFlagged();
      }).to.throw(Error);
    });

    it('should throw an Error if isFlagged is not a Boolean', function() {
      expect(function() {
        jmap.Thread.setIsFlagged(1);
      }).to.throw(Error);
    });

    it('should delegate to the jmap client, passing the correct options', function(done) {
      new jmap.Thread({
        setMessages: function(options) {
          expect(options).to.deep.equal({
            update: {
              id1: { isFlagged: true },
              id2: { isFlagged: true },
              id3: { isFlagged: true }
            }
          });

          done();
        }
      }, 'threadId', {
        messageIds: ['id1', 'id2', 'id3']
      }).setIsFlagged(true);
    });

  });

  describe('The setIsUnread method', function() {

    it('should throw an Error if isUnread is not defined', function() {
      expect(function() {
        jmap.Thread.setIsUnread();
      }).to.throw(Error);
    });

    it('should throw an Error if isUnread is not a Boolean', function() {
      expect(function() {
        jmap.Thread.setIsUnread(1);
      }).to.throw(Error);
    });

    it('should delegate to the jmap client, passing the correct options', function(done) {
      new jmap.Thread({
        setMessages: function(options) {
          expect(options).to.deep.equal({
            update: {
              id1: { isUnread: true },
              id2: { isUnread: true },
              id3: { isUnread: true }
            }
          });

          done();
        }
      }, 'threadId', {
        messageIds: ['id1', 'id2', 'id3']
      }).setIsUnread(true);
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
