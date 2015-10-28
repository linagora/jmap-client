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

  describe('The assertRequiredParameterIsObject static method', function() {

    it('should not throw an Error if the parameter is defined as an object', function() {
      expect(jmap.Utils.assertRequiredParameterIsObject({})).to.deep.equal({});
    });

    it('should throw an Error if the parameter is null', function() {
      expect(function() {
        jmap.Utils.assertRequiredParameterIsObject(null, 'parameter');
      }).to.throw(Error);
    });

    it('should throw an Error if the parameter is undefined', function() {
      expect(function() {
        var param;
        jmap.Utils.assertRequiredParameterIsObject(param, 'parameter');
      }).to.throw(Error);
    });

    it('should throw an Error if the parameter is an array', function() {
      expect(function() {
        jmap.Utils.assertRequiredParameterIsObject([], 'parameter');
      }).to.throw(Error);
    });

    it('should throw an Error if the parameter is a fn', function() {
      expect(function() {
        jmap.Utils.assertRequiredParameterIsObject(function() {}, 'parameter');
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

  describe('The _jsonArrayToModelList static method', function() {

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
      expect(jmap.Utils._jsonArrayToModelList(client, FakeModel, [1, 2])).to.deep.equal([
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

  describe('The assertRequiredParameterIsArrayWithMinimumLength static method', function() {

    it('should not throw an Error if the parameter is a zero-length Array and no length is given', function() {
      expect(jmap.Utils.assertRequiredParameterIsArrayWithMinimumLength([])).to.deep.equal([]);
    });

    it('should not throw an Error if the parameter is an Array with the minimum length', function() {
      expect(jmap.Utils.assertRequiredParameterIsArrayWithMinimumLength([0, 1], '', 2)).to.deep.equal([0, 1]);
    });

    it('should throw an Error if the parameter is null', function() {
      expect(function() {
        jmap.Utils.assertRequiredParameterIsArrayWithMinimumLength(null, 'parameter');
      }).to.throw(Error);
    });

    it('should throw an Error if the parameter is undefined', function() {
      expect(function() {
        jmap.Utils.assertRequiredParameterIsArrayWithMinimumLength();
      }).to.throw(Error);
    });

    it('should throw an Error if the parameter is not an Array', function() {
      expect(function() {
        jmap.Utils.assertRequiredParameterIsArrayWithMinimumLength({});
      }).to.throw(Error);
    });

    it('should throw an Error if the parameter is an Array withouth the minimum length', function() {
      expect(function() {
        jmap.Utils.assertRequiredParameterIsArrayWithMinimumLength([], '', 1);
      }).to.throw(Error);
    });

  });

  describe('The fillURITemplate static method', function() {

    it('should throw an Error if uri is not defined', function() {
      expect(function() {
        jmap.Utils.fillURITemplate();
      }).to.throw(Error);
    });

    it('should throw an Error if uri is null', function() {
      expect(function() {
        jmap.Utils.fillURITemplate(null, {});
      }).to.throw(Error);
    });

    it('should return the URI as-is if no parameters are given', function() {
      expect(jmap.Utils.fillURITemplate('http://jmap.org/{test}')).to.equal('http://jmap.org/{test}');
    });

    it('should return the URI as-is if empty parameters are given', function() {
      expect(jmap.Utils.fillURITemplate('http://jmap.org/{test}', {})).to.equal('http://jmap.org/{test}');
    });

    it('should return the URI as-is if parameters given doesn not contain the expected variables', function() {
      expect(jmap.Utils.fillURITemplate('http://jmap.org/{test}', { a: 'b' })).to.equal('http://jmap.org/{test}');
    });

    it('should replace the variables in the URI when parameters contain the values', function() {
      expect(jmap.Utils.fillURITemplate('http://jmap.org/{test}', { test: 'value' })).to.equal('http://jmap.org/value');
    });

    it('should replace only the variables contained in the parameters', function() {
      expect(jmap.Utils.fillURITemplate('http://jmap.org/{test}/{notPresent}', { test: 'value' })).to.equal('http://jmap.org/value/{notPresent}');
    });

    it('should replace multiple variables in the URI template', function() {
      expect(jmap.Utils.fillURITemplate('http://jmap.org/{test}/{other}', {
        test: 'value',
        other: 'secondValue'
      })).to.equal('http://jmap.org/value/secondValue');
    });

  });

});
