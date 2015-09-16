'use strict';

var expect = require('chai').expect,
    jmap = require('../../../dist/jmap-client').jmap;

describe('The Utils class', function() {

  describe('The constructor', function() {

    it('should throw an Error', function() {
      expect(function() {
        new jmap.Utils();
      }).to.throw(Error);
    });

  });

  describe('The assertRequiredParameterIsPresent static method', function() {

    it('should not throw an Error if the parameter is defined', function() {
      expect(jmap.Utils.assertRequiredParameterIsPresent({})).to.deep.equal({});
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

  describe('The assertValidJMAPResponse static method', function() {

    it('should throw an Error if data is undefined', function() {
      expect(function() {
        jmap.Utils.assertValidJMAPResponse('request');
      }).to.throw(Error);
    });

    it('should throw an Error if data is null', function() {
      expect(function() {
        jmap.Utils.assertValidJMAPResponse('request', null);
      }).to.throw(Error);
    });

    it('should throw an Error if data is not an array', function() {
      expect(function() {
        jmap.Utils.assertValidJMAPResponse('request', 'I am a String');
      }).to.throw(Error);
    });

    it('should throw an Error if data is zero-length', function() {
      expect(function() {
        jmap.Utils.assertValidJMAPResponse('request', []);
      }).to.throw(Error);
    });

    it('should throw an Error if data[0] is not an array', function() {
      expect(function() {
        jmap.Utils.assertValidJMAPResponse('request', [0]);
      }).to.throw(Error);
    });

    it('should throw an Error if one of the data elements is not an array', function() {
      expect(function() {
        jmap.Utils.assertValidJMAPResponse('request', [[], 0, []]);
      }).to.throw(Error);
    });

    it('should throw an Error if data[0][0] is not the expected response', function() {
      expect(function() {
        jmap.Utils.assertValidJMAPResponse('getAccounts', [['I should be accounts'], {}]);
      }).to.throw(Error);
    });

    it('should throw an Error if data[0][1] is not defined', function() {
      expect(function() {
        jmap.Utils.assertValidJMAPResponse('getAccounts', [['I should be accounts']]);
      }).to.throw(Error);
    });

    it('should throw an Error if data[0][1] is null', function() {
      expect(function() {
        jmap.Utils.assertValidJMAPResponse('getAccounts', [['I should be accounts', null]]);
      }).to.throw(Error);
    });

    it('should not throw an Error if data[0][0] is the expected response', function() {
      expect(jmap.Utils.assertValidJMAPResponse('getAccounts', [['accounts', {}]])).to.deep.equal([['accounts', {}]]);
    });

  });

  describe('The jsonArrayToModelList static method', function() {

    var client = { jmap: 'client' },
        FakeModel = {
          fromJSONObject: function(jmap, object) {
            return {
              jmap: jmap,
              object: object
            };
          }
        };

    it('should call fromJSONObject on the given Model to build the list', function() {
      expect(jmap.Utils.jsonArrayToModelList(client, FakeModel, [1, 2])).to.deep.equal([
        {
          jmap: client,
          object: 1
        }, {
          jmap: client,
          object: 2
        }
      ]);
    });

  });

  describe('The capitalize static method', function() {

    it('should return nothing if str is undefined', function() {
      expect(jmap.Utils.capitalize()).to.equal(undefined);
    });

    it('should return null if str is null', function() {
      expect(jmap.Utils.capitalize(null)).to.equal(null);
    });

    it('should return the argument as-is if str is not a string', function() {
      expect(jmap.Utils.capitalize(0)).to.equal(0);
    });

    it('should return the empty string string when length=0', function() {
      expect(jmap.Utils.capitalize('')).to.equal('');
    });

    it('should return the capitalized string when length=1', function() {
      expect(jmap.Utils.capitalize('a')).to.equal('A');
    });

    it('should return the capitalized string when length=1 and already upper case', function() {
      expect(jmap.Utils.capitalize('A')).to.equal('A');
    });

    it('should return the capitalized string when length>1 and already capitalized', function() {
      expect(jmap.Utils.capitalize('Abcd')).to.equal('Abcd');
    });

    it('should return the capitalized string when length>1', function() {
      expect(jmap.Utils.capitalize('abcd')).to.equal('Abcd');
    });

  });

});
