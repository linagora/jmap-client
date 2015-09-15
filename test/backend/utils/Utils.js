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

    it('should throw an Error if data has more than one element', function() {
      expect(function() {
        jmap.Utils.assertValidJMAPResponse('request', [0, 1, 2]);
      }).to.throw(Error);
    });

    it('should throw an Error if data[0] is not an array', function() {
      expect(function() {
        jmap.Utils.assertValidJMAPResponse('request', [0]);
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

});
