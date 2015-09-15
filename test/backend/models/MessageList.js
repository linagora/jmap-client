'use strict';

var expect = require('chai').expect,
    jmap = require('../../../dist/jmap-client').jmap;

describe('The MessageList class', function() {

  describe('The constructor', function() {

    it('should use default values for all fields if not defined', function() {
      var msgList = new jmap.MessageList({});

      expect(msgList.accountId).to.equal('');
      expect(msgList.filter).to.equal(null);
      expect(msgList.sort).to.equal(null);
      expect(msgList.collapseThreads).to.equal(false);
      expect(msgList.position).to.equal(0);
      expect(msgList.total).to.equal(0);
      expect(msgList.threadIds).to.deep.equal([]);
      expect(msgList.messageIds).to.deep.equal([]);
    });

    it('should use default values for all fields when an empty opts object is given', function() {
      var msgList = new jmap.MessageList({}, {});

      expect(msgList.accountId).to.equal('');
      expect(msgList.filter).to.equal(null);
      expect(msgList.sort).to.equal(null);
      expect(msgList.collapseThreads).to.equal(false);
      expect(msgList.position).to.equal(0);
      expect(msgList.total).to.equal(0);
      expect(msgList.threadIds).to.deep.equal([]);
      expect(msgList.messageIds).to.deep.equal([]);
    });

    it('should allow defining optional properties through the opts object', function() {
      expect(new jmap.MessageList({}, { accountId: 'id' }).accountId).to.equal('id');
    });

  });

  describe('The fromJSONObject static method', function() {

    it('should throw an Error if object is not defined', function() {
      expect(function() {
        jmap.MessageList.fromJSONObject({});
      }).to.throw(Error);
    });

    it('should return an instance of MessageList', function() {
      expect(jmap.MessageList.fromJSONObject({}, {})).to.be.an.instanceof(jmap.MessageList);
    });

    it('should use default values for for all fields if not defined', function() {
      var msgList = jmap.MessageList.fromJSONObject({}, {});

      expect(msgList.accountId).to.equal('');
      expect(msgList.filter).to.equal(null);
      expect(msgList.sort).to.equal(null);
      expect(msgList.collapseThreads).to.equal(false);
      expect(msgList.position).to.equal(0);
      expect(msgList.total).to.equal(0);
      expect(msgList.threadIds).to.deep.equal([]);
      expect(msgList.messageIds).to.deep.equal([]);
    });

    it('should copy values for all fields if defined', function() {
      var msgList = jmap.MessageList.fromJSONObject({}, {
        accountId: 'id',
        filter: {
          inMailboxes: ['inbox']
        },
        sort: ['date desc'],
        collapseThreads: true,
        position: 0,
        total: 10,
        threadIds: ['threadId1', 'threadId2'],
        messageIds: ['msgId1']
      });

      expect(msgList.accountId).to.equal('id');
      expect(msgList.filter).to.deep.equal({
        inMailboxes: ['inbox']
      });
      expect(msgList.sort).to.deep.equal(['date desc']);
      expect(msgList.collapseThreads).to.equal(true);
      expect(msgList.position).to.equal(0);
      expect(msgList.total).to.equal(10);
      expect(msgList.threadIds).to.deep.equal(['threadId1', 'threadId2']);
      expect(msgList.messageIds).to.deep.equal(['msgId1']);
    });

  });

});
