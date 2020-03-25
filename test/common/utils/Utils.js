'use strict';

var expect = require('chai').expect,
    jmap = require('../../../dist/jmap-client');

describe('The Utils class', function() {

  describe('The constructor', function() {

    it('should throw an Error', function() {
      expect(function() {
        new jmap.Utils();
      }).to.throw(Error);
    });

  });

  describe('The isDefined static method', function() {

    it('should return false for undefined', function() {
      expect(jmap.Utils.isDefined(undefined)).to.equal(false);
    });

    it('should return false for null', function() {
      expect(jmap.Utils.isDefined(null)).to.equal(false);
    });

    it('should return true for zero', function() {
      expect(jmap.Utils.isDefined(0)).to.equal(true);
    });

    it('should return true for false', function() {
      expect(jmap.Utils.isDefined(false)).to.equal(true);
    });

    it('should return true for empty string', function() {
      expect(jmap.Utils.isDefined('')).to.equal(true);
    });

    it('should return true for empty array', function() {
      expect(jmap.Utils.isDefined([])).to.equal(true);
    });

    it('should return true for object', function() {
      expect(jmap.Utils.isDefined({})).to.equal(true);
    });
  });

  describe('The assertRequiredParameterIsPresent static method', function() {

    it('should not throw an Error if the parameter is defined', function() {
      expect(jmap.Utils.assertRequiredParameterIsPresent({})).to.deep.equal({});
    });

    it('should not throw an Error if the parameter is false', function() {
      expect(jmap.Utils.assertRequiredParameterIsPresent(false, 'parameter')).to.equal(false);
    });

    it('should not throw an Error if the parameter is zero', function() {
      expect(jmap.Utils.assertRequiredParameterIsPresent(0, 'parameter')).to.equal(0);
    });

    it('should not throw an Error if the parameter is empty string', function() {
      expect(jmap.Utils.assertRequiredParameterIsPresent('', 'parameter')).to.equal('');
    });

    it('should throw an Error if the parameter is null', function() {
      expect(function() {
        jmap.Utils.assertRequiredParameterIsPresent(null, 'parameter');
      }).to.throw(Error);
    });

    it('should throw an Error if the parameter is undefined', function() {
      expect(function() {
        jmap.Utils.assertRequiredParameterIsPresent();
      }).to.throw(Error);
    });

  });

});
