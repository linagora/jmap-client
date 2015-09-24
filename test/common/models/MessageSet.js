'use strict';

var expect = require('chai').expect,
    jmap = require('../../../dist/jmap-client');

describe('The MessagesSet class', function() {

  describe('The constructor', function() {

    it('should use default values for all fields if not defined', function() {
      var messagesSet = new jmap.MessagesSet({});

      expect(messagesSet.accountId).to.equal('');
      expect(messagesSet.created).to.deep.equal({});
      expect(messagesSet.updated).to.deep.equal([]);
      expect(messagesSet.destroyed).to.deep.equal([]);
      expect(messagesSet.notCreated).to.deep.equal({});
      expect(messagesSet.notUpdated).to.deep.equal({});
      expect(messagesSet.notDestroyed).to.deep.equal({});
    });

    it('should use default values for all fields if not defined', function() {
      var messagesSet = new jmap.MessagesSet({}, {});

      expect(messagesSet.accountId).to.equal('');
      expect(messagesSet.created).to.deep.equal({});
      expect(messagesSet.updated).to.deep.equal([]);
      expect(messagesSet.destroyed).to.deep.equal([]);
      expect(messagesSet.notCreated).to.deep.equal({});
      expect(messagesSet.notUpdated).to.deep.equal({});
      expect(messagesSet.notDestroyed).to.deep.equal({});
    });

    it('should allow defining optional properties through the opts object', function() {
      expect(new jmap.MessagesSet({}, { accountId: 'id' }).accountId).to.equal('id');
    });

  });

  describe('The fromJSONObject static method', function() {

    it('should throw an Error if object is not defined', function() {
      expect(function() {
        jmap.MessagesSet.fromJSONObject({});
      }).to.throw(Error);
    });

    it('should return an instance of MessagesSet', function() {
      expect(jmap.MessagesSet.fromJSONObject({}, {})).to.be.an.instanceof(jmap.MessagesSet);
    });

    it('should use default values for for all fields if not defined', function() {
      var messagesSet = jmap.MessagesSet.fromJSONObject({}, {});

      expect(messagesSet.accountId).to.equal('');
      expect(messagesSet.created).to.deep.equal({});
      expect(messagesSet.updated).to.deep.equal([]);
      expect(messagesSet.destroyed).to.deep.equal([]);
      expect(messagesSet.notCreated).to.deep.equal({});
      expect(messagesSet.notUpdated).to.deep.equal({});
      expect(messagesSet.notDestroyed).to.deep.equal({});
    });

    it('should copy values for all fields if defined', function() {
      var msgList = jmap.MessagesSet.fromJSONObject({}, {
        accountId: 'id',
        created: {
          ABCD: {
            id: 'messageId'
          }
        }
      });

      expect(msgList.accountId).to.equal('id');
      expect(msgList.created).to.deep.equal({
          ABCD: {
            id: 'messageId'
          }
        });
    });

  });

});
