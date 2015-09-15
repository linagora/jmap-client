'use strict';

var expect = require('chai').expect,
    jmap = require('../../../dist/jmap-client').jmap;

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

      expect(mailbox.parentId).to.equal(null);
      expect(mailbox.role).to.equal(null);
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
    });

    it('should use default values for all other fields if an empty opts object is given', function() {
      var mailbox = new jmap.Mailbox({}, 'id', 'name', {});

      expect(mailbox.parentId).to.equal(null);
      expect(mailbox.role).to.equal(null);
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
    });

    it('should allow defining optional properties through the opts object', function() {
      expect(new jmap.Mailbox({}, 'id', 'name', { totalMessages: 10 }).totalMessages).to.equal(10);
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

      expect(mailbox.parentId).to.equal(null);
      expect(mailbox.role).to.equal(null);
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
    });

    it('should copy values for id, name, and all other fields if defined', function() {
      var mailbox = jmap.Mailbox.fromJSONObject({}, {
        id: 'id',
        name: 'name',
        parentId: 'parentId',
        role: 'inbox',
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
        unreadThreads: 8
      });

      expect(mailbox.id).to.equal('id');
      expect(mailbox.name).to.equal('name');
      expect(mailbox.parentId).to.equal('parentId');
      expect(mailbox.role).to.equal('inbox');
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
    });

  });

});
