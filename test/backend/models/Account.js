'use strict';

var expect = require('chai').expect,
    jmap = require('../../../dist/jmap-client').jmap;

describe('The Account class', function() {

  describe('The constructor', function() {

    it('should throw an Error if id is not defined', function() {
      expect(function() {
        new jmap.Account({});
      }).to.throw(Error);
    });

    it('should use default values for name, isPrimary and isReadOnly if not defined', function() {
      var account = new jmap.Account({}, 'id');

      expect(account.name).to.equal('');
      expect(account.isPrimary).to.equal(false);
      expect(account.isReadOnly).to.equal(false);
    });

    it('should use default values for name, isPrimary and isReadOnly an empty opts object is given', function() {
      var account = new jmap.Account({}, 'id', {});

      expect(account.name).to.equal('');
      expect(account.isPrimary).to.equal(false);
      expect(account.isReadOnly).to.equal(false);
    });

    it('should allow defining optional properties through the opts object', function() {
      expect(new jmap.Account({}, 'id', { name: 'name' }).name).to.equal('name');
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

    it('should use default values for name, isPrimary and isReadOnly if not defined', function() {
      var account = jmap.Account.fromJSONObject({}, { id: 'id' });

      expect(account.name).to.equal('');
      expect(account.isPrimary).to.equal(false);
      expect(account.isReadOnly).to.equal(false);
    });

    it('should copy values for id, name, isPrimary and isReadOnly if defined', function() {
      var account = jmap.Account.fromJSONObject({}, {
        id: 'id',
        name: 'name',
        isPrimary: true,
        isReadOnly: true
      });

      expect(account.id).to.equal('id');
      expect(account.name).to.equal('name');
      expect(account.isPrimary).to.equal(true);
      expect(account.isReadOnly).to.equal(true);
    });

  });

});
