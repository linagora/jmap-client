'use strict';

var expect = require('chai').expect,
    jmap = require('../../../dist/jmap-client');

describe('The CreateMessageAck class', function() {

  var usualResponse;

  beforeEach(function() {
    usualResponse = {
      id: 'id',
      blobId: 'blobId',
      size: 5,
      threadId: 'threadId'
    };
  });

  describe('The constructor', function() {

    it('should throw an Error if response has not the expected type', function() {
      expect(function() {
        new jmap.CreateMessageAck({}, []);
      }).to.throw(Error);

      expect(function() {
        new jmap.CreateMessageAck({}, 'bla');
      }).to.throw(Error);

      expect(function() {
        new jmap.CreateMessageAck({}, function() {});
      }).to.throw(Error);
    });

    it('should throw an Error if response.blobId is not defined', function() {
      expect(function() {
        delete usualResponse.blobId;
        new jmap.CreateMessageAck({}, usualResponse);
      }).to.throw(Error);
    });

    it('should throw an Error if response.size is not defined', function() {
      expect(function() {
        delete usualResponse.size;
        new jmap.CreateMessageAck({}, usualResponse);
      }).to.throw(Error);
    });

    it('should throw an Error if response.size has not the expected type', function() {
      expect(function() {
        usualResponse.size = 'number expected';
        new jmap.CreateMessageAck({}, usualResponse);
      }).to.throw(Error);
    });

    it('should assign responses fields as object properties', function() {
      expect(new jmap.CreateMessageAck({}, usualResponse))
        .to.deep.equal({
          _jmap: {},
          id: 'id',
          blobId: 'blobId',
          size: 5,
          threadId: 'threadId'
        });
    });

  });

});
