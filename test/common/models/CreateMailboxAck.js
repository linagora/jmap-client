'use strict';

var expect = require('chai').expect,
  jmap = require('../../../dist/jmap-client');

describe('The CreateMailboxAck class', function() {

  var usualResponse;

  beforeEach(function() {
    usualResponse = {
      id: 'id',
      mustBeOnlyMailbox: true
    };
  });

  describe('The constructor', function() {

    it('should throw an Error if response has not the expected type', function() {
      expect(function() {
        new jmap.CreateMailboxAck({}, []);
      }).to.throw(Error);

      expect(function() {
        new jmap.CreateMailboxAck({}, 'bla');
      }).to.throw(Error);

      expect(function() {
        new jmap.CreateMailboxAck({}, function() {});
      }).to.throw(Error);
    });

    it('should throw an Error if response.id is not defined', function() {
      expect(function() {
        delete usualResponse.id;
        new jmap.CreateMailboxAck({}, usualResponse);
      }).to.throw(Error);
    });

    it('should throw an Error if response.mustBeOnlyMailbox is not defined', function() {
      expect(function() {
        delete usualResponse.mustBeOnlyMailbox;
        new jmap.CreateMailboxAck({}, usualResponse);
      }).to.throw(Error);
    });

    it('should throw an Error if response.mustBeOnlyMailbox has not the expected type', function() {
      expect(function() {
        usualResponse.mustBeOnlyMailbox = 'true';
        new jmap.CreateMailboxAck({}, usualResponse);
      }).to.throw(Error);
    });

    it('should assign responses fields as object properties', function() {
      expect(new jmap.CreateMailboxAck({}, usualResponse))
        .to.deep.equal({
          _jmap: {},
          id: 'id',
          mustBeOnlyMailbox: true
        });
    });

  });

});
