'use strict';

var expect = require('chai').expect,
  jmap = require('../../../dist/jmap-client');

describe('The SetResponse class', function() {

  describe('The constructor', function() {

    it('should use default values for all fields if not defined', function() {
      var response = new jmap.SetResponse({});

      expect(response.accountId).to.equal(null);
      expect(response.oldState).to.equal(null);
      expect(response.newState).to.equal('');
      expect(response.created).to.deep.equal({});
      expect(response.updated).to.deep.equal([]);
      expect(response.destroyed).to.deep.equal([]);
      expect(response.notCreated).to.deep.equal({});
      expect(response.notUpdated).to.deep.equal({});
      expect(response.notDestroyed).to.deep.equal({});
    });

    it('should allow defining optional properties through the opts object', function() {
      expect(new jmap.SetResponse({}, { accountId: 'id' }).accountId).to.equal('id');
    });

  });

  describe('The fromJSONObject static method', function() {

    it('should throw an Error if object is not defined', function() {
      expect(function() {
        jmap.SetResponse.fromJSONObject({});
      }).to.throw(Error);
    });

    it('should return an instance of SetResponse', function() {
      expect(jmap.SetResponse.fromJSONObject({}, {})).to.be.an.instanceof(jmap.SetResponse);
    });

    it('should use default values for for all fields if not defined', function() {
      var response = jmap.SetResponse.fromJSONObject({}, {});

      expect(response.accountId).to.equal(null);
      expect(response.oldState).to.equal(null);
      expect(response.newState).to.equal('');
      expect(response.created).to.deep.equal({});
      expect(response.updated).to.deep.equal([]);
      expect(response.destroyed).to.deep.equal([]);
      expect(response.notCreated).to.deep.equal({});
      expect(response.notUpdated).to.deep.equal({});
      expect(response.notDestroyed).to.deep.equal({});
    });

    it('should copy values for all fields if defined', function() {
      var response = jmap.SetResponse.fromJSONObject({}, {
        accountId: 'id',
        created: {
          ABCD: {
            id: 'mailboxId'
          }
        }
      });

      expect(response.accountId).to.equal('id');
      expect(response.created).to.deep.equal({
        ABCD: {
          id: 'mailboxId'
        }
      });
    });

  });

});
