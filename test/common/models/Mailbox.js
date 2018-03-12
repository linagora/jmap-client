'use strict';

var expect = require('chai').expect,
    jmap = require('../../../dist/jmap-client');

describe('The Mailbox class', function() {

  describe('The constructor', function() {

    it('should throw an Error if id is not defined', function() {
      expect(function() {
        new jmap.Mailbox({});
      }).to.throw(Error);
    });

    it('should throw an Error if name is not defined', function() {
      expect(function() {
        new jmap.Mailbox({}, 'id');
      }).to.throw(Error);
    });

    it('should use default values for all other fields if not defined', function() {
      var mailbox = new jmap.Mailbox({}, 'id', 'name');

      expect(mailbox.namespace).to.deep.equal({});
      expect(mailbox.parentId).to.equal(null);
      expect(mailbox.role).to.equal(jmap.MailboxRole.UNKNOWN);
      expect(mailbox.sharedWith).to.deep.equal({});
      expect(mailbox.sortOrder).to.equal(0);
      expect(mailbox.mustBeOnlyMailbox).to.equal(false);
      expect(mailbox.mayReadItems).to.equal(false);
      expect(mailbox.mayAddItems).to.equal(false);
      expect(mailbox.mayRemoveItems).to.equal(false);
      expect(mailbox.mayCreateChild).to.equal(false);
      expect(mailbox.mayRename).to.equal(false);
      expect(mailbox.mayDelete).to.equal(false);
      expect(mailbox.totalMessages).to.equal(0);
      expect(mailbox.unreadMessages).to.equal(0);
      expect(mailbox.totalThreads).to.equal(0);
      expect(mailbox.unreadThreads).to.equal(0);
      expect(mailbox.quotas).to.deep.equal({});
    });

    it('should use default values for all other fields if an empty opts object is given', function() {
      var mailbox = new jmap.Mailbox({}, 'id', 'name', {});

      expect(mailbox.namespace).to.deep.equal({});
      expect(mailbox.parentId).to.equal(null);
      expect(mailbox.role).to.equal(jmap.MailboxRole.UNKNOWN);
      expect(mailbox.sharedWith).to.deep.equal({});
      expect(mailbox.sortOrder).to.equal(0);
      expect(mailbox.mustBeOnlyMailbox).to.equal(false);
      expect(mailbox.mayReadItems).to.equal(false);
      expect(mailbox.mayAddItems).to.equal(false);
      expect(mailbox.mayRemoveItems).to.equal(false);
      expect(mailbox.mayCreateChild).to.equal(false);
      expect(mailbox.mayRename).to.equal(false);
      expect(mailbox.mayDelete).to.equal(false);
      expect(mailbox.totalMessages).to.equal(0);
      expect(mailbox.unreadMessages).to.equal(0);
      expect(mailbox.totalThreads).to.equal(0);
      expect(mailbox.unreadThreads).to.equal(0);
      expect(mailbox.quotas).to.deep.equal({});
    });

    it('should allow defining optional properties through the opts object', function() {
      expect(new jmap.Mailbox({}, 'id', 'name', { totalMessages: 10 }).totalMessages).to.equal(10);
    });

  });

  describe('The getMessageList method', function() {

    it('should delegate to the jmap client, passing an inMailboxes filter in the options, when no options are given', function(done) {
      new jmap.Mailbox({
        getMessageList: function(options) {
          expect(options).to.deep.equal({
            filter: {
              inMailboxes: ['id']
            }
          });

          done();
        }
      }, 'id', 'name').getMessageList();
    });

    it('should preserve other options', function(done) {
      new jmap.Mailbox({
        getMessageList: function(options) {
          expect(options).to.deep.equal({
            filter: {
              inMailboxes: ['id']
            },
            a: 'b',
            c: 0
          });

          done();
        }
      }, 'id', 'name').getMessageList({ a: 'b', c: 0 });
    });

  });

  describe('The fromJSONObject static method', function() {

    it('should throw an Error if object is not defined', function() {
      expect(function() {
        jmap.Mailbox.fromJSONObject({});
      }).to.throw(Error);
    });

    it('should throw an Error if object.id is not defined', function() {
      expect(function() {
        jmap.Mailbox.fromJSONObject({}, {});
      }).to.throw(Error);
    });

    it('should throw an Error if object.name is not defined', function() {
      expect(function() {
        jmap.Mailbox.fromJSONObject({}, { id: 'id' });
      }).to.throw(Error);
    });

    it('should return an instance of Mailbox', function() {
      expect(jmap.Mailbox.fromJSONObject({}, { id: 'id', name: 'name' })).to.be.an.instanceof(jmap.Mailbox);
    });

    it('should use default values for for all other fields if not defined', function() {
      var mailbox = jmap.Mailbox.fromJSONObject({}, { id: 'id', name: 'name' });

      expect(mailbox.namespace).to.deep.equal({});
      expect(mailbox.parentId).to.equal(null);
      expect(mailbox.role).to.equal(jmap.MailboxRole.UNKNOWN);
      expect(mailbox.sharedWith).to.deep.equal({});
      expect(mailbox.sortOrder).to.equal(0);
      expect(mailbox.mustBeOnlyMailbox).to.equal(false);
      expect(mailbox.mayReadItems).to.equal(false);
      expect(mailbox.mayAddItems).to.equal(false);
      expect(mailbox.mayRemoveItems).to.equal(false);
      expect(mailbox.mayCreateChild).to.equal(false);
      expect(mailbox.mayRename).to.equal(false);
      expect(mailbox.mayDelete).to.equal(false);
      expect(mailbox.totalMessages).to.equal(0);
      expect(mailbox.unreadMessages).to.equal(0);
      expect(mailbox.totalThreads).to.equal(0);
      expect(mailbox.unreadThreads).to.equal(0);
      expect(mailbox.quotas).to.deep.equal({});
    });

    it('should copy values for id, name, and all other fields if defined', function() {
      var mailbox = jmap.Mailbox.fromJSONObject({}, {
        id: 'id',
        name: 'name',
        namespace: {
          type: 'Personal'
        },
        parentId: 'parentId',
        role: 'inbox',
        sharedWith: {},
        sortOrder: 1,
        mustBeOnlyMailbox: true,
        mayReadItems: true,
        mayAddItems: true,
        mayRemoveItems: true,
        mayCreateChild: true,
        mayRename: true,
        mayDelete: false,
        totalMessages: 123,
        unreadMessages: 4,
        totalThreads: 567,
        unreadThreads: 8,
        quotas: { '#private&user': { STORAGE: { used: 10, max: 512 }, MESSAGE: { used: 42, max: null } } }
      });

      expect(mailbox.id).to.equal('id');
      expect(mailbox.name).to.equal('name');
      expect(mailbox.namespace.type).to.equal('Personal');
      expect(mailbox.parentId).to.equal('parentId');
      expect(mailbox.role).to.equal(jmap.MailboxRole.INBOX);
      expect(mailbox.sharedWith).to.deep.equal({});
      expect(mailbox.sortOrder).to.equal(1);
      expect(mailbox.mustBeOnlyMailbox).to.equal(true);
      expect(mailbox.mayReadItems).to.equal(true);
      expect(mailbox.mayAddItems).to.equal(true);
      expect(mailbox.mayRemoveItems).to.equal(true);
      expect(mailbox.mayCreateChild).to.equal(true);
      expect(mailbox.mayRename).to.equal(true);
      expect(mailbox.mayDelete).to.equal(false);
      expect(mailbox.totalMessages).to.equal(123);
      expect(mailbox.unreadMessages).to.equal(4);
      expect(mailbox.totalThreads).to.equal(567);
      expect(mailbox.unreadThreads).to.equal(8);
      expect(mailbox.quotas).to.deep.equal({ '#private&user': { STORAGE: { used: 10, max: 512 }, MESSAGE: { used: 42, max: null } } });
    });

  });

  describe('The update method', function() {

    it('should delegate to the jmap client, passing the id and the given options', function(done) {
      new jmap.Mailbox({
        updateMailbox: function(id, options) {
          expect(id).to.equal('id');
          expect(options).to.deep.equal({ newAttr1: 'newAttr1', newAttr2: 'newAttr2' });

          done();
        }
      }, 'id', 'name', { options: 'options' }).update({ newAttr1: 'newAttr1', newAttr2: 'newAttr2' });
    });

  });

  describe('The destroy method', function() {

    it('should delegate to the jmap client, passing the id as arg', function(done) {
      new jmap.Mailbox({
        destroyMailbox: function(id) {
          expect(id).to.equal('id');

          done();
        }
      }, 'id', 'name', { options: 'options' }).destroy();
    });

  });

});
