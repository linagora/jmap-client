'use strict';

var expect = require('chai').expect,
    jmap = require('../../../dist/jmap-client');

describe('The Account class', function() {

  function accountWithDefaultValues(id) {
    return {
      _jmap: {},
      id: id,
      name: '',
      isPrimary: false,
      capabilities: null,
      mail: null,
      contacts: null,
      calendars: null
    };
  }

  describe('The constructor', function() {

    it('should throw an Error if id is not defined', function() {
      expect(function() {
        new jmap.Account({});
      }).to.throw(Error);
    });

    it('should use default values if opts is not defined', function() {
      expect(new jmap.Account({}, 'id')).to.deep.equal(accountWithDefaultValues('id'));
    });

    it('should use default values if an empty opts object is given', function() {
      expect(new jmap.Account({}, 'id', {})).to.deep.equal(accountWithDefaultValues('id'));
    });

    it('should allow defining optional properties through the opts object', function() {
      var expectedAccount = {
        name: 'name',
        isPrimary: true,
        capabilities: {
          maxSizeUpload: 123
        },
        mail: {
          isReadOnly: false,
          maxSizeMessageAttachments: 456,
          canDelaySend: true,
          messageListSortOptions: ['date']
        },
        contacts: {
          isReadOnly: true
        },
        calendars: {
          isReadOnly: true
        }
      };
      var account = new jmap.Account({}, 'id', expectedAccount);

      expectedAccount._jmap = {};
      expectedAccount.id = 'id';

      expect(account).to.deep.equal(expectedAccount);
    });

  });

  describe('The getMailboxes method', function() {

    it('should delegate to the jmap client, passing the accountId in the options', function(done) {
      new jmap.Account({
        getMailboxes: function(options) {
          expect(options.accountId).to.equal('id');

          done();
        }
      }, 'id').getMailboxes();
    });

    it('should preserve other options', function(done) {
      new jmap.Account({
        getMailboxes: function(options) {
          expect(options).to.deep.equal({
            accountId: 'id',
            a: 'b',
            c: 0
          });

          done();
        }
      }, 'id').getMailboxes({ a: 'b', c: 0 });
    });

  });

  describe('The fromJSONObject static method', function() {

    it('should throw an Error if object is not defined', function() {
      expect(function() {
        jmap.Account.fromJSONObject({});
      }).to.throw(Error);
    });

    it('should throw an Error if object.id is not defined', function() {
      expect(function() {
        jmap.Account.fromJSONObject({}, {});
      }).to.throw(Error);
    });

    it('should return an instance of Account', function() {
      expect(jmap.Account.fromJSONObject({}, { id: 'id' })).to.be.an.instanceof(jmap.Account);
    });

    it('should use default values if no opts is given', function() {
      expect(jmap.Account.fromJSONObject({}, { id: 'myId' })).to.deep.equal(accountWithDefaultValues('myId'));
    });

    it('should copy values for id, name and isPrimary if defined', function() {
      var account = jmap.Account.fromJSONObject({}, {
        id: 'id',
        name: 'name',
        isPrimary: true,
        calendars: {
          isReadOnly: true
        }
      });

      expect(account.id).to.equal('id');
      expect(account.name).to.equal('name');
      expect(account.isPrimary).to.equal(true);
      expect(account.calendars).to.deep.equal({ isReadOnly: true });
      expect(account.mail).to.equal(null);
    });

  });

  describe('The hasMail method', function() {

    it('should return false when the account has no mail capabilities', function() {
      expect(new jmap.Account({}, 'id').hasMail()).to.equal(false);
    });

    it('should return true when the account has mail capabilities defined', function() {
      expect(new jmap.Account({}, 'id', { mail: {} }).hasMail()).to.equal(true);
    });

  });

  describe('The hasCalendars method', function() {

    it('should return false when the account has no calendars capabilities', function() {
      expect(new jmap.Account({}, 'id').hasCalendars()).to.equal(false);
    });

    it('should return true when the account has calendars capabilities defined', function() {
      expect(new jmap.Account({}, 'id', { calendars: {} }).hasCalendars()).to.equal(true);
    });

  });

  describe('The hasContacts method', function() {

    it('should return false when the account has no contacts capabilities', function() {
      expect(new jmap.Account({}, 'id').hasContacts()).to.equal(false);
    });

    it('should return true when the account has contacts capabilities defined', function() {
      expect(new jmap.Account({}, 'id', { contacts: {} }).hasContacts()).to.equal(true);
    });

  });

});
