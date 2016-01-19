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

    it('should set response.mustBeOnlyMailbox to false if not defined', function() {
      delete usualResponse.mustBeOnlyMailbox;
      expect(new jmap.CreateMailboxAck({}, usualResponse).mustBeOnlyMailbox).to.equal(false);
    });

    it('should consider response.mustBeOnlyMailbox if defined', function() {
      expect(new jmap.CreateMailboxAck({}, usualResponse).mustBeOnlyMailbox).to.equal(true);
      usualResponse.mustBeOnlyMailbox = false;
      expect(new jmap.CreateMailboxAck({}, usualResponse).mustBeOnlyMailbox).to.equal(false);
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
