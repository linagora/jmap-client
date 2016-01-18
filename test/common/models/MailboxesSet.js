'use strict';

var expect = require('chai').expect,
  jmap = require('../../../dist/jmap-client');

describe('The MailboxesSet class', function() {

  describe('The constructor', function() {

    it('should use default values for all fields if not defined', function() {
      var mailboxesSet = new jmap.MailboxesSet({});

      expect(mailboxesSet.accountId).to.equal('');
      expect(mailboxesSet.oldState).to.deep.equal('');
      expect(mailboxesSet.newState).to.deep.equal('');
      expect(mailboxesSet.created).to.deep.equal([]);
      expect(mailboxesSet.updated).to.deep.equal([]);
      expect(mailboxesSet.destroyed).to.deep.equal([]);
      expect(mailboxesSet.notCreated).to.deep.equal([]);
      expect(mailboxesSet.notUpdated).to.deep.equal([]);
      expect(mailboxesSet.notDestroyed).to.deep.equal([]);
    });

    it('should allow defining optional properties through the opts object', function() {
      expect(new jmap.MailboxesSet({}, { accountId: 'id' }).accountId).to.equal('id');
    });

  });

  describe('The fromJSONObject static method', function() {

    it('should throw an Error if object is not defined', function() {
      expect(function() {
        jmap.MailboxesSet.fromJSONObject({});
      }).to.throw(Error);
    });

    it('should return an instance of MailboxesSet', function() {
      expect(jmap.MailboxesSet.fromJSONObject({}, {})).to.be.an.instanceof(jmap.MailboxesSet);
    });

    it('should use default values for for all fields if not defined', function() {
      var mailboxesSet = jmap.MailboxesSet.fromJSONObject({}, {});

      expect(mailboxesSet.accountId).to.equal('');
      expect(mailboxesSet.oldState).to.deep.equal('');
      expect(mailboxesSet.newState).to.deep.equal('');
      expect(mailboxesSet.created).to.deep.equal([]);
      expect(mailboxesSet.updated).to.deep.equal([]);
      expect(mailboxesSet.destroyed).to.deep.equal([]);
      expect(mailboxesSet.notCreated).to.deep.equal([]);
      expect(mailboxesSet.notUpdated).to.deep.equal([]);
      expect(mailboxesSet.notDestroyed).to.deep.equal([]);
    });

    it('should copy values for all fields if defined', function() {
      var mailboxesSet = jmap.MailboxesSet.fromJSONObject({}, {
        accountId: 'id',
        created: {
          ABCD: {
            id: 'mailboxId'
          }
        }
      });

      expect(mailboxesSet.accountId).to.equal('id');
      expect(mailboxesSet.created).to.deep.equal({
        ABCD: {
          id: 'mailboxId'
        }
      });
    });

  });

});
